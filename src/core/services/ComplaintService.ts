import { getAll } from "@/core/services/generic-service";
import type { IComplaint } from "@/types";

export const getAllComplains = () => getAll<IComplaint>("complain");
