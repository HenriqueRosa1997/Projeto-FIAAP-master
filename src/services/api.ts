import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "learnio-api-token";
const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? "http://192.168.0.10:3001").replace(/\/$/, "");

export type ApiUser = { id: string; username: string; role: "PROFESSOR" | "ALUNO" };

export async function getToken() { return AsyncStorage.getItem(TOKEN_KEY); }
export async function setToken(token: string) { return AsyncStorage.setItem(TOKEN_KEY, token); }
export async function clearToken() { return AsyncStorage.removeItem(TOKEN_KEY); }

function messageFrom(body: unknown, fallback: string) {
  return body && typeof body === "object" && "message" in body && typeof body.message === "string"
    ? body.message : fallback;
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const body = response.status === 204 ? undefined : await response.json().catch(() => undefined);
  if (!response.ok) throw new Error(messageFrom(body, "Não foi possível concluir a solicitação."));
  return body as T;
}

function decodePayload(token: string): Record<string, unknown> | null {
  try {
    const encoded = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(encoded));
  } catch { return null; }
}

export async function signIn(username: string, password: string) {
  const { token } = await request<{ token: string }>("/user/signin", {
    method: "POST", body: JSON.stringify({ username, password }),
  });
  await setToken(token);
  const payload = decodePayload(token);
  return { id: String(payload?.sub ?? ""), username, role: payload?.role === "PROFESSOR" ? "PROFESSOR" : "ALUNO" } as ApiUser;
}

export async function getSession(): Promise<ApiUser | null> {
  const token = await getToken();
  if (!token) return null;
  const payload = decodePayload(token);
  if (!payload || typeof payload.sub !== "string" || payload.exp && Number(payload.exp) * 1000 <= Date.now()) {
    await clearToken();
    return null;
  }
  return { id: payload.sub, username: "", role: payload.role === "PROFESSOR" ? "PROFESSOR" : "ALUNO" };
}
