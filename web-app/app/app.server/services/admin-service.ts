import { eq } from 'drizzle-orm';
import { verifyPassword } from './hash-service';
import { logError } from './log-service';
import { db } from '~/app.server/db/client';
import { type NewAdmin, admins, type LoginAdmin } from '~/app.server/db/schema/admin';

export const insertAdmin = async (data: NewAdmin) => {
  const [newAdmin] = await db.insert(admins).values(data).returning({ email: admins.email });

  return newAdmin;
};

/**
 * returns whether or not admin credentials are valid
 */
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

export const getAdminSessionStore = async (email: string) => {
  const [admin] = await db
    .select({
      id: admins.id,
      email: admins.email,
      firstName: admins.firstName,
      lastName: admins.lastName,
    })
    .from(admins)
    .where(eq(admins.email, email));

  if (!admin) {
    throw new Error(`email ${email} not found`);
  }

  return admin;
};
