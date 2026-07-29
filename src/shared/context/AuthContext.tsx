import { ApiUser, clearToken, getSession, signIn } from "@/services/api";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextValue = { user: ApiUser | null; initializing: boolean; canAccessProfessorArea: boolean; isAdmin: boolean; login: (email: string, password: string) => Promise<void>; logout: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [initializing, setInitializing] = useState(true);
  useEffect(() => { void getSession().then((session) => { setUser(session); setInitializing(false); }); }, []);
  async function login(email: string, password: string) { setUser(await signIn(email, password)); }
  async function logout() { await clearToken(); setUser(null); }
  const value = useMemo(() => ({ user, initializing, canAccessProfessorArea: user?.role === "PROFESSOR", isAdmin: user?.role === "PROFESSOR", login, logout }), [user, initializing]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within an AuthProvider"); return context; }
