import { useState } from 'react';
import { GetCurrentUser } from '../../domain/usecases/GetCurrentUser';
import { GetSavedToken } from '../../domain/usecases/GetSavedToken';
import { Login } from '../../domain/usecases/Login';
import { RefreshSession } from '../../domain/usecases/RefreshSession';

export function useAuth(
  loginUsecase: Login, 
  refreshUsecase: RefreshSession,
  savedToken: GetSavedToken,
  meUsecase: GetCurrentUser
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(username: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await loginUsecase.execute(username, password);
      return result;
    } catch (e: any) {
      setError(e?.message ?? 'Login failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function refresh(refreshToken?: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await refreshUsecase.execute(refreshToken);
      return res;
    } catch (e: any) {
      setError(e?.message ?? 'Refresh failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function me(accessToken?: string) {
    setLoading(true);
    setError(null);
    try {
      const user = await meUsecase.execute(accessToken);
      return user;
    } catch (e: any) {
      setError(e?.message ?? 'Fetch user failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  async function token() {
    setLoading(true);
    setError(null);
    try {
      const token = await savedToken.execute();
      return token;
    } catch (e: any) {
      setError(e?.message ?? 'Fetch token failed');
      throw e;
    } finally {
      setLoading(false);
    }
  }

  return { signIn, refresh, me, token, loading, error };
}
