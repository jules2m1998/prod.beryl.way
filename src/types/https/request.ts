interface IHttpResponse<T> {
  status: boolean;
  message: string;
  data: T | T[];
}

interface IHttpError {
  errors: any;
  message: string;
  success: boolean;
}

export type { IHttpResponse, IHttpError };
