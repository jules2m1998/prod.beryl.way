import type { IAppointment } from "@/types";
import { getAll } from "./generic-service";

const getAllAppointment = (): Promise<IAppointment[] | null> =>
  getAll<IAppointment>("appointment");

export { getAllAppointment };
