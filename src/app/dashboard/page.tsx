"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardBody() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  const fetchStudentData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('interactions')
        .select(`
          *,
          resources (
            module_title
          )
        `)
        .eq('student_id', user.id)
        .order('submission_date', { ascending: false });
      
      if (error) {
        console.error("Supabase Error:", error);
      } else {
        setSubmissions(data || []);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudentData();
  }, [supabase]);

  // Handle Deletion
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this record from the archive?")) return;

    const { error } = await supabase
      .from('interactions')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      // Update UI locally so the card disappears immediately
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
    }
  };

  // Handle Edit Redirection
  const handleEdit = (id: string) => {
    router.push(`/dashboard/submissions?edit=${id}`);
  };

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
        <div className="col-span-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#00236F] font-serif flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              Recent Submissions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {loading ? (
              <p className="col-span-2 text-slate-400 italic font-serif">Consulting the archives...</p>
            ) : submissions.length > 0 ? (
              submissions.map((sub) => (
                <CourseCard 
                  key={sub.id}
                  id={sub.id}
                  title={sub.resources?.module_title || "Untitled Module"} 
                  category={sub.status?.toUpperCase() || "PENDING"} 
                  teacher={sub.selected_teacher}
                  date={new Date(sub.submission_date).toLocaleDateString()}
                  desc={sub.student_notes || "No additional methodology notes provided."} 
                  fileUrl={sub.file_url}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="col-span-2 py-12 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-tighter">No submissions found</p>
              </div>
            )}
            
            <Link href="/dashboard/submissions" className="block group">
              <div className="h-full border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-white hover:border-[#00236F] hover:shadow-md transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 mb-2 group-hover:border-[#00236F] group-hover:text-[#00236F] transition-colors text-xl font-light">
                  +
                </div>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest group-hover:text-[#00236F] transition-colors">
                  New Submission
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div className="col-span-4 space-y-8">
          <div className="bg-[#00236F] rounded-2xl p-8 text-white shadow-xl">
            <p className="text-sm font-serif opacity-80 mb-6">Scholarly Standing</p>
            <div className="text-center mb-8">
              <h3 className="text-7xl font-bold mb-1">4.0</h3>
              <p className="text-[10px] tracking-[0.2em] font-bold opacity-60 uppercase">Current Distinction</p>
            </div>
            <div className="space-y-4 border-t border-white/10 pt-6 text-[11px]">
              <StatRow label="Submissions" value={`${submissions.length}`} />
              <StatRow label="Attendance Rate" value="98.5%" />
              <StatRow label="Scholarly Rank" value="Top 5%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ id, title, category, teacher, date, desc, fileUrl, onDelete, onEdit }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block px-2 py-1 bg-blue-50 text-[9px] font-bold text-blue-700 rounded tracking-widest">{category}</span>
          <div className="flex gap-2">
            {/* Edit Button */}
            <button 
              onClick={() => onEdit(id)}
              className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors"
              title="Edit"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            {/* Delete Button */}
            <button 
              onClick={() => onDelete(id)}
              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>
        <h4 className="text-[#00236F] font-bold text-lg mb-1">{title}</h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase mb-3 italic">To: {teacher}</p>
        <p className="text-slate-400 text-xs leading-relaxed mb-6 line-clamp-2">{desc}</p>
      </div>
      
      <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
        <span className="text-[9px] text-slate-300 font-bold uppercase">{date}</span>
        <a 
          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fileUrl}`}
          target="_blank"
          rel="noreferrer"
          className="text-[#00236F] text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          Review
        </a>
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