import type { IModel } from "./model";

interface IAgenceRequest {
  name: string;
  location: string;
  longitude: number;
  latitude: number;
  zone_id: number;
  active: number;
  file: File | null;
}

interface IAgence extends IModel {
  name: string;
  zone_id: number;
  longitude: number;
  latitude: number;
  path: string;
  location: string;
  active: boolean;
}

export type { IAgenceRequest, IAgence };
