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

export type { IAppointment };
