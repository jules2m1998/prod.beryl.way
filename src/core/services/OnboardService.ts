import type { IOnboard } from "@/types";
import { getAll } from "./generic-service";

export const getAllOnboard = (): Promise<IOnboard[] | null> =>
  getAll<IOnboard>("on-board");
