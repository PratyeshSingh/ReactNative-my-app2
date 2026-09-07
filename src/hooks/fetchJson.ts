

export const baseUrl = 'https://dummyjson.com';

export interface FetchOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  body?: unknown;
}

async function getErrorMessage(response: Response): Promise<string> {
  const fallback = `Network request failed: ${response.status}`;

  try {
    const errorBody = await response.json() as { message?: unknown };
    return typeof errorBody?.message === 'string' && errorBody.message.length > 0
      ? errorBody.message
      : fallback;
  } catch {
    return fallback;
  }
}

export async function getCall<T>(
  url: string,
  options: Omit<FetchOptions, 'body'> = {}
): Promise<T> {
  const { headers, signal } = options;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers },
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return response.json();
}

export async function postCall<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { headers, signal, body } = options;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }
  return response.json();
}
