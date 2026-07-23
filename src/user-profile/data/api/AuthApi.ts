
export type LoginRequest = { username: string; password: string; expiresInMins?: number };

export type LoginResponse = {
  accessToken?: string;
  refreshToken?: string;
  expiresInMins?: number;
  user?: any;
};

const API_BASE = 'https://dummyjson.com';

export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}

export async function meApi(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export type RefreshRequest = { refreshToken?: string; expiresInMins?: number };

export async function refreshApi(body: RefreshRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
  return res.json();
}
