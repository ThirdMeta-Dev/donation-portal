import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "./supabase";
import { authApi, setCurrentToken } from "./api";

export type UserRole = "donor" | "admin";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  pan?: string;
  donorType?: "indian" | "nri" | "foreign";
  country?: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  donorType?: string;
  country?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

function isAdminEmail(email: string) {
  return email === "admin@ashakiran.org" || email.endsWith("@ashakiran.org");
}

function supabaseUserToAppUser(supaUser: any): AppUser {
  const meta = supaUser.user_metadata || {};
  return {
    id: supaUser.id,
    name: meta.name || supaUser.email?.split("@")[0] || "User",
    email: supaUser.email || "",
    phone: meta.phone,
    pan: meta.pan,
    donorType: meta.donorType as AppUser["donorType"],
    country: meta.country || "India",
    role: isAdminEmail(supaUser.email || "") ? "admin" : "donor",
    createdAt: supaUser.created_at || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // ── STEP 1: Fast pre-load from localStorage ────────────────────────────────
    // Populates user + token immediately so returning users don't see a flash.
    // IMPORTANT: does NOT call setIsLoading(false) — that is owned by
    // onAuthStateChange below to prevent the race where getSession() resolves
    // with null *before* INITIAL_SESSION fires with the real session, which
    // previously caused an instant redirect to /auth.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        setUser(supabaseUserToAppUser(session.user));
        setCurrentToken(session.access_token);
      }
      // ⚠️  intentionally NOT setting isLoading here
    });

    // ── STEP 2: Single source of truth for isLoading ───────────────────────────
    // onAuthStateChange fires INITIAL_SESSION with the definitive session state
    // (after any background token-refresh has completed).  Only after this event
    // do we unlock the dashboards — preventing any premature redirect to /auth.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setUser(supabaseUserToAppUser(session.user));
        setCurrentToken(session.access_token);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setCurrentToken(null);
      }

      // isLoading → false exactly once (on INITIAL_SESSION) and stays false
      // for all subsequent events (SIGNED_IN, TOKEN_REFRESHED, etc.)
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: "Invalid email or password. Use admin@ashakiran.org / Admin@123 or donor@test.com / Donor@123" };
    }
    if (data.user) {
      setUser(supabaseUserToAppUser(data.user));
      setCurrentToken(data.session?.access_token || null);
    }
    return { success: true };
  };

  const signup = async (data: SignupData): Promise<{ success: boolean; error?: string }> => {
    try {
      await authApi.signup(data);
      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) return { success: false, error: "Account created but sign-in failed. Please log in." };
      if (signInData.user) {
        setUser(supabaseUserToAppUser(signInData.user));
        setCurrentToken(signInData.session?.access_token || null);
      }
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || "Signup failed. Email may already be registered." };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentToken(null);
  };

  const getToken = async (): Promise<string | null> => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    return {
      user: null,
      isLoading: false,
      login: async () => ({ success: false as const, error: "Auth not ready" }),
      signup: async () => ({ success: false as const, error: "Auth not ready" }),
      logout: () => {},
      getToken: async () => null,
    };
  }
  return ctx;
}
