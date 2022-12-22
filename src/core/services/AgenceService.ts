import type { IAgence, IAgenceRequest } from "@/types";
import { createOne, getAll } from "./generic-service";

const getAllAgence = (): Promise<IAgence[] | null> => getAll<IAgence>("agency");

const createAgence = (request: IAgenceRequest): Promise<IAgence | null> =>
  createOne<IAgence, IAgenceRequest>("agency", request);

export { getAllAgence, createAgence };
