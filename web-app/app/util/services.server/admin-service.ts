import { eq } from 'drizzle-orm';
import { verifyPassword } from './hash-service';
import { logError } from './log-service';
import { db } from '~/db.server/client';
import { type NewAdmin, admins, type LoginAdmin } from '~/db.server/schema/admin';

export const insertAdmin = async (data: NewAdmin) => {
  const [newAdmin] = await db.insert(admins).values(data).returning({ email: admins.email });

  return newAdmin;
};

export const loginAdmin = async (data: LoginAdmin) => {
  const { email, password } = data;

  let hash: string;

  try {
    hash = await getAdminPasswordHash(email);
  } catch (error) {
    // likely that email is not in database
    logError(error);
    return false;
  }

  // email is in database, just check if password matches
  return verifyPassword(password, hash);
};

export const getAdminPasswordHash = async (email: string) => {
  const [admin] = await db
    .select({ hash: admins.password })
    .from(admins)
    .where(eq(admins.email, email));

  if (!admin) {
    throw new Error(`email ${email} not found`);
  }

  return admin.hash;
};
