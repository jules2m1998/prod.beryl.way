import type { IService } from "@/types";
import type { IHttpError } from "@/types/https";
import {
  createWithFormData,
  deleteOne,
  getAll,
  getOne,
  putOne,
} from "./generic-service";

const route = "service";

export const getALlServices = (): Promise<IService[] | null> =>
  getAll<IService>(route);

export const getOneService = (id: number): Promise<IService | IHttpError> =>
  getOne<IService>(`${route}/${id}`);

export const deleteOneService = (id: number): Promise<boolean | IHttpError> =>
  deleteOne<boolean>(`${route}/${id}`);

export const createService = (request: FormData): Promise<IService | null> =>
  createWithFormData<IService>(route, request);

export const updateService = (
  request: FormData,
  id: number
): Promise<IService | IHttpError> => putOne(`${route}/${id}`, request);
