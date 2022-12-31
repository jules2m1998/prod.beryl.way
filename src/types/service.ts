import type { IModel } from "./model";

export interface IService extends IModel, IServiceRequest {
  parent: IService;
}

export interface IServiceRequest {
  name: string;
  level: string;
  parent_id?: number;
}
