
import { UserApiClient } from '../user-profile/data/api/UserApi';
import { UserRepositoryImpl } from '../user-profile/data/repositories/UserRepositoryImpl';
import { GetUserProfile } from '../user-profile/domain/usecases/GetUserProfile';

const userApi = new UserApiClient();
const userRepository = new UserRepositoryImpl(userApi);

export const container = {
  getUserProfile: new GetUserProfile(userRepository),
  // updateUserProfile: new UpdateUserProfile(userRepository),
  // ...other use cases, sharing the same repository instance
};