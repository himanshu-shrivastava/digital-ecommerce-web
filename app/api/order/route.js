import { db } from "@/configs/db"
import { cartsTable, ordersTable, productsTable } from "@/configs/schema"
import { desc, eq, getTableColumns } from "drizzle-orm"
import { NextResponse } from "next/server"
import { loadEnvConfig } from "@next/env"

import { Resend } from 'resend'
import EmailOrder from "@/emails/email"
import { currentUser } from "@clerk/nextjs/server"

// To make ENV variable accessible
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {

    /* Get Order Details */
    const { orderDetail, userEmail } = await req.json()

    /* 
    Insert Card Data to Order Table 
    (payment related info not saving for now such as orderId, Payment Method, Amount, etc)
    */
    let orderList = []
    orderDetail?.length > 0 && orderDetail.forEach(order => {
        orderList.push({
            emailId: userEmail,
            productId: order?.productId ? order.productId : order.id
        })
    })

    /* Save Order to Database */
    try {
        const order_insert = await db.insert(ordersTable).values(orderList)
            .returning({ insertId: ordersTable.id })

        if (order_insert && order_insert?.length > 0) {
            /* Delete Cart Data for Current Order */
            const delete_cart = await db.delete(cartsTable)
                .where(eq(cartsTable.emailId, userEmail))

            /* Send Email */
            const send_email_result = await SendOrderEmail(orderDetail, userEmail)

            return NextResponse.json({ 'success': order_insert[0] })
        } else {
            return NextResponse.json({ 'error': 'Server Error, Please wait for sometime.' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}

const SendOrderEmail = async (orderDetail, userEmail) => {

    const calculateTotal = () => {
        let total = 0
        orderDetail && orderDetail.forEach(item => {
            total += Number(item.price)
        })
        return total
    }

    const email_result = await resend.emails.send({
        from: process.env.NEXT_PUBLIC_RESEND_SENDER_EMAIL,
        to: userEmail,
        subject: 'Order Confirmation Receipt',
        react: <EmailOrder orderDetail={ orderDetail } totalAmount={ calculateTotal() } />,
    })
    return email_result
}

export async function GET(req) {
    try {
        const user = await currentUser()

        const db_select = await db.select({
            ...getTableColumns(productsTable),
            order: {
                id: ordersTable.id
            }
        }).from(ordersTable)
            .leftJoin(productsTable, eq(ordersTable.productId, productsTable.id))
            .where(eq(ordersTable.emailId, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(ordersTable.id))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No Record(s) Found.' })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}