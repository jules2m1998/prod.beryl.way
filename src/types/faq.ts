import type { IUser } from "@/types/IUser";
import type { IModel } from "@/types/model";

export interface IAnswer {
  step: number;
  value: string;
}

interface BaseFaq extends IModel {
  title: string;
  helpful_count: string;
  not_helpful_count: string;
  creator: IUser;
}
export interface IFaq extends BaseFaq {
  answers: string;
}

export interface IFaqWithResponse extends BaseFaq {
  answers: IAnswer[];
}
