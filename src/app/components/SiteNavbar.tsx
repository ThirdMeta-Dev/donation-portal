import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
// @ts-ignore
import imgChevron from "@/assets/8d5928d43f1ad11aaebbaf276ef31f030d752d0e.svg";
// @ts-ignore
import imgChevronGold from "@/assets/e25a4b39e8a9a67792da4b7be40a5cd1efeff3fd.svg";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTablet;
}

function ArrowIcon({ color = "#fff", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 8H14M14 8L9 3M14 8L9 13" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NavDropdown({ label, gold = false, items }: { label: string; gold?: boolean; items: string[] }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };
  const cancelClose  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: gold ? "#ffa530" : "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: gold ? 600 : 400, padding: "4px 0" }}>
        {label}
        <img src={gold ? imgChevronGold : imgChevron} alt="" style={{ width: 16, height: 16 }} />
      </button>
      {open && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose} style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, minWidth: 200, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14, padding: "6px 0", zIndex: 9999, boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)" }}>
          {items.map(item => (
            <div key={item} style={{ padding: "10px 20px", color: "#1a2e44", fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: "pointer", borderBottom: "1px solid rgba(0,0,0,0.06)", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(23,64,103,0.07)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initials = name.trim().split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: "linear-gradient(135deg, #bf791d, #e8972a)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13,
      color: "#fff", flexShrink: 0, userSelect: "none",
    }}>
      {initials}
    </div>
  );
}

function ProfileDropdown({ user, onLogout }: { user: { name: string; email: string; role?: string }; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };
  const cancelClose  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const isAdmin = user.role === "admin";

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      {/* Trigger */}
      <button style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 30, padding: "4px 12px 4px 4px",
        cursor: "pointer",
      }}>
        <UserAvatar name={user.name} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#fff", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name.split(" ")[0]}
        </span>
        <img src={imgChevron} alt="" style={{ width: 14, height: 14, opacity: 0.7 }} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute", top: "calc(100% + 10px)", right: 0,
            minWidth: 220, background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)", borderRadius: 16,
            padding: "8px 0", zIndex: 9999,
            boxShadow: "0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {/* User info header */}
          <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <UserAvatar name={user.name} />
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#1a2e44" }}>{user.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 1 }}>{user.email}</div>
              </div>
            </div>
            {isAdmin && (
              <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 6, padding: "2px 8px" }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.5 4.5H11L8 6.5L9 10L6 8L3 10L4 6.5L1 4.5H4.5L6 1Z" fill="#d97706"/></svg>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 700, color: "#92400e" }}>Admin</span>
              </div>
            )}
          </div>

          {/* Menu items */}
          <div style={{ padding: "6px 0" }}>
            {[
              { label: "My Dashboard", icon: "📊", to: "/dashboard" },
              { label: "My Donations", icon: "💚", to: "/dashboard" },
              ...(isAdmin ? [{ label: "Admin Panel", icon: "⚙️", to: "/admin" }] : []),
            ].map(item => (
              <Link key={item.label} to={item.to} style={{ textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer", transition: "background 0.15s", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a2e44" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(23,64,103,0.06)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            ))}
          </div>

          {/* Divider + logout */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", padding: "6px 0 4px" }}>
            <button
              onClick={onLogout}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", width: "100%", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#dc2626", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (isMobile || isTablet) {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ background: "#d9d9d9", borderRadius: 40, height: 48, width: 140, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#000" }}>Home + Logo</span>
            </div>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Link to="/auth" state={{ returnTo: "/donate" }} style={{ textDecoration: "none" }}>
                <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 8, background: "#bf791d", borderRadius: 30, padding: "10px 18px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
                  Donate <ArrowIcon size={14} />
                </button>
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6H17M3 10H17M3 14H17" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div style={{ marginTop: 16, padding: "20px 16px", borderRadius: 16, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "Ujjwala Wadekar", items: ["Her Story", "31 Years of Teaching", "Awards & Recognition"] },
              { label: "Mission", items: ["Shiksha Raj Method", "Beyond Syllabus", "Impact Reports"] },
              { label: "Programs", items: ["Programs", "Schools", "Communities"] },
              { label: "Get Involved", items: ["Donate", "Volunteer", "Partner With Us"] },
            ].map(group => (
              <div key={group.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 4 }}>
                <div style={{ color: "#ffa530", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, padding: "8px 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{group.label}</div>
                {group.items.map(item => (
                  <div key={item} style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, padding: "10px 12px", borderRadius: 10, cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    {item}
                  </div>
                ))}
              </div>
            ))}
            {user && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, marginTop: 4, display: "flex", flexDirection: "column", gap: 4 }}>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <div style={{ color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, padding: "10px 12px", borderRadius: 10, cursor: "pointer" }}>📊 My Dashboard</div>
                </Link>
                <button onClick={handleLogout} style={{ textAlign: "left", color: "#fca5a5", fontFamily: "'DM Sans', sans-serif", fontSize: 15, padding: "10px 12px", borderRadius: 10, background: "none", border: "none", cursor: "pointer" }}>
                  ↩ Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1008 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={{ background: "#d9d9d9", borderRadius: 40, height: 60, width: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#000" }}>Home + Logo</span>
        </div>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 28, paddingRight: user ? 8 : 6, height: 59, borderRadius: 60, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(15px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, paddingLeft: 8 }}>
          <NavDropdown label="Ujjwala Wadekar" items={["Her Story", "31 Years of Teaching", "Awards & Recognition"]} />
          <NavDropdown label="Mission" items={["Shiksha Raj Method", "Beyond Syllabus", "Impact Reports"]} />
          <NavDropdown label="Mission" items={["Programs", "Schools", "Communities"]} />
          <NavDropdown label="Get Involved" gold items={["Donate", "Volunteer", "Partner With Us"]} />
        </div>

        {user ? (
          <>
            <Link to="/auth" state={{ returnTo: "/donate" }} style={{ textDecoration: "none" }}>
              <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 12, background: "#bf791d", borderRadius: 30, padding: "10px 20px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}>
                Donate Now <ArrowIcon />
              </button>
            </Link>
            <ProfileDropdown user={user} onLogout={handleLogout} />
          </>
        ) : (
          <Link to="/auth" state={{ returnTo: "/donate" }} style={{ textDecoration: "none" }}>
            <button className="btn-gold" style={{ display: "flex", alignItems: "center", gap: 20, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, whiteSpace: "nowrap" }}>
              Donate Now <ArrowIcon />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
