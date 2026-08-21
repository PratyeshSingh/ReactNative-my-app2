
import { AuthRepositoryImpl } from '../user-profile/data/repositories/AuthRepositoryImpl';
import { GetCurrentUser } from '../user-profile/domain/usecases/GetCurrentUser';
import { GetSavedToken } from '../user-profile/domain/usecases/GetSavedToken';
import { Login } from '../user-profile/domain/usecases/Login';
import { RefreshSession } from '../user-profile/domain/usecases/RefreshSession';

const authRepository = new AuthRepositoryImpl();

export const container = {
  login: new Login(authRepository),
  refreshSession: new RefreshSession(authRepository),
  getCurrentUser: new GetCurrentUser(authRepository),
  getSavedToken : new GetSavedToken(authRepository),
  authRepository,
  // updateUserProfile: new UpdateUserProfile(userRepository),
  // ...other use cases, sharing the same repository instance
};