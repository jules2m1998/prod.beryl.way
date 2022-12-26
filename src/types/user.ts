interface IUserRequest {
  path?: File;
  name: string;
  phone: string;
  email: string;
  is_client: 0 | 1;
  password: string;
  agence_id: number;
  interaction_type_id: number;
}

export type { IUserRequest };
