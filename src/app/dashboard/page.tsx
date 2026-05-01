"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function DashboardBody() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchStudentData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('interactions')
          .select('*')
          .eq('student_id', user.id);
        setSubmissions(data || []);
      }
      setLoading(false);
    };
    fetchStudentData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] p-8">
      {/* 1. HERO BANNER */}
      <div className="relative w-full h-[320px] rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80')" }}
        >
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-16">
          <p className="text-white/70 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
            Welcome back to the archive
          </p>
          <h1 className="text-white text-6xl font-bold font-serif leading-tight">
            Mastery through <br /> curated discipline.
          </h1>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="grid grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: ENROLLED CURRICULA (8/12) */}
        <div className="col-span-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#00236F] font-serif flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Enrolled Curricula
            </h2>
            <button className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-[#00236F]">View All →</button>
          </div>

          {/* 2x2 COURSE GRID */}
          <div className="grid grid-cols-2 gap-6">
            <CourseCard title="Ethics in the Digital Age" category="PHILOSOPHY" progress={72} desc="Exploring moral frameworks of artificial intelligence..." />
            <CourseCard title="The Silk Road Chronicles" category="HISTORY" progress={45} desc="An intensive study of transcontinental trade and culture..." />
            <CourseCard title="Modernist Poetry & Prose" category="LITERATURE" progress={18} desc="Analyzing the fragmentation of form in the early 20th century..." />
            
            {/* Dashed Placeholder */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-white/50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 mb-2">+</div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">Enroll in new course</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR (4/12) */}
        <div className="col-span-4 space-y-8">
          {/* Scholarly Standing Card */}
          <div className="bg-[#00236F] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-sm font-serif opacity-80 mb-6">Scholarly Standing</p>
            <div className="text-center mb-8">
              <h3 className="text-7xl font-bold mb-1">4.0</h3>
              <p className="text-[10px] tracking-[0.2em] font-bold opacity-60 uppercase">Current Distinction</p>
            </div>
            <div className="space-y-4 border-t border-white/10 pt-6 text-[11px]">
              <StatRow label="Credit Hours" value="18 / 120" />
              <StatRow label="Attendance Rate" value="98.5%" />
              <StatRow label="Scholarly Rank" value="Top 5%" />
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-white/60 border border-white rounded-2xl p-8 shadow-sm">
             <span className="text-3xl text-[#00236F] font-serif opacity-30">“</span>
             <p className="text-[#00236F] italic font-serif leading-relaxed mb-6">
               "The pursuit of knowledge is not a sprint towards a destination, but a patient walk through a garden of infinite horizons."
             </p>
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-white shadow-sm">
                 <img src="https://i.pravatar.cc/100?u=dean" alt="Dr. Al-Farsi" />
               </div>
               <div>
                 <p className="text-[10px] font-bold text-[#00236F] uppercase">Dr. Al-Farsi</p>
                 <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Dean of Humanities</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SUB-COMPONENTS
function CourseCard({ title, category, progress, desc }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <span className="inline-block px-2 py-1 bg-red-50 text-[9px] font-bold text-red-700 rounded mb-4 tracking-widest">{category}</span>
      <h4 className="text-[#00236F] font-bold text-lg mb-2">{title}</h4>
      <p className="text-slate-400 text-xs leading-relaxed mb-6">{desc}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold">
          <span className="text-slate-400">Progress</span>
          <span className="text-[#00236F]">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#00236F] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="opacity-60">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}