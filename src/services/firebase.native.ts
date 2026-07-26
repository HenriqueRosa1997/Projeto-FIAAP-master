import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

type ReactNativeStorageLike = {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
};

function getReactNativePersistence(storage: ReactNativeStorageLike) {
  return {
    type: "LOCAL" as const,
    async _isAvailable() {
      try {
        if (!storage) {
          return false;
        }

        await storage.setItem("firebase-auth-available", "1");
        await storage.removeItem("firebase-auth-available");
        return true;
      } catch {
        return false;
      }
    },
    _set(key: string, value: unknown) {
      return storage.setItem(key, JSON.stringify(value));
    },
    async _get(key: string) {
      const json = await storage.getItem(key);
      return json ? JSON.parse(json) : null;
    },
    _remove(key: string) {
      return storage.removeItem(key);
    },
    _addListener() {},
    _removeListener() {},
  };
}

const firebaseConfig = {
  apiKey: "AIzaSyAZg0HxkF0qw2W3St_gLb1PvuSkORxzx7Y",
  authDomain: "projeto-fiap-9358a.firebaseapp.com",
  projectId: "projeto-fiap-9358a",
  storageBucket: "projeto-fiap-9358a.firebasestorage.app",
  messagingSenderId: "156560012374",
  appId: "1:156560012374:web:457c13cc631c441430f7f7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

function initializePersistentAuth() {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    // Fast Refresh can re-evaluate this module after Auth has already started.
    return getAuth(app);
  }
}

export const auth = initializePersistentAuth();
export const db = getFirestore(app);
export const functions = getFunctions(app);
