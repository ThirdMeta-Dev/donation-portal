import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { BookOpen, Menu, X, User, LogOut, LayoutDashboard, Shield, ChevronDown, GraduationCap, Heart } from "lucide-react";
import { FOUNDATION_SHORT, FOUNDATION_TRUST } from "../lib/constants";
import { useAuth } from "../lib/AuthContext";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home",                  to: "/" },
  { label: "Our Mission",           to: "/causes" },
  { label: "Get Involved",          to: "/causes" },
  { label: "About",                 to: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = () => { logout(); setUserMenuOpen(false); navigate("/"); };
  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm" style={{ borderColor: "#E5E0D8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm transition-colors"
              style={{ background: "#1B2B3A" }}>
              <BookOpen size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm leading-tight" style={{ fontWeight: 700, fontFamily: "var(--font-heading)", color: "#1B2B3A" }}>
                {FOUNDATION_SHORT}
              </div>
              <div className="text-xs leading-none" style={{ color: "#B07D3A", fontWeight: 500 }}>
                {FOUNDATION_TRUST}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="px-3.5 py-2 rounded-lg text-sm transition-all"
                style={{
                  fontWeight: 500,
                  color: isActive(link.to) ? "#1B2B3A" : "#6B6B60",
                  background: isActive(link.to) ? "#F0F4F7" : "transparent",
                }}
                onMouseEnter={e => { if (!isActive(link.to)) (e.currentTarget as HTMLAnchorElement).style.color = "#1B2B3A"; (e.currentTarget as HTMLAnchorElement).style.background = "#F8F5EF"; }}
                onMouseLeave={e => { if (!isActive(link.to)) { (e.currentTarget as HTMLAnchorElement).style.color = "#6B6B60"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Learning */}
            <Link
              to="/lms"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm border transition-all"
              style={{
                fontWeight: 600,
                color: location.pathname.startsWith("/lms") ? "#F8F5EF" : "#1B2B3A",
                background: location.pathname.startsWith("/lms") ? "#1B2B3A" : "transparent",
                borderColor: "#BCC6D0",
              }}
            >
              <GraduationCap size={15} />
              <span>Learning</span>
            </Link>

            {/* Support */}
            <Link
              to="/donate"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm shadow-sm hover:shadow-md transition-all"
              style={{ fontWeight: 600, background: "#B07D3A", color: "#F8F5EF" }}
            >
              <Heart size={14} className="fill-current" />
              Support Now
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-all"
                  style={{ borderColor: "#E5E0D8" }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-white"
                    style={{ background: user.role === "admin" ? "#1B2B3A" : "#B07D3A", fontWeight: 700 }}
                  >
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm max-w-20 truncate" style={{ fontWeight: 500, color: "#1C1C1A" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={14} style={{ color: "#6B6B60" }} className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border shadow-xl overflow-hidden z-50"
                      style={{ borderColor: "#E5E0D8" }}
                    >
                      <div className="p-3 border-b" style={{ background: "#F8F5EF", borderColor: "#E5E0D8" }}>
                        <div className="text-sm" style={{ fontWeight: 600, color: "#1C1C1A" }}>{user.name}</div>
                        <div className="text-xs" style={{ color: "#6B6B60" }}>{user.email}</div>
                        <div
                          className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1"
                          style={{
                            fontWeight: 500,
                            background: user.role === "admin" ? "#F0F4F7" : "#FAF5EA",
                            color: user.role === "admin" ? "#1B2B3A" : "#8C6228",
                          }}
                        >
                          {user.role === "admin" ? <Shield size={10} /> : <User size={10} />}
                          {user.role === "admin" ? "Administrator" : "Supporter"}
                        </div>
                      </div>
                      <div className="p-2">
                        {user.role === "admin" ? (
                          <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors"
                            style={{ color: "#1C1C1A" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F0F4F7"; (e.currentTarget as HTMLAnchorElement).style.color = "#1B2B3A"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#1C1C1A"; }}>
                            <LayoutDashboard size={15} /> Admin Dashboard
                          </Link>
                        ) : (
                          <Link to="/dashboard" onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors"
                            style={{ color: "#1C1C1A" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#FAF5EA"; (e.currentTarget as HTMLAnchorElement).style.color = "#8C6228"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#1C1C1A"; }}>
                            <LayoutDashboard size={15} /> My Dashboard
                          </Link>
                        )}
                        <Link to="/lms/dashboard" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors"
                          style={{ color: "#1C1C1A" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#F0F4F7"; (e.currentTarget as HTMLAnchorElement).style.color = "#1B2B3A"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#1C1C1A"; }}>
                          <GraduationCap size={15} /> My Learning
                        </Link>
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors text-left"
                          style={{ color: "#1C1C1A" }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FEF2F2"; (e.currentTarget as HTMLButtonElement).style.color = "#A8200D"; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#1C1C1A"; }}>
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/auth"
                className="hidden sm:block text-sm px-3 py-2 rounded-lg transition-all"
                style={{ fontWeight: 500, color: "#6B6B60" }}
              >
                Sign In
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#1C1C1A" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t bg-white"
            style={{ borderColor: "#E5E0D8" }}
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link key={link.to + link.label} to={link.to} onClick={() => setMobileOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm transition-all"
                  style={{ fontWeight: 500, color: isActive(link.to) ? "#1B2B3A" : "#6B6B60", background: isActive(link.to) ? "#F0F4F7" : "transparent" }}>
                  {link.label}
                </Link>
              ))}
              <Link to="/lms" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all"
                style={{ fontWeight: 500, color: "#1B2B3A" }}>
                <GraduationCap size={15} /> Learning Platform
              </Link>
              {user && (
                <Link to="/lms/dashboard" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all"
                  style={{ fontWeight: 500, color: "#8C6228" }}>
                  <BookOpen size={15} /> My Learning Dashboard
                </Link>
              )}
              <div className="pt-2 flex gap-2">
                <Link to="/donate" onClick={() => setMobileOpen(false)}
                  className="flex-1 text-center py-3 rounded-xl text-sm"
                  style={{ fontWeight: 600, background: "#B07D3A", color: "#F8F5EF" }}>
                  Support Now
                </Link>
                {!user && (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center border py-3 rounded-xl text-sm"
                    style={{ fontWeight: 500, borderColor: "#E5E0D8", color: "#1C1C1A" }}>
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
