import type { IUser } from "@/types/IUser";
import type { IMessage } from "@/types/message";
import type { IModel } from "@/types/model";

export interface IConversation extends IModel {
  closed: string;
  user_id: string;
  reason: string;
  user: IUser;
  messages: IMessage[];
}
