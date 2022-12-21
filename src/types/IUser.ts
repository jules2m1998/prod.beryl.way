interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  matricule: string;
  device_id: string;
  token: string;
  opt_code: string;
  email_verified_at: string;
  avatar: string;
  creator_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  role_id: number;
}

interface IUserLogin {
  identifier: string;
  password: string;
}

interface IUserResponse {
  success: boolean;
  data: IUser;
  token: string;
  message: string;
}

export type { IUser, IUserLogin, IUserResponse };
