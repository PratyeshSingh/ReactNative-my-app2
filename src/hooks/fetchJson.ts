

export const baseUrl = 'https://dummyjson.com';

export async function getCall<T>(
  url: string,
  headers?: Record<string, string>,
  signal?: AbortSignal | undefined
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers },
    signal: signal,
  });
  if (!response.ok) {
    let errorMessage = `Network request failed: ${response.status}`;
    try {
      const errBody = await response.json();
      if (errBody?.message) errorMessage = errBody.message;
    } catch { }
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function postCall<T>(
  url: string,
  headers?: Record<string, string>,
  signal?: AbortSignal | undefined,
  body?: any
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
    signal: signal,
  });
  if (!response.ok) {
    let errorMessage = `Network request failed: ${response.status}`;
    try {
      const errBody = await response.json();
      if (errBody?.message) errorMessage = errBody.message;
    } catch { }
    throw new Error(errorMessage);
  }
  return response.json();
}
