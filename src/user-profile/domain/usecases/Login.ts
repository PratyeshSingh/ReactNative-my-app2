import { AuthRepository } from '../repositories/AuthRepository';

export class Login {
  constructor(private authRepo: AuthRepository) {}

  async execute(username: string, password: string) {
    if (!username || !password) throw new Error('username and password required');
    const resp = await this.authRepo.login({ username, password });
    return resp;
  }
}
