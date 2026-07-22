

export class UserApiClient {
  async fetchUser(id: string) {
    const res = await fetch(`https://api.example.com/users/${id}`);
    return res.json(); // raw DTO shape
  }
}