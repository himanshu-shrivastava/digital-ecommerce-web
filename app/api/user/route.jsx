import { db } from "@/configs/db"
import { usersTable } from "@/configs/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {

    const { user } = await req.json()

    // Check if User is lready exist in DB
    const userData = await db.select().from(usersTable)
        .where(eq(
            usersTable.email,
            user?.primaryEmailAddress?.emailAddress
        ))

    // If Not, Save user Data to DB
    if (userData?.length < 1) {
        const db_insert = await db.insert(usersTable).values({
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
            image: user?.imageUrl
        }).returning(usersTable)

        return NextResponse.json(db_insert[0])
    }

    return NextResponse.json(userData[0])
}