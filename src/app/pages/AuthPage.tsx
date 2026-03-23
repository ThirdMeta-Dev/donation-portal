import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, GraduationCap, Loader2, BookOpen } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { supabase } from "../lib/supabase";
import { FOUNDATION_NAME } from "../lib/constants";

type Mode = "login" | "signup";
type DonorType = "indian" | "nri" | "foreign";

export function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [donorType, setDonorType] = useState<DonorType>("indian");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "apple" | null>(null);

  const { login, signup, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Where to go after login — use returnTo state if provided, else dashboard
  const returnTo: string = (location.state as any)?.returnTo || "/dashboard";

  // If already logged in (or just logged in), redirect — single source of truth
  useEffect(() => {
    if (!authLoading && user) {
      navigate(returnTo, { replace: true });
    }
  }, [user, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      if (mode === "login") {
        const res = await login(email, password);
        // Navigation is handled by the useEffect above when user state updates
        if (!res.success) setError(res.error || "Login failed");
      } else {
        if (!name.trim()) { setError("Name is required"); return; }
        if (!email.trim()) { setError("Email is required"); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
        const res = await signup({ name, email, password, phone, donorType, country });
        if (!res.success) setError(res.error || "Signup failed");
        // Navigation handled by useEffect on user state change
      }
    } finally { setLoading(false); }
  };

  async function handleSocialLogin(provider: "google" | "apple") {
    setSocialLoading(provider);
    setError("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams:
            provider === "google"
              ? { access_type: "offline", prompt: "consent" }
              : undefined,
        },
      });
      if (error) {
        if (error.message.toLowerCase().includes("provider") || error.message.toLowerCase().includes("not enabled")) {
          setError(
            provider === "google"
              ? "Google sign-in is not enabled yet. Go to Supabase Dashboard → Authentication → Providers → Google, enable it, and add your Google OAuth Client ID & Secret."
              : "Apple sign-in is not enabled yet. Go to Supabase Dashboard → Authentication → Providers → Apple, enable it, and add your Apple Service ID, Team ID, Key ID & Private Key."
          );
        } else {
          setError(`${provider === "google" ? "Google" : "Apple"} sign-in failed: ${error.message}`);
        }
      }
      // If no error, the browser will be redirected to the OAuth provider — no further action needed here
    } catch (e: any) {
      setError(e.message || "Social login failed. Please try again.");
    } finally {
      setSocialLoading(null);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#F8F5EF" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md" style={{ background: "#1B2B3A" }}>
            <BookOpen size={24} className="text-white" />
          </div>
          <h1 className="text-2xl" style={{ fontWeight: 800, fontFamily: "var(--font-heading)", color: "#1C1C1A" }}>{FOUNDATION_NAME}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {mode === "login" ? "Welcome back!" : "Join thousands of changemakers"}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Mode toggle */}
          <div className="flex border-b border-slate-100">
            {(["login", "signup"] as Mode[]).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }}
                className={`flex-1 py-4 text-sm transition-all`}
                style={{
                  fontWeight: mode === m ? 700 : 400,
                  color: mode === m ? "#1B2B3A" : "#6B6B60",
                  borderBottom: mode === m ? "2px solid #1B2B3A" : "2px solid transparent",
                  background: mode === m ? "#F0F4F7" : "transparent",
                }}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Social Login */}
          <div className="px-6 pt-5 pb-4 space-y-2">
            <button onClick={() => handleSocialLogin("google")} disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 py-3 rounded-xl transition-all disabled:opacity-60"
              style={{ fontWeight: 500 }}>
              {socialLoading === "google" ? <Loader2 size={16} className="animate-spin text-slate-500" /> : (
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
              )}
              Continue with Google
            </button>

            <button onClick={() => handleSocialLogin("apple")} disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 bg-black hover:bg-slate-900 text-white py-3 rounded-xl transition-all disabled:opacity-60"
              style={{ fontWeight: 500 }}>
              {socialLoading === "apple" ? <Loader2 size={16} className="animate-spin text-white" /> : (
                <svg width="18" height="18" viewBox="0 0 814 1000" fill="white">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.1 134.3-316.7 266.1-316.7 70.8 0 130.3 46.3 174.1 46.3 42.8 0 110.5-50.6 190.5-50.6 72.7 0 172.7 38.5 244.7 129.5zm-209.9-176.5c32.7-37.7 56.2-90 56.2-142.3 0-8.3-.7-16.6-2.2-23.6-54.1 2.2-117.7 37.4-157.4 80.7-29.1 32.7-57.8 84.2-57.8 140.3 0 9 1.4 18 2.2 21.2 3.2.6 8.3 1.4 13.4 1.4 49.1 0 108.1-33.4 145.6-77.7z"/>
                </svg>
              )}
              Continue with Apple
            </button>

            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">or with email</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-5 space-y-4">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div key="signup-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 overflow-hidden">
                  <div>
                    <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={name} onChange={e => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none"
                        style={{ borderColor: "#E5E0D8" }}
                        placeholder="Rajesh Mehta" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Phone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={phone} onChange={e => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none"
                        style={{ borderColor: "#E5E0D8" }}
                        placeholder="+91 9876543210" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-sm mb-2" style={{ fontWeight: 500 }}>Donor Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { id: "indian", label: "🇮🇳 Indian" },
                        { id: "nri", label: "🌏 NRI" },
                        { id: "foreign", label: "🌍 Foreign" },
                      ] as { id: DonorType; label: string }[]).map(t => (
                        <button key={t.id} type="button" onClick={() => setDonorType(t.id)}
                          className={`py-2.5 rounded-xl border-2 text-xs transition-all`}
                          style={{ fontWeight: donorType === t.id ? 600 : 400, borderColor: donorType === t.id ? "#1B2B3A" : "#E5E0D8", background: donorType === t.id ? "#F0F4F7" : "transparent", color: donorType === t.id ? "#1B2B3A" : "#6B6B60" }}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {donorType !== "indian" && (
                    <div>
                      <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Country</label>
                      <input value={country} onChange={e => setCountry(e.target.value)}
                        className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none"
                        style={{ borderColor: "#E5E0D8" }}
                        placeholder="USA / UK / UAE..." />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Email Address *</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                  className="w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none"
                  style={{ borderColor: "#E5E0D8" }}
                  placeholder="you@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 text-sm mb-1.5" style={{ fontWeight: 500 }}>Password *</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={password} onChange={e => setPassword(e.target.value)} type={showPass ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none"
                  style={{ borderColor: "#E5E0D8" }}
                  placeholder={mode === "signup" ? "Min. 8 characters" : "Your password"} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
                <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {mode === "login" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
                <div style={{ fontWeight: 600 }} className="mb-1">Test Credentials:</div>
                <div>🔑 Admin: <code>admin@ashakiran.org</code> / <code>Admin@123</code></div>
                <div>💚 Donor: <code>donor@test.com</code> / <code>Donor@123</code></div>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm transition-all disabled:opacity-60"
              style={{ fontWeight: 700, background: "#1B2B3A", color: "#F8F5EF" }}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  {mode === "login" ? "Signing in..." : "Creating account..."}
                </span>
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </button>

            {mode === "login" && (
              <div className="text-center">
                <Link to="#" className="text-sm text-orange-600 hover:underline">Forgot password?</Link>
              </div>
            )}
          </form>

          {/* Guest actions */}
          <div className="px-6 pb-6 space-y-2">
            <Link to="/donate"
              className="flex items-center justify-center gap-2 w-full border-2 border-slate-200 text-slate-700 py-3 rounded-xl hover:bg-slate-50 transition-colors text-sm"
              style={{ fontWeight: 500 }}>
              <Heart size={15} className="text-orange-500" /> Donate without account
            </Link>
            <Link to="/lms"
              className="flex items-center justify-center gap-2 w-full border-2 border-teal-200 text-teal-700 py-3 rounded-xl hover:bg-teal-50 transition-colors text-sm"
              style={{ fontWeight: 500 }}>
              <GraduationCap size={15} /> Browse Learning Courses (no login needed)
            </Link>
          </div>
        </div>

        {/* Legal links */}
        <div className="text-center mt-6 text-xs text-slate-400 flex items-center justify-center gap-4 flex-wrap">
          <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-600">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-slate-600">Cookie Policy</Link>
          <Link to="/refund" className="hover:text-slate-600">Refund Policy</Link>
        </div>
      </div>
    </div>
  );
}