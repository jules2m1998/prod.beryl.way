import type { IComplaint } from "./complaint";
import type { IModel } from "./model";

export interface IService extends IModel, IServiceRequest {
  parent: IService;
  children?: IService[];
  complains?: IComplaint[];
}

export interface IServiceRequest {
  name: string;
  level: string;
  parent_id?: number;
}
