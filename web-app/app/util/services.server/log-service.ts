import { LibsqlError } from '@libsql/client';
import { ZodError } from 'zod';

export const logError = (error: unknown) => {
  let message = 'unknown error occurred';

  if (error instanceof LibsqlError) {
    console.log('LibsqlError', error.message);
    message = error.message;
  } else if (error instanceof ZodError) {
    console.log('ZodError', error.message);
    message = error.message;
  } else {
    console.log('UnknownError', error);
  }

  return message;
};
