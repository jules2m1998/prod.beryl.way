import type { IUser, IUserRequest } from "@/types";
import {
  createWithFormData,
  getAll,
  getOne,
  putOne,
  putWithParams,
} from "./generic-service";
import type { IHttpError } from "@/types/https";

const getAllUsers = (): Promise<IUser[] | null> => getAll<IUser>("user");

const createUser = (request: FormData): Promise<IUser | null> =>
  createWithFormData<IUser>("sign-up", request);

export const getOneUser = (id: number): Promise<IUser | IHttpError> =>
  getOne<IUser>(`user/${id}`);

export const updateUser = (
  request: FormData,
  id: number
): Promise<IUser | IHttpError> => putOne(`user/${id}`, request);

export { getAllUsers, createUser };
