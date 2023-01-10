import type {IAgence} from "@/types";
import {createWithFormData, getAll} from "./generic-service";

const getAllAgence = (): Promise<IAgence[] | null> => getAll<IAgence>("agency");

const createAgence = (request: FormData): Promise<IAgence | null> =>
    createWithFormData<IAgence>("agency", request);

// const deleteAgence = (id: number): Promise

export {getAllAgence, createAgence};
