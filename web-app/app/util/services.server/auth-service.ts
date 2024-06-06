import { Authenticator } from 'remix-auth';
import { FormStrategy } from 'remix-auth-form';
import { sessionStorage } from './session-service';
import { getAdminSessionStore, loginAdmin } from './admin-service';
import { type AdminSessionData, loginAdminSchema } from '~/db.server/schema/admin';

export const authenticator = new Authenticator<AdminSessionData>(sessionStorage);

authenticator.use(
  new FormStrategy<AdminSessionData>(async ({ form }) => {
    const requestBody = Object.fromEntries(form);
    const credentials = loginAdminSchema.parse(requestBody);
    const authenticated = await loginAdmin(credentials);

    if (!authenticated) {
      throw new Error('credentials are invalid');
    }

    return getAdminSessionStore(credentials.email);
  }),
  'email-password',
);
