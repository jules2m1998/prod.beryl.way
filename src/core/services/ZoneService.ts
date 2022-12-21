import type { IZoneTypeRequest, IZoneType, IZone, IZoneRequest } from "@/types";
import { createOne, getAll } from "./generic-service";

// **************** Type zone services ************************** //
const getAllTypeZone = (): Promise<IZoneType[] | null> =>
  getAll<IZoneType>("zone-type");

const createTypeZone = (request: IZoneTypeRequest): Promise<IZoneType | null> =>
  createOne<IZoneType, IZoneTypeRequest>("zone-type", request);

// **************** Zone services **************** //
const getAllZone = (): Promise<IZone[] | null> => getAll<IZone>("zone");

const createZone = (request: IZoneRequest): Promise<IZone | null> =>
  createOne<IZone, IZoneRequest>("zone", request);

export { getAllZone, getAllTypeZone, createTypeZone, createZone };
