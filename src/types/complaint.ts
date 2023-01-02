import type { IModel } from "./model";

export interface IComplaint extends IModel {
  id: number;
  user_agency_id: string;
  detail: string;
  account_number: string;
  card_start: string;
  card_end: string;
  account_opening_date: string;
  first_transaction: string;
  last_transaction: string;
  service_id: string;
  path: string;
  name: string;
  phone: string;
  email: string;
}
