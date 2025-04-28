import { db } from "@/configs/db"
import { cartsTable, productsTable } from "@/configs/schema"
import { eq, getTableColumns } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { emailId, productId } = await req.json()
        const db_insert = await db.insert(cartsTable).values({
            emailId: emailId,
            productId: productId
        }).returning(cartsTable)

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
            ...getTableColumns(productsTable),
            ...getTableColumns(cartsTable)
        }).from(cartsTable)
            .innerJoin(productsTable, eq(cartsTable.productId, productsTable.id))
            .where(eq(cartsTable.emailId, emailId))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No record found in the cart' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}

export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url)
        const recordId = searchParams.get('recordId')

        const db_delete = await db.delete(cartsTable)
            .where(eq(cartsTable.id, Number(recordId)))
            .returning({ deletedId: cartsTable.id })
        if (db_delete) {
            return NextResponse.json({ 'success': db_delete })
        } else {
            return NextResponse.json({ 'error': 'No record found for deletion' })
        }
    } catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}