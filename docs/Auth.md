Authentication (Auth) — Implementation Guide

Purpose
- Describe a concrete, testable implementation for the app's authentication flow using the DummyJSON auth endpoints (see https://dummyjson.com/docs/auth#auth-me). The guide covers API client, repository, usecase, viewmodel/presenter, UI hints, secure storage, token refresh, and example tests.

API surface (reference)
- Login: POST /auth/login — body: `{ username, password, expiresInMins? }`. Returns `accessToken`, `refreshToken` and user info (tokens also set via cookies).
- Me: GET /auth/me — protected endpoint returning the current user; use `Authorization: Bearer <accessToken>` header (or cookies).
- Refresh: POST /auth/refresh — body: `{ refreshToken?, expiresInMins? }`. Returns new `accessToken` and `refreshToken`.

Goals & constraints
- Keep domain logic in usecases. Keep networking in `data/api` and mapping in `data/repositories`.
- Store tokens securely (prefer `expo-secure-store` on native; use `AsyncStorage` as fallback for web).
- Provide a single `AuthRepository` interface the rest of the app consumes.
- Make all network calls injectable so tests can mock them.

Suggested file layout (place under `src/user-profile` or a new `src/auth` module)
- `src/auth/data/api/AuthApi.ts` — raw HTTP client for login/me.
- `src/auth/data/repositories/AuthRepositoryImpl.ts` — maps api responses to domain models and handles storage.
- `src/auth/domain/repositories/AuthRepository.ts` — repository interface.
- `src/auth/domain/usecases/Login.ts` — performs login and returns domain `User`/token.
- `src/auth/presenter/viewmodels/useAuth.ts` — hook that presenters/screens use.
- `src/auth/tests/` — unit tests for usecases and repository logic.

Example snippets

1) Minimal `AuthApi` (TypeScript, fetch-based)

```ts
// src/user-profile/data/api/AuthApi.ts
export type LoginRequest = { username: string; password: string; expiresInMins?: number };
export type LoginResponse = { accessToken?: string; refreshToken?: string; expiresInMins?: number; user?: any };

const API_BASE = 'https://dummyjson.com';

export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
	const res = await fetch(`${API_BASE}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
		credentials: 'include',
	});
	if (!res.ok) throw new Error(`Login failed: ${res.status}`);
	return res.json();
}

export async function meApi(token: string) {
	const res = await fetch(`${API_BASE}/auth/me`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Failed to fetch profile');
	return res.json();
}

export type RefreshRequest = { refreshToken?: string; expiresInMins?: number };
export async function refreshApi(body: RefreshRequest) {
	const res = await fetch(`${API_BASE}/auth/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body || {}),
		credentials: 'include',
	});
	if (!res.ok) throw new Error(`Refresh failed: ${res.status}`);
	return res.json();
}
```

2) Domain repository interface

```ts
// src/user-profile/domain/repositories/AuthRepository.ts
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
```

3) Simple `AuthRepositoryImpl` behaviour (implementation lives at `src/user-profile/data/repositories/AuthRepositoryImpl.ts`)

- Saves `{ accessToken, refreshToken }` as the token object.
- `login` calls `/auth/login`, stores tokens when present, and returns the response DTO.
- `me` tries the provided access token or the stored access token and calls `/auth/me`.
- `refresh` calls `/auth/refresh` with an optional `refreshToken` and updates stored tokens on success.

See the repository implementation in `src/user-profile/data/repositories/AuthRepositoryImpl.ts` for storage fallbacks (SecureStore, AsyncStorage, localStorage) and exact behaviour.

4) Usecase: `Login`

```ts
// src/auth/domain/usecases/Login.ts
import { AuthRepository } from '../repositories/AuthRepository';

export class Login {
	constructor(private authRepo: AuthRepository) {}

	async execute(username: string, password: string) {
		const resp = await this.authRepo.login({ username, password });
		// map/validate response as needed
		return resp;
	}
}
```

5) Hook / ViewModel example

```ts
// src/auth/presenter/viewmodels/useAuth.ts
import { useState } from 'react';
import { Login } from '../../domain/usecases/Login';

export function useAuth(loginUsecase: Login) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function signIn(username: string, password: string) {
		setLoading(true);
		setError(null);
		try {
			const result = await loginUsecase.execute(username, password);
			return result;
		} catch (e: any) {
			setError(e.message || 'Login failed');
			throw e;
		} finally {
			setLoading(false);
		}
	}

	return { signIn, loading, error };
}
```

UI/UX notes
- Keep the login screen minimal: username and password fields, clear error states, and a loading indicator.
- On success, navigate to the authenticated area and avoid storing sensitive info in global Redux stores. Use repository-backed token storage.

Testing
- Unit tests should target the usecase and repository mapping logic.
- Example Jest test for `Login` usecase (mock `AuthRepository`):

```ts
// src/auth/tests/Login.test.ts
import { Login } from '../domain/usecases/Login';

test('Login calls repository and returns response', async () => {
	const mockRepo = {
		login: jest.fn().mockResolvedValue({ token: 'abc', user: { id: 1 } }),
		saveToken: jest.fn(),
		getToken: jest.fn(),
		clearToken: jest.fn(),
		me: jest.fn(),
	};
	const usecase = new Login(mockRepo as any);
	const res = await usecase.execute('kminchelle', '0lelplR');
	expect(mockRepo.login).toHaveBeenCalledWith({ username: 'kminchelle', password: '0lelplR' });
	expect(res.token).toBe('abc');
});
```

Security considerations
- Prefer `expo-secure-store` or native secure storage to persist tokens.
- Use short-lived tokens when possible and a refresh token flow if the backend provides it.
- Clear tokens on logout and on auth errors like 401.

Integration notes for this repo
- The app already uses `src/core-di/container.ts` and DI entrypoints. Register `AuthRepositoryImpl` and `Login` usecase with the DI container so screens can resolve `useAuth` with the concrete usecase.
- Add API client wiring consistent with `src/product_browser/data/api/ProductApi.ts` patterns if present.

Next steps
- Implement the files above under `src/auth/` and register them in the DI container.
- Add UI screens and hook them into navigation.
- Add unit tests and run `yarn test`.

References
- DummyJSON Auth: https://dummyjson.com/docs/auth#auth-me

