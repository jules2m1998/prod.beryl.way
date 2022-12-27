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

interface ISlotPeriod {
  start: string;
  end: string;
  available?: string;
}

interface IAppointmentRequest {
  user_agency_id: number;
  date: string | string[];
  values: string;
  is_period?: 1 | 0;
}

interface ISlotWithString extends IModel, IAppointmentRequest {}

interface ISlot extends IModel {
  user_agency_id?: number;
  values: ISlotPeriod[];
  date: string | string[];
}

export type { IAppointment, IAppointmentRequest, ISlot, ISlotWithString };
