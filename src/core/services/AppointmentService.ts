import type {
  IAppointment,
  IAppointmentRequest,
  ISlotWithString,
} from "@/types";
import { getAll, createOne } from "./generic-service";

const getAllAppointment = (): Promise<IAppointment[] | null> =>
  getAll<IAppointment>("appointment");

const getAllSlots = (): Promise<ISlotWithString[] | null> =>
  getAll<ISlotWithString>("slot");

const createAppointment = (
  request: IAppointmentRequest
): Promise<IAppointment | null> =>
  createOne<IAppointment, IAppointmentRequest>("slot", request);

export { getAllAppointment, createAppointment, getAllSlots };
