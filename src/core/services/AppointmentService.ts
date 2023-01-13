import type {
  IAppointment,
  IAppointmentRequest,
  ISlotWithString,
} from "@/types";
import { getAll, createOne, getWithParams } from "./generic-service";

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

export { getAllAppointment, createAppointment, getAllSlots };
