import type { IUser } from "@/types";
import { createWithFormData, getAll, getOne } from "./generic-service";
import type { IHttpError } from "@/types/https";

const getAllUsers = (): Promise<IUser[] | null> => getAll<IUser>("user");

const createUser = (request: FormData): Promise<IUser | null> =>
  createWithFormData<IUser>("sign-up", request);

export const getOneUser = (id: number): Promise<IUser | IHttpError> =>
  getOne<IUser>(`user/${id}`);

export { getAllUsers, createUser };
