// eslint-disable-next-line @typescript-eslint/ban-types
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type InformationalCode = IntRange<100, 104>;
export type SuccessfulCode = IntRange<200, 209> | 226;
export type RedirectionCode = IntRange<300, 309>;
export type ClientErrorCode = IntRange<400, 427> | 428 | 429 | 431 | 451;
export type ServerErrorCode = IntRange<500, 512>;
export type HttpResponseCode =
  | InformationalCode
  | SuccessfulCode
  | RedirectionCode
  | ClientErrorCode
  | ServerErrorCode;

export const isInformationalCode = (code: HttpResponseCode): code is InformationalCode => {
  return code >= 100 && code < 104;
};

export const isSuccessfulCode = (code: HttpResponseCode): code is SuccessfulCode => {
  return (code >= 200 && code < 209) || code === 226;
};

export const isRedirectionCode = (code: HttpResponseCode): code is RedirectionCode => {
  return code >= 300 && code < 309;
};

export const isClientErrorCode = (code: HttpResponseCode): code is ClientErrorCode => {
  return (
    (code >= 400 && code < 427) || code === 428 || code === 429 || code === 431 || code === 451
  );
};

export const isServerErrorCode = (code: HttpResponseCode): code is ServerErrorCode => {
  return code >= 500 && code < 512;
};

export interface InformationalPayload {
  code: InformationalCode;
  message: string;
}

export interface SuccessfulPayload {
  code: SuccessfulCode;
  message: string;
  data?: Record<string, string>;
}

export interface RedirectionPayload {
  code: RedirectionCode;
  message: string;
}

export interface ClientErrorPayload {
  code: ClientErrorCode;
  error: string;
}

export interface ServerErrorPayload {
  code: ServerErrorCode;
  error: string;
}

export type RestResponsePayload =
  | InformationalPayload
  | SuccessfulPayload
  | RedirectionPayload
  | ClientErrorPayload
  | ServerErrorPayload;

export type RemixJsonPayload =
  | Omit<InformationalPayload, 'code'>
  | Omit<SuccessfulPayload, 'code'>
  | Omit<RedirectionPayload, 'code'>
  | Omit<ClientErrorPayload, 'code'>
  | Omit<ServerErrorPayload, 'code'>;
