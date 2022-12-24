import type { IHttpResponse } from "@/types/https";
import ApiService from "./ApiService";

const getAll = async <T>(path: string): Promise<T[] | null> => {
  try {
    ApiService.setHeader();
    const response = await ApiService.get(path);
    const data = response.data as IHttpResponse<T>;

    return data.data as T[];
  } catch (error) {
    return null;
  }
};

const createOne = async <T, P>(path: string, request: P): Promise<T | null> => {
  try {
    ApiService.setHeader();
    const response = await ApiService.post(path, request);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return null;
  }
};

const createWithFormData = async <T>(
  path: string,
  request: FormData
): Promise<T | null> => {
  try {
    ApiService.setHeader();
    const response = await ApiService.postForm(path, request);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return null;
  }
};

export { getAll, createOne, createWithFormData };
