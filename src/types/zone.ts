interface IZoneRequest {
  name: string;
  level: number;
}

interface IZoneType {
  id: number;
  name: string;
  level: number;
  created_at: Date;
}

export type { IZoneRequest, IZoneType };
