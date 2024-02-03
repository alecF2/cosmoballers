import { type TypedResponse, json } from '@remix-run/node';
import { HttpResponseCode, type StandardErrorResponse, type StandardSuccessPostResponse } from '../types/rest';

export const createStandardResponse<HttpResponseCode> = () => {
  
}

export const createStandardSuccessPostResponse = (
  message: string,
): TypedResponse<StandardSuccessPostResponse> => {
  return json(
    {
      status: 'success',
      message,
    },
    {
      status: 200,
    },
  );
};

// TODO: need other than 400
export const createStandardErrorResponse = (
  message: string,
): TypedResponse<StandardErrorResponse> => {
  return json(
    {
      status: 'error',
      message,
    },
    {
      status: 400,
    },
  );
};
