import { db } from "@/configs/db"
import { ordersTable, productsTable, usersTable } from "@/configs/schema"
import { currentUser } from "@clerk/nextjs/server"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const user = await currentUser()

        /* Select product orders history which are listed by logged id user */
        const db_select = await db.select().from(ordersTable)
            .leftJoin(productsTable, eq(ordersTable.productId, productsTable.id))
            .leftJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
            .where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(ordersTable.id))

        if (db_select?.length > 0) {
            return NextResponse.json({ 'success': db_select })
        } else {
            return NextResponse.json({ 'error': 'Empty purchase history for your listed products.' })
        }
    }
    catch (e) {
        return NextResponse.json({ 'error': e.message })
    }
}