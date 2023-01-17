import type { IFaq } from "@/types/faq";
import {
  createOne,
  getAll,
  getOne,
  putOne,
  putWithParams,
} from "@/core/services/generic-service";
import type { IHttpError } from "@/types/https";

export type FaqR = { title: string; answers: string };

export const getAllFaq = (): Promise<IFaq[] | null> => getAll<IFaq>("faq");

export const getOneFaq = (id: number): Promise<IFaq | IHttpError> =>
  getOne<IFaq>(`faq/${id}`);

export const createFaq = (faq: FaqR): Promise<IFaq | null> =>
  createOne<IFaq, FaqR>("faq", faq);

export const putFaq = (faq: FaqR, id: number): Promise<IFaq | IHttpError> =>
  putWithParams<IFaq, FaqR>(`faq/${id}`, faq);
