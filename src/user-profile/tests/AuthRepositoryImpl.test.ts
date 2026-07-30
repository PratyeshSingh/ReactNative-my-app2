// Tests for AuthRepositoryImpl behaviour: login, me, refresh and storage

const mockSet = jest.fn().mockResolvedValue(undefined);
const mockGet = jest.fn().mockResolvedValue(null);
const mockDelete = jest.fn().mockResolvedValue(undefined);
const mockAsyncSet = jest.fn();
const mockAsyncGet = jest.fn();
const mockAsyncRemove = jest.fn();

jest.mock(
  'expo-secure-store',
  () => ({
    setItemAsync: (...args: any[]) => mockSet(...args),
    getItemAsync: (...args: any[]) => mockGet(...args),
    deleteItemAsync: (...args: any[]) => mockDelete(...args),
  }),
  { virtual: true }
);

// Mock AsyncStorage
jest.mock(
  '@react-native-async-storage/async-storage',
  () => ({
    default: {
      setItem: (...args: any[]) => mockAsyncSet(...args),
      getItem: (...args: any[]) => mockAsyncGet(...args),
      removeItem: (...args: any[]) => mockAsyncRemove(...args),
    },
  }),
  { virtual: true }
);

describe('AuthRepositoryImpl (integration with fetch & secure store mocks)', () => {
  const originalLocalStorage = global.localStorage;

  beforeEach(() => {
    jest.resetModules();
    mockSet.mockClear();
    mockGet.mockClear();
    mockDelete.mockClear();
    mockAsyncSet.mockClear();
    mockAsyncGet.mockClear();
    mockAsyncRemove.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
  });

  it('login stores accessToken and refreshToken when returned by API', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'A', refreshToken: 'R' }) });
    const mod = await import('../data/repositories/AuthRepositoryImpl');
    const { AuthRepositoryImpl } = mod as any;
    const repo = new AuthRepositoryImpl();
    const resp = await repo.login({ username: 'u', password: 'p' });
    expect(resp.accessToken).toBe('A');
    expect(mockSet).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'A', refreshToken: 'R' }));
  });

  it('me uses provided accessToken when given', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ id: 2, username: 'test' }) });
    const mod = await import('../data/repositories/AuthRepositoryImpl');
    const { AuthRepositoryImpl } = mod as any;
    const repo = new AuthRepositoryImpl();
    const user = await repo.authMe('explicit-token');
    expect(user.id).toBe(2);
    expect((global as any).fetch).toHaveBeenCalled();
  });

  it('me throws when no token available', async () => {
    mockGet.mockResolvedValueOnce(null);
    const mod = await import('../data/repositories/AuthRepositoryImpl');
    const { AuthRepositoryImpl } = mod as any;
    const repo = new AuthRepositoryImpl();
    await expect(repo.authMe()).rejects.toThrow('No access token available');
  });

  it('refresh calls refresh API and updates stored tokens', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true, json: async () => ({ accessToken: 'NEW', refreshToken: 'NEWR' }) });
    const mod = await import('../data/repositories/AuthRepositoryImpl');
    const { AuthRepositoryImpl } = mod as any;
    const repo = new AuthRepositoryImpl();
    const resp = await repo.refresh('oldRef', 30);
    expect(resp.accessToken).toBe('NEW');
    expect(mockSet).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'NEW', refreshToken: 'NEWR' }));
  });

  it('clearToken calls safeDelete with TOKEN_KEY', async () => {
    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();
    await repo.clearToken();
    expect(mockDelete).toHaveBeenCalledWith('auth.token');
  });

  it('getToken returns parsed token when stored, and null on invalid JSON', async () => {
    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    // Valid token stored
    mockGet.mockResolvedValueOnce(JSON.stringify({ accessToken: 'A', refreshToken: 'R' }));
    const token = await repo.getToken();
    expect(token).toEqual({ accessToken: 'A', refreshToken: 'R' });

    // Invalid JSON stored
    mockGet.mockResolvedValueOnce('{ invalid-json }');
    const invalidToken = await repo.getToken();
    expect(invalidToken).toBeNull();
  });

  it('login does not save token if accessToken is missing in response', async () => {
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Invalid credentials' }),
    });
    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    await repo.login({ username: 'u', password: 'wrong' });
    expect(mockSet).not.toHaveBeenCalled();
  });

  it('authMe uses stored token and updates token if response returns new accessToken', async () => {
    mockGet.mockResolvedValueOnce(JSON.stringify({ accessToken: 'STORED_A', refreshToken: 'STORED_R' }));
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, accessToken: 'NEW_A', refreshToken: 'NEW_R', expiresAt: 123456 }),
    });

    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    const res = await repo.authMe();
    expect(res.id).toBe(1);
    expect(mockSet).toHaveBeenCalledWith(
      'auth.token',
      JSON.stringify({ accessToken: 'NEW_A', refreshToken: 'NEW_R', expiresAt: 123456 })
    );
  });

  it('refresh falls back to stored refreshToken when parameter is omitted', async () => {
    mockGet.mockResolvedValueOnce(JSON.stringify({ accessToken: 'A', refreshToken: 'STORED_REF' }));
    (global as any).fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ accessToken: 'NEW_A', refreshToken: 'NEW_REF' }),
    });

    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    await repo.refresh(undefined, 15);
    expect((global as any).fetch).toHaveBeenCalled();
  });
  it('covers lines 18-25, 46-50, 70-74 (SecureStore throws -> fallback to AsyncStorage)', async () => {
    // Synchronously throw in SecureStore methods to force execution into catch blocks
    mockSet.mockImplementationOnce(() => { throw new Error('SecureStore set error'); });
    mockGet.mockImplementationOnce(() => { throw new Error('SecureStore get error'); });
    mockDelete.mockImplementationOnce(() => { throw new Error('SecureStore delete error'); });

    mockAsyncSet.mockResolvedValueOnce(undefined);
    mockAsyncGet.mockResolvedValueOnce(JSON.stringify({ accessToken: 'ASYNC_A', refreshToken: 'ASYNC_R' }));
    mockAsyncRemove.mockResolvedValueOnce(undefined);

    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    // safeSet fallback to AsyncStorage
    await repo.saveToken({ accessToken: 'A', refreshToken: 'R' });
    expect(mockAsyncSet).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'A', refreshToken: 'R' }));

    // safeGet fallback to AsyncStorage
    const token = await repo.getToken();
    expect(token).toEqual({ accessToken: 'ASYNC_A', refreshToken: 'ASYNC_R' });

    // safeDelete fallback to AsyncStorage
    await repo.clearToken();
    expect(mockAsyncRemove).toHaveBeenCalledWith('auth.token');
  });

  it('covers lines 26-30, 51-55, 75-78 (SecureStore & AsyncStorage throw -> fallback to localStorage)', async () => {
    // Both SecureStore and AsyncStorage throw synchronously
    mockSet.mockImplementationOnce(() => { throw new Error('SecureStore err'); });
    mockGet.mockImplementationOnce(() => { throw new Error('SecureStore err'); });
    mockDelete.mockImplementationOnce(() => { throw new Error('SecureStore err'); });

    mockAsyncSet.mockImplementationOnce(() => { throw new Error('AsyncStorage err'); });
    mockAsyncGet.mockImplementationOnce(() => { throw new Error('AsyncStorage err'); });
    mockAsyncRemove.mockImplementationOnce(() => { throw new Error('AsyncStorage err'); });

    // Mock localStorage
    const mockLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn().mockReturnValue(JSON.stringify({ accessToken: 'LOCAL_A', refreshToken: 'LOCAL_R' })),
      removeItem: jest.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });

    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    // safeSet -> localStorage
    await repo.saveToken({ accessToken: 'A', refreshToken: 'R' });
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('auth.token', JSON.stringify({ accessToken: 'A', refreshToken: 'R' }));

    // safeGet -> localStorage
    const token = await repo.getToken();
    expect(token).toEqual({ accessToken: 'LOCAL_A', refreshToken: 'LOCAL_R' });

    // safeDelete -> localStorage
    await repo.clearToken();
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('auth.token');
  });

  it('covers line 7 and lines 31-34 (All storages throw -> calls warn() and returns null)', async () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mockSet.mockImplementationOnce(() => { throw new Error('SecureStore err'); });
    mockGet.mockImplementationOnce(() => { throw new Error('SecureStore err'); });

    mockAsyncSet.mockImplementationOnce(() => { throw new Error('AsyncStorage err'); });
    mockAsyncGet.mockImplementationOnce(() => { throw new Error('AsyncStorage err'); });

    // localStorage throws error on setItem & getItem
    Object.defineProperty(global, 'localStorage', {
      value: {
        setItem: jest.fn().mockImplementation(() => { throw new Error('localStorage disabled'); }),
        getItem: jest.fn().mockImplementation(() => { throw new Error('localStorage disabled'); }),
      },
      writable: true,
      configurable: true,
    });

    const { AuthRepositoryImpl } = await import('../data/repositories/AuthRepositoryImpl');
    const repo = new AuthRepositoryImpl();

    // Triggers warn() on line 7 via safeSet
    await repo.saveToken({ accessToken: 'A', refreshToken: 'R' });
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      '[AuthRepositoryImpl] No persistent storage available; token will not persist across sessions'
    );

    // safeGet returns null on complete failure (line 58)
    const token = await repo.getToken();
    expect(token).toBeNull();

    consoleWarnSpy.mockRestore();
  });
});
