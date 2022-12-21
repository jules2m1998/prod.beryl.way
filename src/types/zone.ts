interface IZoneTypeRequest {
  name: string;
  level: number;
}

interface IZoneRequest {
  short_name: string;
  country_code: string;
  zone_type_id: number;
  name: string;
  parent_id: number | null;
}

interface IZoneType {
  id: number;
  name: string;
  level: number;
  created_at: Date;
}

interface IZone {
  id: number;
  name: string;
  short_name: string;
  country_code: number;
  parent_id: number;
  zone_type_id: number;
  created_at: number;
  type: IZoneType;
  children: IZone;
  mother: IZone;
}

export type { IZoneTypeRequest, IZoneType, IZone, IZoneRequest };
