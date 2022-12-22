import type { IAgence } from "./agence";
import type { IUser } from "./IUser";
import type { IModel } from "./model";

interface IUserAgency extends IModel {
  user_id: number;
  agency_id: number;
  type_interaction_id: number;
  user: IUser;
  agency: IAgence;
}

export type { IUserAgency };
