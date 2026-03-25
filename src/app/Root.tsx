import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./components/SiteNavbar";
import { Footer } from "./components/SiteFooter";
import { AuthProvider } from "./lib/AuthContext";

// Pages that skip ALL chrome (payment flow, oauth callback, etc.)
const BARE_PAGES = ["/payment", "/thank-you", "/auth/callback"];

// Pages that have their own full-page layout (internal nav/footer built in)
const BLANK_CANVAS = ["/", "/home-v2", "/home-new-1"];

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
  const isBlankCanvas = BLANK_CANVAS.includes(location.pathname);

  useEffect(() => { clearOldLocalStorage(); }, []);

  if (isBare || isBlankCanvas) {
    return (
      <main>
        <Outlet />
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* HomeV2 Navbar */}
      <div style={{ background: "linear-gradient(114.7deg, #0a2036 0%, #132f4c 100%)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Navbar />
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* HomeV2 Footer */}
      <Footer />
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
