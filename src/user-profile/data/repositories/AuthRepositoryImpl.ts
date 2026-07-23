import { AuthRepository, Token } from '../../domain/repositories/AuthRepository';
import { loginApi, LoginRequest, LoginResponse, meApi, refreshApi, RefreshRequest } from '../api/AuthApi';

const TOKEN_KEY = 'auth.token';

function warn(msg: string) {
  // eslint-disable-next-line no-console
  console.warn(`[AuthRepositoryImpl] ${msg}`);
}

async function safeSet(key: string, value: string) {
  // Try expo-secure-store, then AsyncStorage, then localStorage as fallback
  try {
    // @ts-ignore
    const SecureStore = require('expo-secure-store');
    if (SecureStore && SecureStore.setItemAsync) return SecureStore.setItemAsync(key, value);
  } catch (_) {}

  try {
    // @ts-ignore
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    if (AsyncStorage && AsyncStorage.setItem) return AsyncStorage.setItem(key, value);
  } catch (_) {}

  try {
    if (typeof localStorage !== 'undefined') return localStorage.setItem(key, value);
  } catch (_) {
    warn('No persistent storage available; token will not persist across sessions');
  }
}

async function safeGet(key: string) {
  try {
    // @ts-ignore
    const SecureStore = require('expo-secure-store');
    if (SecureStore && SecureStore.getItemAsync) return SecureStore.getItemAsync(key);
  } catch (_) {}

  try {
    // @ts-ignore
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    if (AsyncStorage && AsyncStorage.getItem) return AsyncStorage.getItem(key);
  } catch (_) {}

  try {
    if (typeof localStorage !== 'undefined') return Promise.resolve(localStorage.getItem(key));
  } catch (_) {}

  return null;
}

async function safeDelete(key: string) {
  try {
    // @ts-ignore
    const SecureStore = require('expo-secure-store');
    if (SecureStore && SecureStore.deleteItemAsync) return SecureStore.deleteItemAsync(key);
  } catch (_) {}

  try {
    // @ts-ignore
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    if (AsyncStorage && AsyncStorage.removeItem) return AsyncStorage.removeItem(key);
  } catch (_) {}

  try {
    if (typeof localStorage !== 'undefined') return Promise.resolve(localStorage.removeItem(key));
  } catch (_) {}
}

export class AuthRepositoryImpl implements AuthRepository {
  async login(req: LoginRequest): Promise<LoginResponse> {
    const resp = await loginApi(req);
    // DummyJSON returns `accessToken` and `refreshToken` fields
    if (resp.accessToken) {
      const token: Token = { accessToken: resp.accessToken, refreshToken: resp.refreshToken };
      await this.saveToken(token);
    }
    return resp;
  }

  async saveToken(token: Token): Promise<void> {
    await safeSet(TOKEN_KEY, JSON.stringify(token));
  }

  async getToken(): Promise<Token | null> {
    const raw = await safeGet(TOKEN_KEY);
    try {
      return raw ? (JSON.parse(raw as string) as Token) : null;
    } catch (_) {
      return null;
    }
  }

  async clearToken(): Promise<void> {
    await safeDelete(TOKEN_KEY);
  }

  async me(accessToken?: string) {
    const token = accessToken ?? (await this.getToken())?.accessToken;
    if (!token) throw new Error('No access token available');
    return meApi(token);
  }

  async refresh(refreshToken?: string, expiresInMins?: number): Promise<LoginResponse> {
    const token = refreshToken ?? (await this.getToken())?.refreshToken;
    const body: RefreshRequest = { refreshToken: token, expiresInMins };
    const resp = await refreshApi(body);
    if (resp.accessToken) {
      const newToken: Token = { accessToken: resp.accessToken, refreshToken: resp.refreshToken };
      await this.saveToken(newToken);
    }
    return resp;
  }
}
