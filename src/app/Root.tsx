import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./lib/AuthContext";

// Pages that skip global Navbar + Footer (have their own layouts)
const BARE_PAGES = ["/payment", "/thank-you", "/lms/learn", "/auth/callback"];

// Clear old localStorage dummy data (one-time migration to Supabase)
function clearOldLocalStorage() {
  if (!localStorage.getItem("akf_migrated_v3")) {
    localStorage.removeItem("asha_kiran_donations");
    localStorage.removeItem("asha_kiran_user");
    localStorage.removeItem("asha_kiran_registered");
    localStorage.setItem("akf_migrated_v3", "true");
  }
}

function Layout() {
  const location = useLocation();
  const isBare = BARE_PAGES.some(p => location.pathname.startsWith(p));
  const isAuth = location.pathname === "/auth";
  const isDashboard = ["/dashboard", "/admin", "/lms/dashboard"].some(p => location.pathname.startsWith(p));

  useEffect(() => { clearOldLocalStorage(); }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isBare && !isAuth && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isBare && !isAuth && !isDashboard && <Footer />}
    </div>
  );
}

export function Root() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}