type Secret = 'DB_NAME' | 'DB_URL' | 'DB_AUTH_TOKEN' | 'SESSION_SECRET';

export const getSecret = (secret: Secret) => {
  return process.env[secret]!;
};
