import { db } from "@/configs/db"
import { cartsTable, ordersTable } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {

    /* Get Order Details */
    const { orderDetail, userEmail } = await req.json()

    /* 
    Insert Card Data to Order Table 
    (payment related info not saving for now such as orderid, payment method, amout etc)
    */
    let orderList = []
    orderDetail?.length > 0 && orderDetail.forEach(order => {
        orderList.push({
            emailId: userEmail,
            productId: order?.productId
        })
    })

    /* Save Order to Database */
    try {
        const order_insert = await db.insert(ordersTable).values(orderList)
            .returning({ insertId: ordersTable.id })

        console.log('order_insert', order_insert)
        if (order_insert && order_insert?.length > 0) {
            /* Delete Cart Data for Current Order */
            const delete_cart = await db.delete(cartsTable)
                .where(eq(cartsTable.emailId, userEmail))

            return NextResponse.json({ 'success': order_insert[0] })
        } else {
            return NextResponse.json({ 'error': 'Server Error, Please wait for sometime.' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}