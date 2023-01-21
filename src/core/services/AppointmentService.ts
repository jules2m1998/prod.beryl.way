import type {
  IAppointment,
  IAppointmentRequest,
  ISlotWithString,
} from "@/types";
import {
  createOne,
  getAll,
  getOne,
  getWithParams,
  putWithParams,
} from "./generic-service";

const getAllAppointment = (): Promise<IAppointment[] | null> =>
  getAll<IAppointment>("appointment");

const getAllSlots = (): Promise<ISlotWithString[] | null> =>
  getAll<ISlotWithString>("slot");

export const getAllSlotsJoined = (): Promise<ISlotWithString[] | null> =>
  getWithParams<ISlotWithString>("slot", { is_web: 0 });

const createAppointment = (
  request: IAppointmentRequest
): Promise<IAppointment | null> =>
  createOne<IAppointment, IAppointmentRequest>("slot", request);

export const getOneAppointment = (id: number) =>
  getOne<IAppointment>(`appointment/${id}`);

export const updateOneAppointment = (
  id: number,
  request: Partial<IAppointment>
) =>
  putWithParams<{ success: boolean }, Partial<IAppointment>>(
    `appointment/${id}`,
    request
  );

export { getAllAppointment, createAppointment, getAllSlots };
