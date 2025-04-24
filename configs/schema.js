import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    image: varchar(),
    email: varchar({ length: 255 }).notNull().unique(),
})

export const productsTable = pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar().notNull(),
    price: integer().notNull(),
    description: text().notNull(),
    about: text(),
    category: varchar().notNull(),
    imageUrl: varchar().notNull(),
    fileUrl: varchar().notNull(),
    message: varchar(),
    createdBy: varchar('createdBy').notNull().references(() => usersTable.email)
})
