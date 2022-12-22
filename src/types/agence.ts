interface IAgenceRequest {
  location: string;
  longitude: number;
  latitude: number;
  zone_id: number;
  active: boolean;
}

interface IAgence {
  id: number;
  name: string;
  zone_id: number;
  longitude: number;
  latitude: number;
  path: string;
  location: string;
  active: boolean;
  created_at: Date;
}

export type { IAgenceRequest, IAgence };
