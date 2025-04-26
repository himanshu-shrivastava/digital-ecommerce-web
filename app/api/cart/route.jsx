import { db } from "@/configs/db"
import { cartTable, productsTable } from "@/configs/schema"
import { eq, getTableColumns } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { emailId, productId } = await req.json()
        const db_insert = await db.insert(cartTable).values({
            emailId: emailId,
            productId: productId
        }).returning(cartTable)

        if (db_insert?.length > 0) {
            return NextResponse.json({ 'success': db_insert[0] })
        } else {
            return NextResponse.json({ 'error': 'Server Error, Please Try Again.' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const emailId = searchParams.get('emailId')

        const db_select = await db.select({
            ...getTableColumns(productsTable)
        }).from(cartTable)
            .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
            .where(eq(cartTable.emailId, emailId))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No record found in the cart' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}