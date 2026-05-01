"use client";

import React from "react";

export default function LoginPage() {
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#64748B",
    textTransform: "uppercase",
    marginBottom: "7px",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "44px",
    paddingLeft: "42px",
    paddingRight: "14px",
    backgroundColor: "#F5F2EA",
    border: "1.5px solid transparent",
    borderRadius: "8px",
    fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
    fontSize: "13.5px",
    color: "#00236F",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
  };

  const iconWrapStyle: React.CSSProperties = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#C5C5D3",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FCF9F1" }}>
      {/* Top metadata row */}
      <div
        className="w-full px-8 py-3 flex items-center justify-between"
        style={{ color: "#94A3B8", fontSize: "10px", letterSpacing: "0.08em" }}
      >
        <span
          className="font-semibold tracking-wide"
          style={{ color: "#00236F", fontFamily: '"Cardo", "Playfair Display", serif', fontSize: "13px" }}
        >
          Dourous-Net
        </span>

        <div className="flex items-center gap-6">
          {["TERMS OF SERVICE", "PRIVACY POLICY", "SUPPORT"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-slate-600 transition-colors duration-150"
              style={{ fontSize: "9.5px", letterSpacing: "0.1em", fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif' }}
            >
              {link}
            </a>
          ))}
        </div>

        <span style={{ fontSize: "9px", letterSpacing: "0.06em", fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif' }}>
          © 2024 DOUROUS-NET SCHOLARLY ARCHIVE. ALL RIGHTS RESERVED.
        </span>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center px-4 py-4" style={{ minHeight: 0, paddingTop: "20px" }}>
        {/* Auth card */}
        <div
          className="w-full overflow-hidden flex flex-col md:flex-row"
          style={{
            maxWidth: "960px",
            maxHeight: "calc(100vh - 142px)",
            borderRadius: "20px",
            boxShadow: "0 8px 60px rgba(0, 35, 111, 0.10), 0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* LEFT PANEL (Preserved) */}
          <div
            className="relative flex flex-col justify-between"
            style={{
              flex: "0 0 44%",
              padding: "clamp(28px, 4vw, 44px) clamp(32px, 4vw, 48px)",
              minHeight: "360px",
              background: `linear-gradient(160deg, rgba(0,35,111,0.97) 0%, rgba(5,28,90,0.93) 60%, rgba(10,20,70,0.98) 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.13,
                filter: "blur(3px) saturate(0.5)",
                zIndex: 0,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <a
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.50)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  marginBottom: "20px",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Back to Home
              </a>
              <div>
                <h1 style={{ fontFamily: '"Cardo", "Playfair Display", serif', fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, color: "#FFFFFF", marginBottom: "10px" }}>Dourous-Net</h1>
                <div style={{ width: "36px", height: "2.5px", backgroundColor: "rgba(255,255,255,0.55)", borderRadius: "2px" }} />
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1, padding: "24px 0 12px" }}>
              <h2 style={{ fontFamily: '"Cardo", "Playfair Display", serif', fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 400, color: "#FFFFFF", lineHeight: 1.25, marginBottom: "14px" }}>Join the legacy of scholarly pursuit.</h2>
              <p style={{ fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif', fontSize: "13px", color: "rgba(255,255,255,0.60)", lineHeight: 1.75, maxWidth: "340px" }}>
                Access thousands of archived lectures, peer-reviewed journals, and exclusive academic materials from our global network.
              </p>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif', fontSize: "9.5px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                ESTIN. 2025 &nbsp;•&nbsp; ARCHIVAL REPOSITORY
              </p>
            </div>
          </div>

          {/* RIGHT PANEL (Updated for Login) */}
          <div
            className="flex flex-col justify-center"
            style={{
              flex: "1",
              backgroundColor: "#FFFFFF",
              padding: "clamp(24px, 4vw, 44px) clamp(32px, 5vw, 56px)",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                fontFamily: '"Cardo", "Playfair Display", serif',
                fontSize: "clamp(22px, 2.6vw, 30px)",
                fontWeight: 700,
                color: "#00236F",
                marginBottom: "6px",
                letterSpacing: "-0.01em",
              }}
            >
              Welcome Back
            </h2>
            <p
              style={{
                fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
                fontSize: "13px",
                color: "#94A3B8",
                marginBottom: "24px",
              }}
            >
              Continue your archival exploration.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Institutional Email */}
              <div>
                <label style={labelStyle}>Institutional Email</label>
                <div style={{ position: "relative" }}>
                  <span style={iconWrapStyle}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input type="email" placeholder="researcher@university.edu" style={inputStyle} />
                </div>
              </div>

              {/* Password with Forgot Password */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                  <label style={labelStyle}>Password</label>
                  <a href="#" style={{ ...labelStyle, textTransform: "none", color: "#00236F", cursor: "pointer", marginBottom: "7px" }}>
                    Forgot Password?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <span style={iconWrapStyle}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input type="password" placeholder="••••••••••"
                    style={{ ...inputStyle, fontSize: "15px", letterSpacing: "0.08em" }} />
                </div>
              </div>

              {/* CTA */}
              <div style={{ paddingTop: "4px" }}>
                <button
                  type="button"
                  style={{
                    width: "100%", height: "46px", backgroundColor: "#00236F", color: "#FFFFFF",
                    border: "none", borderRadius: "9px",
                    fontFamily: '"Inter", "Plus Jakarta Sans", sans-serif',
                    fontSize: "14px", fontWeight: 600, letterSpacing: "0.04em",
                    cursor: "pointer", boxShadow: "0 4px 20px rgba(0,35,111,0.28)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#001a5c";
                    e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,35,111,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#00236F";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,35,111,0.28)";
                  }}
                >
                  Login &nbsp;→
                </button>

                <p style={{ textAlign: "center", fontFamily: '"Inter", sans-serif',
                  fontSize: "13px", color: "#94A3B8", marginTop: "16px" }}>
                  Don&apos;t have an account?{" "}
                  <a href="/signup" style={{ color: "#00236F", fontWeight: 600, textDecoration: "none" }}>
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}