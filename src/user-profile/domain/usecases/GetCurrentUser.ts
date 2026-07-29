import { AuthRepository } from '../repositories/AuthRepository';

export class GetCurrentUser {
  constructor(private authRepo: AuthRepository) {}

  async execute(accessToken?: string) {
    return this.authRepo.authMe(accessToken);
  }
}
