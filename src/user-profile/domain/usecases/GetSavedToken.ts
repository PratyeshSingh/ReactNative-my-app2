import { AuthRepository } from '../repositories/AuthRepository';

export class GetSavedToken {
  constructor(private authRepo: AuthRepository) {}

  async execute() {
    return this.authRepo.getToken();
  }
}
