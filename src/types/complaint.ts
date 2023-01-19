import type { IModel } from "./model";
import type { IUserAgency } from "@/types/user-agency";
import type { IService } from "@/types/service";

export interface IComplaint extends IModel {
  id: number;
  user_agency_id: string;
  user_agency: IUserAgency;
  detail: string;
  account_number: string;
  card_start: string;
  card_end: string;
  account_opening_date: string;
  first_transaction: string;
  last_transaction: string;
  service_id: string;
  service: IService;
  path: string;
  name: string;
  phone: string;
  email: string;
}
