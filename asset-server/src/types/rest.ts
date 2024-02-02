type ResponseStatus = 'SUCCESS' | 'ERROR';

type ResponseDataType = FileMetadata;

interface ResponseDataTypeMap {
  FileMetadata: 'metadata';
}

interface FileMetadata {
  size: number;
  type: string;
}

interface StandardResponse<T extends ResponseDataType> {
  status: ResponseStatus;
  data: {
    [K in keyof ResponseDataTypeMap as T extends ResponseDataType
      ? `${ResponseDataTypeMap[K]}`
      : never]: T;
  };
}

export type { ResponseStatus, ResponseDataType, FileMetadata, StandardResponse };
