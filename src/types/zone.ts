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

interface IZone extends IZoneRequest {
  id: number;
  created_at: Date;
  type: IZoneType;
  children: IZone[];
  mother?: IZone;
}

export type { IZoneTypeRequest, IZoneType, IZone, IZoneRequest };
