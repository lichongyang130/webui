const TOKEN_KEY = "mui_token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function req<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`/api${path}`, { ...opts, headers });
  if (res.status === 401) {
    clearToken();
    if (!location.pathname.startsWith("/login")) location.href = "/login";
    throw new Error("未登录");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `请求失败 ${res.status}`);
  return data as T;
}

export const api = {
  get: <T = any>(p: string) => req<T>(p),
  post: <T = any>(p: string, body?: any) => req<T>(p, { method: "POST", body: JSON.stringify(body ?? {}) }),
  put: <T = any>(p: string, body?: any) => req<T>(p, { method: "PUT", body: JSON.stringify(body ?? {}) }),
  del: <T = any>(p: string) => req<T>(p, { method: "DELETE" }),
};
