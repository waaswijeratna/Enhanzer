import { Location } from './location.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  status_Code: number;
  sync_Time: string;
  message: string;
  response_Body: LoginUser[];
}

export interface LoginUser {
  user_Code: string;
  user_Display_Name: string;
  email: string;
  company_Code: string;
  user_Locations: Location[];
}