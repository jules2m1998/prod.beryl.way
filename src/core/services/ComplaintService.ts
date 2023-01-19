import { getAll, getOne } from "@/core/services/generic-service";
import type { IComplaint } from "@/types";

export const getAllComplains = () => getAll<IComplaint>("complain");

export const getOneComplain = (id: number) =>
  getOne<IComplaint>(`complain/${id}`);
