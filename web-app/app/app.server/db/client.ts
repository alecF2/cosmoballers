import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as admin from './schema/admin';
import { getSecret } from '~/app.server/services/secrets-service';

const client = createClient({
  url: getSecret('DB_URL'),
  authToken: getSecret('DB_AUTH_TOKEN'),
});

export const db = drizzle(client, {
  schema: { ...admin },
  logger: true,
});
