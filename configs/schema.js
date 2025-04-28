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
    createdBy: varchar('createdBy').notNull().references(() => usersTable.email),
    uniqueId: integer()
})

export const cartsTable = pgTable("carts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    emailId: varchar('emailId').notNull().references(() => usersTable.email),
    productId: integer('productId').notNull().references(() => productsTable.id),
    quantity: integer().default(1)
})

export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    emailId: varchar('emailId').notNull().references(() => usersTable.email),
    productId: integer('productId').notNull().references(() => productsTable.id),
})
