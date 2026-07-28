import {
  User,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../../services/firebase";

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
  canAccessProfessorArea: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

async function getAccessProfile(user: User) {
  const tokenResult = await getIdTokenResult(user);
  const configuredAdminEmail = process.env.EXPO_PUBLIC_ADMIN_EMAIL
    ?.trim()
    .toLowerCase();
  const isConfiguredAdmin = Boolean(
    configuredAdminEmail && user.email?.toLowerCase() === configuredAdminEmail,
  );
  const isAdmin = tokenResult.claims.role === "admin" || isConfiguredAdmin;

  if (isAdmin || tokenResult.claims.role === "teacher") {
    return { isAdmin, isProfessor: true };
  }

  const profile = await getDoc(doc(db, "professores", user.uid));
  return { isAdmin: false, isProfessor: profile.exists() };
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [canAccessProfessorArea, setCanAccessProfessorArea] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setInitializing(true);
      setUser(currentUser);

      if (!currentUser) {
        setCanAccessProfessorArea(false);
        setIsAdmin(false);
        setInitializing(false);
        return;
      }

      try {
        const accessProfile = await getAccessProfile(currentUser);

        if (!cancelled) {
          setCanAccessProfessorArea(accessProfile.isProfessor);
          setIsAdmin(accessProfile.isAdmin);
          setInitializing(false);
        }
      } catch {
        if (!cancelled) {
          setCanAccessProfessorArea(false);
          setIsAdmin(false);
          setInitializing(false);
        }
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  const value = useMemo(
    () => ({ user, initializing, canAccessProfessorArea, isAdmin, login, logout }),
    [user, initializing, canAccessProfessorArea, isAdmin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
