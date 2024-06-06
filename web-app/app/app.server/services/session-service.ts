import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { getSecret } from './secrets-service';
import { getAdminSessionStore } from './admin-service';
import { type AdminSessionData } from '~/app.server/db/schema/admin';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ADMIN_SESSION_KEY = 'adminSessionStore';

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'cblCookieSession',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [getSecret('SESSION_SECRET')],
    secure: Bun.env.NODE_ENV === 'production',
  },
});

export const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');

  return sessionStorage.getSession(cookie);
};

/**
 * logs out from current session
 */
export const logout = async (request: Request) => {
  const session = await getSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
};

/**
 * commits a session for admin with specified email
 */
export const createAdminSession = async (request: Request, email: string) => {
  const session = await getSession(request);
  const adminData = await getAdminSessionStore(email);

  session.set(ADMIN_SESSION_KEY, adminData);
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 1, // 1 day
      }),
    },
  });
};

/**
 * returns admin data from session store
 */
export const getAdminSessionData = async (request: Request) => {
  const session = await getSession(request);
  const adminData = session.get(ADMIN_SESSION_KEY) as AdminSessionData;

  return adminData;
};

/**
 * returns the ID of the admin from session
 */
export const getAdminId = async (request: Request) => {
  const { id: adminId } = await getAdminSessionData(request);

  return adminId;
};

/**
 * use in loader or action to check for valid admin session before proceeding
 */
export const requireAdminId = async (request: Request) => {
  const adminId = await getAdminId(request);

  if (!adminId) {
    throw redirect('/login');
  }

  return adminId;
};
