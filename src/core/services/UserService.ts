import type { IUser } from "@/types";
import { createWithFormData, getAll } from "./generic-service";

const getAllUsers = (): Promise<IUser[] | null> => getAll<IUser>("user");

const createUser = (request: FormData): Promise<IUser | null> =>
  createWithFormData<IUser>("sign-up", request);

export { getAllUsers, createUser };
