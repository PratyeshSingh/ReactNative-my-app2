
import { UserApiClient } from '../user-profile/data/api/UserApi';
import { AuthRepositoryImpl } from '../user-profile/data/repositories/AuthRepositoryImpl';
import { UserRepositoryImpl } from '../user-profile/data/repositories/UserRepositoryImpl';
import { GetCurrentUser } from '../user-profile/domain/usecases/GetCurrentUser';
import { GetUserProfile } from '../user-profile/domain/usecases/GetUserProfile';
import { Login } from '../user-profile/domain/usecases/Login';
import { RefreshSession } from '../user-profile/domain/usecases/RefreshSession';

const userApi = new UserApiClient();
const userRepository = new UserRepositoryImpl(userApi);
const authRepository = new AuthRepositoryImpl();

export const container = {
  getUserProfile: new GetUserProfile(userRepository),
  login: new Login(authRepository),
  refreshSession: new RefreshSession(authRepository),
  getCurrentUser: new GetCurrentUser(authRepository),
  authRepository,
  // updateUserProfile: new UpdateUserProfile(userRepository),
  // ...other use cases, sharing the same repository instance
};