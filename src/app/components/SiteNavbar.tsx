import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../lib/AuthContext";
import { useCmsPage } from "../hooks/useCmsPage";
// @ts-ignore
import imgLogo from "@/assets/urw-logo.png";
// @ts-ignore
import imgChevron from "@/assets/8d5928d43f1ad11aaebbaf276ef31f030d752d0e.svg";

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

// ── Types ─────────────────────────────────────────────────────────────────
type DropItem = {
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

type NavGroup = {
  label: string;
  items: DropItem[];
};

// ── Constants ─────────────────────────────────────────────────────────────
const WA_LINK = "https://wa.me/919370318308";

const NAV_MENU: NavGroup[] = [
  {
    label: "Ujjwala Wadekar",
    items: [
      { label: "My Story",                  href: "#section14-story" },
      { label: "My Teaching Methodology",   href: "#section5-teaching" },
      { label: "Awards and Recognition",    href: "#section4-awards" },
      { label: "The Team",                  href: "#section15-team" },
    ],
  },
  {
    label: "Mission",
    items: [
      { label: "About the Mission",         href: "#section-intro-ngo" },
      { label: "Programs and Initiatives",  href: "#section8-programs" },
      { label: "See the impact",            href: "#section9-impact" },
      { label: "Adopt a School",            href: "#section8-adopt" },
    ],
  },
  {
    label: "Get Involved",
    items: [
      { label: "Contribute to the cause",          href: "/donate" },
      { label: "CSR/Businesses",                   href: "#section10-csr" },
      { label: "Volunteers (Skills and Time based)", href: "#section10-volunteers" },
      { label: "Teachers",                         href: "#section10-teachers" },
      { label: "Partners (Non CSR)",               href: "#section10-partners" },
      { label: "Join Community",                   href: WA_LINK, external: true },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Words from the community",  href: "#section16-testimonials" },
      { label: "Join the community",        href: WA_LINK, external: true },
    ],
  },
];

// ── Scroll helper ──────────────────────────────────────────────────────────
function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${hash}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

// ── NavDropdown ────────────────────────────────────────────────────────────
function NavDropdown({ group, onOpenModal }: { group: NavGroup; onOpenModal?: () => void }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate  = useNavigate();
  const location  = useLocation();

  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };
  const cancelClose   = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };

  const isHome = location.pathname === "/" || location.pathname === "/home-v2";

  const handleItem = (item: DropItem) => {
    setOpen(false);
    if (item.external && item.href) {
      window.open(item.href, "_blank", "noopener noreferrer");
      return;
    }
    if (item.onClick) { item.onClick(); return; }
    if (!item.href) return;

    if (item.href.startsWith("#")) {
      const hash = item.href.slice(1);
      if (isHome) {
        scrollToHash(hash);
      } else {
        navigate("/");
        setTimeout(() => scrollToHash(hash), 400);
      }
      return;
    }
    navigate(item.href);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button style={{
        display: "flex", alignItems: "center", gap: 4,
        background: "none", border: "none", cursor: "pointer",
        color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400,
        padding: "4px 0",
      }}>
        {group.label}
        <img src={imgChevron} alt="" style={{ width: 16, height: 16 }} />
      </button>

      {open && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          style={{
            position: "absolute", top: "calc(100% + 8px)", left: 0,
            minWidth: 232,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0,0,0,0.08)", borderRadius: 14,
            padding: "6px 0", zIndex: 9999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          }}
        >
          {group.items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleItem(item)}
              style={{
                padding: "10px 20px",
                color: "#1a2e44", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                cursor: "pointer",
                borderBottom: i < group.items.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#bf791d"; e.currentTarget.style.background = "rgba(191,121,29,0.06)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#1a2e44"; e.currentTarget.style.background = "transparent"; }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── UserAvatar ─────────────────────────────────────────────────────────────
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

// ── ProfileDropdown ────────────────────────────────────────────────────────
function ProfileDropdown({ user, onLogout }: { user: { name: string; email: string; role?: string }; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpen(false), 150); };
  const cancelClose   = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const isAdmin = user.role === "admin";

  return (
    <div style={{ position: "relative" }} onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button style={{
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 30, padding: "4px 12px 4px 4px", cursor: "pointer",
      }}>
        <UserAvatar name={user.name} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#fff", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {user.name.split(" ")[0]}
        </span>
        <img src={imgChevron} alt="" style={{ width: 14, height: 14, opacity: 0.7 }} />
      </button>

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
          <div style={{ padding: "6px 0" }}>
            {[
              { label: "My Dashboard", icon: "📊", to: "/dashboard" },
              { label: "My Donations",  icon: "💚", to: "/dashboard" },
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

// ── MobileNavItem ──────────────────────────────────────────────────────────
function MobileNavGroup({
  group,
  onClose,
  onOpenModal,
}: {
  group: NavGroup;
  onClose: () => void;
  onOpenModal?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const navigate  = useNavigate();
  const location  = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/home-v2";

  const handleItem = (item: DropItem) => {
    onClose();
    if (item.external && item.href) {
      window.open(item.href, "_blank", "noopener noreferrer");
      return;
    }
    if (item.onClick) { item.onClick(); return; }
    if (!item.href) return;

    if (item.href.startsWith("#")) {
      const hash = item.href.slice(1);
      if (isHome) {
        setTimeout(() => scrollToHash(hash), 80);
      } else {
        navigate("/");
        setTimeout(() => scrollToHash(hash), 400);
      }
      return;
    }
    navigate(item.href);
  };

  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 4, marginBottom: 4 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          color: "#ffa530", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
          padding: "10px 0 6px", textTransform: "uppercase", letterSpacing: "0.05em",
        }}
      >
        {group.label}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "none" }}>
          <path d="M2 5L7 10L12 5" stroke="#ffa530" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0, paddingBottom: 4 }}>
          {group.items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleItem(item)}
              style={{
                color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                padding: "10px 12px", borderRadius: 10, cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navbar (exported) ──────────────────────────────────────────────────────
export function Navbar({ onOpenModal }: { onOpenModal?: () => void }) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getSection } = useCmsPage("brand");
  const navData = getSection("NavigationSection");
  const navCtaText  = String(navData.content.ctaText  || "Contribute Now");
  const navLogoImg  = String(navData.content.logoImage || "") || imgLogo;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // ── Mobile / Tablet ──────────────────────────────────────────────────────
  if (isMobile || isTablet) {
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <img src={navLogoImg} alt="URW Logo" style={{ height: 48, width: "auto", display: "block" }} />
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
            ) : (
              <button
                onClick={() => navigate("/donate")}
                className="btn-gold"
                style={{ display: "flex", alignItems: "center", gap: 8, background: "#bf791d", borderRadius: 30, padding: "10px 18px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}
              >
                {navCtaText} <ArrowIcon size={14} />
              </button>
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
          <div style={{ marginTop: 16, padding: "20px 16px", borderRadius: 16, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", flexDirection: "column", gap: 0 }}>
            {NAV_MENU.map(group => (
              <MobileNavGroup
                key={group.label}
                group={group}
                onClose={() => setMobileMenuOpen(false)}
                onOpenModal={onOpenModal}
              />
            ))}

            {/* Contact us — amber button */}
            <div style={{ padding: "10px 0 6px" }}>
              <button
                onClick={() => { setMobileMenuOpen(false); navigate("/contact"); }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "#f59e0b", borderRadius: 30, padding: "10px 20px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}
              >
                Contact us <ArrowIcon size={13} />
              </button>
            </div>

            {user && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, marginTop: 4, display: "flex", flexDirection: "column", gap: 4 }}>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} style={{ textDecoration: "none" }}>
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

  // ── Desktop ──────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1008 }}>
      <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
        <img src={navLogoImg} alt="URW Logo" style={{ height: 60, width: "auto", display: "block" }} />
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: 28, paddingRight: user ? 8 : 6, height: 59, borderRadius: 60, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(15px)" }}>

        {/* Nav dropdowns */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, paddingLeft: 8 }}>
          {NAV_MENU.map(group => (
            <NavDropdown key={group.label} group={group} onOpenModal={onOpenModal} />
          ))}
        </div>

        {/* CTAs: Contact us + Contribute Now */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate("/contact")}
            style={{ display: "flex", alignItems: "center", gap: 10, background: "transparent", borderRadius: 30, padding: "10px 20px", border: "1px solid #fff", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, whiteSpace: "nowrap" }}
          >
            Contact us <ArrowIcon size={14} />
          </button>

          {user ? (
            <>
              <button
                onClick={() => navigate("/donate")}
                className="btn-gold"
                style={{ display: "flex", alignItems: "center", gap: 12, background: "#bf791d", borderRadius: 30, padding: "10px 20px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, whiteSpace: "nowrap" }}
              >
                {navCtaText} <ArrowIcon />
              </button>
              <ProfileDropdown user={user} onLogout={handleLogout} />
            </>
          ) : (
            <button
              onClick={() => navigate("/donate")}
              className="btn-gold"
              style={{ display: "flex", alignItems: "center", gap: 16, background: "#bf791d", borderRadius: 30, padding: "12px 24px", border: "none", cursor: "pointer", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, whiteSpace: "nowrap" }}
            >
              {navCtaText} <ArrowIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
