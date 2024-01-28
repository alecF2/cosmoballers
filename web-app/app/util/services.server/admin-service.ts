import { logError } from './log-service';
import { db } from '~/db.server/client';
import { type NewAdmin, admins, type LoginAdmin } from '~/db.server/schema/admin';

export const insertAdmin = async (data: NewAdmin) => {
  const [newAdmin] = await db.insert(admins).values(data).returning({ email: admins.email });

  return newAdmin;
};

