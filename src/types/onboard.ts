import type { IModel } from "./model";
import type { IUserAgency } from "./user-agency";

interface IOnboard extends IModel {
  interaction_id: string;
  is_resident: string;
  in_economic_zone: string;
  full_name: string;
  surname?: string;
  father_name: string;
  mother_name: string;
  path: string; //
  signature: string; //
  is_saving: string;
  account_reason: string;
  matrimonial_status: string;
  date_of_birth: string;
  delivery_date?: string;
  delivery_number?: string;
  profession: string;
  employer: string;
  monthly_revenue: string;
  is_us_citizen: string;
  has_lived_usa: string;
  residence: string;
  card_holder_name: string;
  principal_phone: string;
  phone_1?: string;
  phone_2?: string;
  email: string;
  accept_delivery: string;
  delivery_address?: string;
  has_read: string;
  info_delivered: string;
  code: string;
  pdf_path?: string; //
  selfie: string; //
  id_card: string; //
  account_type: string;
  opt_code: string;
  status: string;
  user_agent?: IUserAgency;
}

export type { IOnboard };
