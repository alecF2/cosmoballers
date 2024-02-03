import { type TypedResponse } from '@remix-run/node';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type InformationalCode = IntRange<100, 200>;
export type SuccessfulCode = IntRange<200, 300>;
export type RedirectionCode = IntRange<300, 400>;
export type ClientErrorCode = IntRange<400, 500>;
export type ServerErrorCode = IntRange<500, 600>;
export type HttpResponseCode =
  | InformationalCode
  | SuccessfulCode
  | RedirectionCode
  | ClientErrorCode
  | ServerErrorCode;

type InformationalResponse

export type ResponseShape<HttpResponseCode> = {

}

export type StandardSuccessPostResponse = {
  status: 'success';
  message: string;
};

export type StandardSuccessGetResponse<T> = {
  status: 'success';
  data: T;
};

export type StandardErrorResponse = {
  status: 'error';
  message: string;
};
