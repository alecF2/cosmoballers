import { type TypedResponse, json } from '@remix-run/node';
import {
  type HttpResponseCode,
  type RemixJsonPayload,
  type RestResponsePayload,
  isClientErrorCode,
  isInformationalCode,
  isRedirectionCode,
  isServerErrorCode,
  isSuccessfulCode,
} from '~/util/types/rest';

export const createRestResponse = (
  payload: RestResponsePayload,
): TypedResponse<RemixJsonPayload> => {
  const { code, ...rest } = payload;

  return json(
    {
      status: httpResponseCodeToStatus(code),
      ...rest,
    },
    {
      status: code,
    },
  );
};

export const httpResponseCodeToStatus = (code: HttpResponseCode) => {
  if (isInformationalCode(code)) return 'informational';
  if (isSuccessfulCode(code)) return 'successful';
  if (isRedirectionCode(code)) return 'redirection';
  if (isClientErrorCode(code)) return 'client error';
  if (isServerErrorCode(code)) return 'server error';
  return 'unknown error';
};
