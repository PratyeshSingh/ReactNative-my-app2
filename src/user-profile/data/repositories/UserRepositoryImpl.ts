
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserApiClient } from '../api/UserApi';

export class UserRepositoryImpl implements UserRepository {
  constructor(private api: UserApiClient) {}

  async getUser(id: string): Promise<User> {
    const dto = await this.api.fetchUser(id);
    // mapper: DTO -> domain entity, isolates API shape from the rest of the app
    return { id: dto.id, name: dto.full_name, email: dto.email_address };
  }

  async updateUser(user: User): Promise<void> {
    // ... PATCH call
  }
}