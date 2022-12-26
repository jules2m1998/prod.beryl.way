import type { IModel } from "./model";
import type { IUserAgency } from "./user-agency";

interface IAppointment extends IModel {
  client_interaction_id: number;
  agent_interaction_id: number;
  time: Date;
  reason: string;
  recalled: string;

  client: IUserAgency;
  agent: IUserAgency;
}

interface ISlot {
  start: string;
  end: string;
  available: boolean;
}

interface IAppointmentRequest {
  user_agency_id: number;
  date: string | string[];
  values: string;
}

export type { IAppointment, IAppointmentRequest };
