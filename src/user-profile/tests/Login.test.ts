import { Login } from '../domain/usecases/Login';

describe('Login usecase', () => {
  it('calls repository and returns response', async () => {
    const mockRepo = {
      login: jest.fn().mockResolvedValue({ accessToken: 'abc', refreshToken: 'ref', user: { id: 1 } }),
      saveToken: jest.fn(),
      getToken: jest.fn(),
      clearToken: jest.fn(),
      me: jest.fn(),
    } as any;

    const usecase = new Login(mockRepo);
    const res = await usecase.execute('kminchelle', '0lelplR');
    expect(mockRepo.login).toHaveBeenCalledWith({ username: 'kminchelle', password: '0lelplR' });
    expect(res.accessToken).toBe('abc');
  });
});
