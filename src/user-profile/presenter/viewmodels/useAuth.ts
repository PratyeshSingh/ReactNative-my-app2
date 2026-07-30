import { useCallback } from 'react';
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

  const signIn = useCallback(async (username: string, password: string) => {
    return await loginUsecase.execute(username, password);
  }, [loginUsecase]);

  const refresh = useCallback(async (refreshToken?: string) => {
    return await refreshUsecase.execute(refreshToken);
  }, [refreshUsecase]);

  const me = useCallback(async (accessToken?: string) => {
    return await meUsecase.execute(accessToken);
  }, [meUsecase]);

  const token = useCallback(async () => {
    return await savedToken.execute();
  }, [savedToken]);

  return { signIn, refresh, me, token };
}
