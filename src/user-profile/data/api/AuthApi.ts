
import { baseUrl, getCall, postCall } from '@/src/hooks/fetchJson';

export type LoginRequest = { username: string; password: string; expiresInMins?: number };

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  expiresAt?: number;
};

export type UserSummary = {
  id: number;
  name: string;
  email: string;
  image: string;
};


export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
  return postCall<LoginResponse>(`${baseUrl}/auth/login`, undefined, body);
}

export async function authMeApi(token: string): Promise<LoginResponse> {
  return getCall<LoginResponse>(`${baseUrl}/auth/me`, {
    Authorization: `Bearer ${token}`,
  });
}

export type RefreshRequest = { refreshToken?: string; expiresInMins?: number };

export async function refreshApi(body: RefreshRequest): Promise<LoginResponse> {
  return postCall<LoginResponse>(`${baseUrl}/auth/refresh`, undefined, body);
}
