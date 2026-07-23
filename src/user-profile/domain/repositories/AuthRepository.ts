import { LoginRequest, LoginResponse } from '../../data/api/AuthApi';

export type Token = { accessToken: string; refreshToken?: string; expiresAt?: number };

export interface AuthRepository {
  login(req: LoginRequest): Promise<LoginResponse>;
  refresh(refreshToken?: string, expiresInMins?: number): Promise<LoginResponse>;
  saveToken(token: Token): Promise<void>;
  getToken(): Promise<Token | null>;
  clearToken(): Promise<void>;
  me(accessToken?: string): Promise<any>;
}
