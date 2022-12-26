import type { IAppointment, IAppointmentRequest } from "@/types";
import { getAll, createOne } from "./generic-service";

const getAllAppointment = (): Promise<IAppointment[] | null> =>
  getAll<IAppointment>("appointment");

const createAppointment = (
  request: IAppointmentRequest
): Promise<IAppointment | null> => 
  createOne<IAppointment, IAppointmentRequest>("slot", request);

export { getAllAppointment, createAppointment };
