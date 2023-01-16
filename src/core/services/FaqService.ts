import type { IFaq } from "@/types/faq";
import { getAll, getOne } from "@/core/services/generic-service";
import type { IHttpError } from "@/types/https";

export const getAllFaq = (): Promise<IFaq[] | null> => getAll<IFaq>("faq");

export const getOneFaq = (id: number): Promise<IFaq | IHttpError> =>
  getOne<IFaq>(`faq/${id}`);
