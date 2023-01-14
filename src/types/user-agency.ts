import type { IAgence } from "./agence";
import type { IUser } from "./IUser";
import type { IModel } from "./model";

export interface IInteractionType extends IModel {
  name: string;
}

interface IUserAgency extends IModel {
  user_id: number;
  agency_id: number;
  type_interaction_id: number;
  type_interaction: IInteractionType;
  user: IUser;
  agency: IAgence;
}

export type { IUserAgency };
