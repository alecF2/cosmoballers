import type { Config } from 'drizzle-kit';
import { getSecret } from '~/util/services.server/secrets-service';

export default {
  schema: './app/db.server/schema/*',
  driver: 'turso',
  dbCredentials: {
    url: getSecret('DB_URL'),
    authToken: getSecret('DB_AUTH_TOKEN'),
  },
  verbose: true,
  strict: true,
} satisfies Config;
