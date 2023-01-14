import type { IOnboard } from "@/types";
import { getAll, getOne } from "./generic-service";

export const getAllOnboard = (): Promise<IOnboard[] | null> =>
  getAll<IOnboard>("on-board");

export const getOneOnboard = (id: number) => getOne<IOnboard>(`on-board/${id}`);
