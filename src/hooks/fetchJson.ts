

export const baseUrl = 'https://dummyjson.com';

export async function getCall<T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...headers },
  });
  if (!response.ok) {
    throw new Error(`Network request failed: ${response.status}`);
  }
  return response.json();
}

export async function postCall<T>(
  url: string,
  headers?: Record<string, string>,
  body?: any
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Network request failed: ${response.status}`);
  }
  return response.json();
}
