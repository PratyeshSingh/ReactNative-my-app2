import { AuthRepository } from '../repositories/AuthRepository';

export class RefreshSession {
  constructor(private authRepo: AuthRepository) {}

  async execute(refreshToken?: string, expiresInMins?: number) {
    return this.authRepo.refresh(refreshToken, expiresInMins);
  }
}
