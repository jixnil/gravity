import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const quoteRequests = sqliteTable("quote_requests", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  phone: text("phone").notNull().default(""),
  service: text("service").notNull(),
  budget: text("budget").notNull(),
  description: text("description").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  requestFingerprint: text("request_fingerprint").notNull(),
  createdAt: integer("created_at").notNull(),
}, table => [index("idx_quote_fingerprint_created").on(table.requestFingerprint, table.createdAt)]);
