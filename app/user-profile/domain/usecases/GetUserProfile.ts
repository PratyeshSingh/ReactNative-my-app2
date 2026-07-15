import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class GetUserProfile {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<User> {
    if (!userId) throw new Error('User ID is required');
    return this.userRepository.getUser(userId);
  }
}