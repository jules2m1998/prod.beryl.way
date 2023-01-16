import type { IModel } from "@/types/model";
import type { IUser } from "@/types/IUser";
import type { IUserAgency } from "@/types/user-agency";

export interface ICredit extends IModel {
  client_id: string;
  amount: string;
  interest_rate: string;
  duration: string;
  monthly_payment: string;
  estimated_cost: string;
  id_path: string;
  status: string;
  pay_slip?: any;
  salary: string;
  client_employer: string;
  on_going_credit: string;
  ongoing_amount: string;
  ongoing_monthly_payment: string;
  ongoing_credit_start: string;
  ongoing_credit_end: string;
  ongoing_credit_institution: string;
  processor_id?: number;
  processed_at?: string;
  finisher_id?: number;
  finished_at?: string;
  code: string;
  finisher?: IUserAgency;
  processor?: IUserAgency;
  client: IUser;
}
