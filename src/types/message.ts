import type { IModel } from "@/types/model";

export interface IMessage extends IModel {
  message: string;
  link: string;
  conversation_id: string;
  responder_id?: number;
  is_read: string;
}
