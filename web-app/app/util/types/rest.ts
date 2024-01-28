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
