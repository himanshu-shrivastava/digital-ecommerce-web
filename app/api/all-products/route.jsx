import { db } from "@/configs/db"
import { productsTable, usersTable } from "@/configs/schema"
import { asc, desc, eq, getTableColumns, ilike } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {

    try {
        const { limit, offset, searchtext, sort } = await req.json()

        const db_select = await db.select({
            ...getTableColumns(productsTable),
            user: {
                name: usersTable.name,
                image: usersTable.image
            }
        }).from(productsTable)
            .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
            .where(ilike(productsTable.title, '%' + searchtext + '%'))
            .orderBy(sort.order === 'desc' ? desc(productsTable[sort.field]) : asc(productsTable[sort.field]))
            .limit(Number(limit))
            .offset(Number(offset))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'No Records Found' })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}