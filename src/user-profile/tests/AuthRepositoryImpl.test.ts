// Tests for AuthRepositoryImpl behaviour: login, me, refresh and storage

const mockSet = jest.fn().mockResolvedValue(undefined);
const mockGet = jest.fn().mockResolvedValue(null);
const mockDelete = jest.fn().mockResolvedValue(undefined);

jest.mock(
  'expo-secure-store',
  () => ({
    setItemAsync: (...args: any[]) => mockSet(...args),
    getItemAsync: (...args: any[]) => mockGet(...args),
    deleteItemAsync: (...args: any[]) => mockDelete(...args),
  }),
  { virtual: true }
);

describe('AuthRepositoryImpl (integration with fetch & secure store mocks)', () => {
  beforeEach(() => {
    jest.resetModules();
    mockSet.mockClear();
    mockGet.mockClear();
    mockDelete.mockClear();
    (global as any).fetch = jest.fn();
  });

  it('login stores accessToken and refreshToken when returned by API', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'A', refreshToken: 'R' }) });
    const { AuthRepositoryImpl } = require('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();
    const resp = await repo.login({ username: 'u', password: 'p' });
    expect(resp.accessToken).toBe('A');
    expect(mockSet).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'A', refreshToken: 'R' }));
  });

  it('me uses provided accessToken when given', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ id: 2, username: 'test' }) });
    const { AuthRepositoryImpl } = require('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();
    const user = await repo.me('explicit-token');
    expect(user.id).toBe(2);
    expect((global as any).fetch).toHaveBeenCalled();
  });

  it('me throws when no token available', async () => {
    mockGet.mockResolvedValueOnce(null);
    const { AuthRepositoryImpl } = require('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();
    await expect(repo.me()).rejects.toThrow('No access token available');
  });

  it('refresh calls refresh API and updates stored tokens', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'NEW', refreshToken: 'NEWR' }) });
    const { AuthRepositoryImpl } = require('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();
    const resp = await repo.refresh('oldRef', 30);
    expect(resp.accessToken).toBe('NEW');
    expect(mockSet).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'NEW', refreshToken: 'NEWR' }));
  });
});
