import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as admin from './schema/admin';
import { getSecret } from '~/util/services.server/secrets-service';

const client = createClient({
  url: getSecret('DB_URL'),
  authToken: getSecret('DB_AUTH_TOKEN'),
});

export const db = drizzle(client, {
  schema: { ...admin },
  logger: true,
});
