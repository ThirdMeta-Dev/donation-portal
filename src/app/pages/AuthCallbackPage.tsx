import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Heart, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { FOUNDATION_NAME } from "../lib/constants";

type Status = "loading" | "success" | "error";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("Completing your sign-in...");

  useEffect(() => {
    let redirectTimer: ReturnType<typeof setTimeout>;

    const handleCallback = async () => {
      try {
        // Check if there's an error from the OAuth provider
        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");

        if (errorParam) {
          setStatus("error");
          setMessage(
            errorDescription ||
              `Sign-in was cancelled or failed. Please try again.`
          );
          redirectTimer = setTimeout(() => navigate("/auth", { replace: true }), 4000);
          return;
        }

        // For PKCE flow: Supabase automatically exchanges the code param
        // For implicit flow: Supabase reads the hash fragment automatically
        // In both cases, onAuthStateChange fires with SIGNED_IN
        const { data: { session }, error } = await supabase.auth.getSession();

        if (session?.user) {
          setStatus("success");
          setMessage("Sign-in successful! Redirecting you...");
          redirectTimer = setTimeout(() => navigate("/dashboard", { replace: true }), 1500);
          return;
        }

        if (error) {
          throw error;
        }

        // Session not available yet — wait for onAuthStateChange
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (event === "SIGNED_IN" && session) {
              subscription.unsubscribe();
              setStatus("success");
              setMessage("Sign-in successful! Redirecting you...");
              redirectTimer = setTimeout(
                () => navigate("/dashboard", { replace: true }),
                1500
              );
            } else if (event === "SIGNED_OUT") {
              subscription.unsubscribe();
              setStatus("error");
              setMessage("Sign-in failed. Please try again.");
              redirectTimer = setTimeout(
                () => navigate("/auth", { replace: true }),
                3000
              );
            }
          }
        );

        // Fallback: if nothing fires after 8s, redirect to auth
        redirectTimer = setTimeout(() => {
          subscription.unsubscribe();
          setStatus("error");
          setMessage("Session timed out. Please try signing in again.");
          setTimeout(() => navigate("/auth", { replace: true }), 2000);
        }, 8000);
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.message || "An unexpected error occurred. Please try again.");
        redirectTimer = setTimeout(() => navigate("/auth", { replace: true }), 4000);
      }
    };

    handleCallback();

    return () => {
      if (redirectTimer) clearTimeout(redirectTimer);
    };
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-200">
          <Heart size={24} className="text-white fill-white" />
        </div>

        <h1 className="text-slate-900 text-xl mb-6" style={{ fontWeight: 700 }}>
          {FOUNDATION_NAME}
        </h1>

        {/* Status Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto flex items-center justify-center">
                <Loader2 size={48} className="text-orange-500 animate-spin" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-base">{message}</p>
                <p className="text-slate-400 text-sm mt-1">Please wait a moment</p>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"
                  style={{
                    animation: "progress 8s linear forwards",
                    width: "0%",
                  }}
                />
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={36} className="text-green-500" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-base">{message}</p>
                <p className="text-slate-400 text-sm mt-1">Taking you to your dashboard...</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={36} className="text-red-500" />
              </div>
              <div>
                <p className="text-slate-800 font-semibold text-base">Sign-in failed</p>
                <p className="text-slate-500 text-sm mt-1">{message}</p>
                <p className="text-slate-400 text-xs mt-2">Redirecting you back...</p>
              </div>
              <button
                onClick={() => navigate("/auth", { replace: true })}
                className="mt-2 text-orange-600 text-sm font-semibold hover:underline"
              >
                Go back now
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}
