import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { type z } from 'zod';
import { hashPassword } from '~/util/services.server/hash-service';

export const admins = sqliteTable('admins', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName'),
  password: text('password').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updatedAt', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const adminSchema = createSelectSchema(admins);
export const newAdminSchema = createInsertSchema(admins, {
  email: (schema) => schema.email.email(),
  firstName: (schema) => schema.firstName.min(1).max(30),
  lastName: (schema) => schema.lastName.min(1).max(50),
  password: (schema) => schema.password.min(8).max(24).transform(hashPassword),
});

export const loginAdminSchema = adminSchema.pick({
  email: true,
  password: true,
});

export const adminSessionDataSchema = adminSchema.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
});

export type Admin = z.infer<typeof adminSchema>;
export type NewAdmin = z.infer<typeof newAdminSchema>;
export type LoginAdmin = z.infer<typeof loginAdminSchema>;
export type AdminSessionData = z.infer<typeof adminSessionDataSchema>;
