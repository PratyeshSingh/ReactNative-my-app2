import { baseUrl, getCall, postCall } from '@/src/hooks/fetchJson';

describe('fetchJson (baseUrl, getCall & postCall)', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    // Ensure global.fetch exists in Node/Jest environment before mocking
    if (typeof global.fetch !== 'function') {
      global.fetch = jest.fn();
    }
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('baseUrl', () => {
    it('should export the correct base URL string', () => {
      expect(baseUrl).toBe('https://dummyjson.com');
    });
  });

  describe('getCall', () => {
    it('should execute a successful GET request and return parsed JSON data', async () => {
      const mockData = { id: 1, name: 'Test User' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockData),
      } as unknown as Response);

      const result = await getCall<{ id: number; name: string }>('https://dummyjson.com/users/1');

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/users/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      expect(result).toEqual(mockData);
    });

    it('should merge custom headers alongside default headers', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ success: true }),
      } as unknown as Response);

      await getCall('https://dummyjson.com/auth/me', { Authorization: 'Bearer my-token' });

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer my-token',
        },
      });
    });

    // COVERS LINES 14-19 (Branch 1: errBody has .message)
    it('should throw custom error message from JSON response body when status is not ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: jest.fn().mockResolvedValueOnce({ message: 'Token expired' }),
      } as unknown as Response);

      await expect(getCall('https://dummyjson.com/auth/me')).rejects.toThrow('Token expired');
    });

    // COVERS LINES 14-19 (Branch 2: errBody exists but has no .message)
    it('should throw default status error message when response JSON has no message field', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce({ error: 'Bad Request' }),
      } as unknown as Response);

      await expect(getCall('https://dummyjson.com/bad-request')).rejects.toThrow(
        'Network request failed: 400'
      );
    });

    // COVERS LINES 14-19 (Branch 3: response.json() throws and enters catch block)
    it('should throw default status error message when JSON parsing fails on error response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValueOnce(new Error('SyntaxError: Unexpected token')),
      } as unknown as Response);

      await expect(getCall('https://dummyjson.com/server-error')).rejects.toThrow(
        'Network request failed: 500'
      );
    });
  });

  describe('postCall', () => {
    it('should execute a successful POST request with body and return parsed JSON', async () => {
      const payload = { username: 'john', password: '123' };
      const responseData = { token: 'mock-jwt-token' };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(responseData),
      } as unknown as Response);

      const result = await postCall('https://dummyjson.com/auth/login', undefined, payload);

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual(responseData);
    });

    it('should send POST request with custom headers and undefined body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ ok: true }),
      } as unknown as Response);

      await postCall('https://dummyjson.com/ping', { 'X-Custom-Header': 'value' });

      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'value',
        },
        body: undefined,
      });
    });

    // COVERS LINES 35-40 (Branch 1: errBody has .message)
    it('should throw error message from response JSON when request fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce({ message: 'Invalid credentials' }),
      } as unknown as Response);

      await expect(
        postCall('https://dummyjson.com/auth/login', {}, { username: 'wrong' })
      ).rejects.toThrow('Invalid credentials');
    });

    // COVERS LINES 35-40 (Branch 2: errBody exists but has no .message)
    it('should fallback to status error message when response JSON has no message field', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: jest.fn().mockResolvedValueOnce({ status: 'Forbidden' }),
      } as unknown as Response);

      await expect(postCall('https://dummyjson.com/forbidden')).rejects.toThrow(
        'Network request failed: 403'
      );
    });

    // COVERS LINES 35-40 (Branch 3: response.json() throws and enters catch block)
    it('should fallback to status error message when JSON parsing throws in error block', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
        json: jest.fn().mockRejectedValueOnce(new Error('Bad Gateway HTML')),
      } as unknown as Response);

      await expect(postCall('https://dummyjson.com/bad-gateway')).rejects.toThrow(
        'Network request failed: 502'
      );
    });
  });
});