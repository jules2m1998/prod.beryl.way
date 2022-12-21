interface IHttpResponse<T> {
  status: boolean;
  message: string;
  data: T | T[];
}

interface IHttpError {
    errors: any;
    message: string;
}

export type { IHttpResponse, IHttpError };
