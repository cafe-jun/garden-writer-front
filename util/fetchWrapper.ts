export async function callApi(url: string, body?: any, method = 'GET'): Promise<any> {
  const token = localStorage.getItem('access');
  const headers: HeadersInit = {
    Authorization: token ? `Bearer ${localStorage.getItem('access')}` : '',
    'Content-Type': 'application/json',
  };
  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(((await response.json()) as Error).message);
    }
    return await response.json();
  } catch (error) {
    // 예외 처리
    if (error instanceof Error) {
      console.error('Error calling API:', error.message);
    }
    throw error;
  }
}
