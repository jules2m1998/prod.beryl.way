import type {IZone, IZoneRequest, IZoneType, IZoneTypeRequest} from "@/types";
import {createOne, getAll, getOne, putWithParams} from "./generic-service";
import type {IHttpError} from "@/types/https";

// **************** Type zone services ************************** //
const getAllTypeZone = (): Promise<IZoneType[] | null> =>
    getAll<IZoneType>("zone-type");

const createTypeZone = (request: IZoneTypeRequest): Promise<IZoneType | null> =>
    createOne<IZoneType, IZoneTypeRequest>("zone-type", request);

// **************** Zone services **************** //

const ZONE = "zone";
const getAllZone = (): Promise<IZone[] | null> => getAll<IZone>(ZONE);

const createZone = (request: IZoneRequest): Promise<IZone | null> =>
    createOne<IZone, IZoneRequest>("zone", request);

export const getOneZone = (id: number): Promise<IZone | IHttpError> =>
    getOne<IZone>(`${ZONE}/${id}`);

export const updateZone = (
    id: number,
    data: Partial<IZone>
): Promise<IZone | IHttpError> =>
    putWithParams<IZone, Partial<IZone>>(`${ZONE}/${id}`, data);

export {getAllZone, getAllTypeZone, createTypeZone, createZone};
