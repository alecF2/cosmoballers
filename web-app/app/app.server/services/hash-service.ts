// eslint-disable-next-line @typescript-eslint/naming-convention
export const SALT_ROUNDS = 12;

export const hashPassword = async (pass: string) => {
  return Bun.password.hash(pass, {
    algorithm: 'bcrypt',
    cost: SALT_ROUNDS,
  });
};

export const verifyPassword = async (pass: string, hash: string) => {
  return Bun.password.verify(pass, hash, 'bcrypt');
};
