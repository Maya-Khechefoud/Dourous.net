"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<{full_name: string, role: string} | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      // Accessing metadata sent during signup
      setProfile({
        full_name: user.user_metadata?.full_name || "Scholar",
        role: user.user_metadata?.role || "Student"
      });
    };
    getProfile();
  }, [supabase, router]);

  const menuItems = [
    { name: "DASHBOARD", path: "/dashboard", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
    { name: "SUBMISSIONS", path: "/dashboard/submissions", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#FCF9F1" }}>
      {/* Sidebar - Reference: Aside - SideNavBar.png */}
      <aside className="w-72 flex flex-col p-8 fixed h-full border-r border-[#E5E1D3]">
        <div className="mb-12">
           <h1 style={{ fontFamily: '"Cardo", serif', color: "#00236F", fontSize: "24px", fontWeight: 700 }}>
            Dourous-Net
          </h1>
          <div className="mt-8">
            <h2 style={{ color: "#00236F", fontSize: "18px", fontWeight: 700, fontFamily: '"Cardo", serif' }}>Academic Hub</h2>
            <p style={{ color: "#94A3B8", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em" }}>STUDENT PORTAL</p>
          </div>
        </div>

        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 20px",
                  borderRadius: "8px",
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  boxShadow: isActive ? "0 4px 12px rgba(0,35,111,0.05)" : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#00236F" : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  <span style={{ 
                    fontSize: "12px", 
                    fontWeight: 700, 
                    letterSpacing: "0.05em",
                    color: isActive ? "#00236F" : "#94A3B8" 
                  }}>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Mini Profile - Pulls from State */}
        <div className="mt-auto p-4 rounded-xl bg-[#F5F2EA]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00236F] flex items-center justify-center text-white font-bold text-xs uppercase">
              {profile?.full_name.substring(0, 2)}
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#1E293B" }}>{profile?.full_name}</p>
              <p style={{ fontSize: "10px", color: "#64748B" }}>{profile?.role} Scholar</p>
            </div>
          </div>
          <div className="w-full bg-[#E5E1D3] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#00236F] h-full w-[64%]"></div>
          </div>
          <p className="text-[9px] font-bold text-[#64748B] mt-2 tracking-tighter uppercase">Semester Progress: 64%</p>
          <button 
            onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
            className="mt-4 text-[10px] font-bold text-[#00236F] hover:underline"
          >
            SIGN OUT
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 min-h-screen p-12">
        {children}
      </main>
    </div>
  );
}