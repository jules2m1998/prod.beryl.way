import type { ICredit } from "@/types";
import { getAll, getOne } from "@/core/services/generic-service";
import type { IHttpError } from "@/types/https";

export const getAllCredit = (): Promise<ICredit[] | null> =>
  getAll<ICredit>("credit-request");

export const getOneCredit = (id: number): Promise<ICredit | IHttpError> =>
  getOne<ICredit>(`credit-request/${id}`);
