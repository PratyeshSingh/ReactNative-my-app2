import { Login } from '../domain/usecases/Login';

describe('Login usecase', () => {
  let mockRepo: any;
  let usecase: Login;

  beforeEach(() => {
    mockRepo = {
      login: jest.fn().mockResolvedValue({ accessToken: 'abc', refreshToken: 'ref', user: { id: 1 } }),
      saveToken: jest.fn(),
      getToken: jest.fn(),
      clearToken: jest.fn(),
      me: jest.fn(),
    };
    usecase = new Login(mockRepo);
  });

  it('calls repository and returns response when valid credentials are provided', async () => {
    const res = await usecase.execute('kminchelle', '0lelplR');
    expect(mockRepo.login).toHaveBeenCalledWith({ username: 'kminchelle', password: '0lelplR' });
    expect(res.accessToken).toBe('abc');
  });

  // COVERS LINE 8 BRANCHES (Missing username / password)
  it('throws an error if username is missing', async () => {
    await expect(usecase.execute('', '0lelplR')).rejects.toThrow('username and password required');
    expect(mockRepo.login).not.toHaveBeenCalled();
  });

  it('throws an error if password is missing', async () => {
    await expect(usecase.execute('kminchelle', '')).rejects.toThrow('username and password required');
    expect(mockRepo.login).not.toHaveBeenCalled();
  });

  it('throws an error if both username and password are missing', async () => {
    await expect(usecase.execute('', '')).rejects.toThrow('username and password required');
    expect(mockRepo.login).not.toHaveBeenCalled();
  });
});