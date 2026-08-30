// token 三通道:内存 > localStorage > HttpOnly Cookie(浏览器自动携带,兜底)
const TOKEN_KEY = "mui_token";
let memToken = "";

function safeGet(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
}
export const getToken = () => memToken || safeGet();
export const setToken = (t: string) => {
  memToken = t;
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    /* 存储受限环境(如第三方 iframe)降级为内存+Cookie */
  }
};
export const clearToken = () => {
  memToken = "";
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {}
};

async function req<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`/api${path}`, {
    ...opts,
    headers,
    credentials: "same-origin", // 带上会话 Cookie 兜底
  });
  if (res.status === 401) {
    clearToken();
    if (!location.pathname.startsWith("/admin/login")) location.href = "/admin/login";
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
