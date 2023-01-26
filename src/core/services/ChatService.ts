import type { IConversation } from "@/types";
import { getAll } from "@/core/services/generic-service";

export const getAllDiscussions = (): Promise<IConversation[] | null> =>
  getAll<IConversation>("conversation");
