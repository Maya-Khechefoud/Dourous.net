"use client";

import React, { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase"; 
import { useSearchParams, useRouter } from "next/navigation";

function SubmissionForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get('edit'); // Detects ?edit=ID in the URL

  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingFileUrl, setExistingFileUrl] = useState(""); 

  const supabase = createClient();

  // 1. Fetch initial Resources (Modules)
  useEffect(() => {
    const fetchResources = async () => {
      const { data } = await supabase.from('resources').select('*');
      setModules(data || []);
    };
    fetchResources();
  }, []);

  // 2. If in Edit Mode, fetch the existing interaction data
  useEffect(() => {
    if (editId && modules.length > 0) {
      const fetchExistingSubmission = async () => {
        const { data, error } = await supabase
          .from('interactions')
          .select('*')
          .eq('id', editId)
          .single();

        if (data) {
          setNotes(data.student_notes || "");
          setSelectedTeacher(data.selected_teacher || "");
          setExistingFileUrl(data.file_url || "");
          
          // Find the corresponding module object to populate the UI
          const mod = modules.find(m => m.id === data.resource_id);
          if (mod) setSelectedModule(mod);
        }
      };
      fetchExistingSubmission();
    }
  }, [editId, modules]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: New submissions require a file; edits can keep the existing one
    const canSubmit = editId 
      ? (selectedModule && selectedTeacher) 
      : (selectedModule && file && selectedTeacher);

    if (!canSubmit) return alert("Please complete all required fields.");

    setIsSubmitting(true);
    const { data: { user } } = await supabase.auth.getUser();

    let filePath = existingFileUrl;

    // 3. Handle File Upload (only if a new file was selected)
    if (file) {
      const newPath = `vault/${user?.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('vault')
        .upload(newPath, file);

      if (uploadError) {
        alert("Upload failed: " + uploadError.message);
        setIsSubmitting(false);
        return;
      }
      filePath = newPath;
    }

    // 4. Prepare the Data Object
    const submissionData = {
      student_id: user?.id,
      resource_id: selectedModule.id,
      selected_teacher: selectedTeacher,
      file_url: filePath,
      student_notes: notes,
      status: 'Pending Review'
    };

    // 5. INSERT or UPDATE based on presence of editId
    let dbResult;
    if (editId) {
      dbResult = await supabase
        .from('interactions')
        .update(submissionData)
        .eq('id', editId);
    } else {
      dbResult = await supabase
        .from('interactions')
        .insert([submissionData]);
    }

    if (!dbResult.error) {
      alert(editId ? "Scholar, your archive has been updated." : "Scholar, your record has been archived.");
      if (!editId) {
        setFile(null);
        setNotes("");
        setSelectedTeacher("");
      } else {
        router.push('/dashboard'); // Return to dashboard after edit
      }
    } else {
      alert("Database error: " + dbResult.error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-[#f5f2ec] min-h-full p-8 md:p-12 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-[#1a3562] mb-3">
          {editId ? "Edit Archive Record" : "Assignment Submission"}
        </h1>
        <p className="text-slate-500 text-sm max-w-2xl">
          {editId ? "Modify your previously submitted scholarly findings." : "Submit your scholarly findings for review. Ensure all citations follow archival standards."}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#2e6db4] font-semibold text-xs uppercase tracking-wider mb-3">Select Module</label>
                  <div className="relative">
                    <select 
                      value={selectedModule?.id || ""}
                      onChange={(e) => {
                        const mod = modules.find(m => m.id === e.target.value);
                        setSelectedModule(mod);
                        setSelectedTeacher(""); 
                      }}
                      className="w-full bg-[#f8f9fa] border-none rounded-lg p-4 text-sm appearance-none focus:ring-2 focus:ring-[#2e6db4]"
                    >
                      <option value="">Choose a module...</option>
                      {modules.map((m) => (
                        <option key={m.id} value={m.id}>{m.module_title}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[#2e6db4] font-semibold text-xs uppercase tracking-wider mb-3">Submit To</label>
                  <div className="relative">
                    <select 
                      disabled={!selectedModule}
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className="w-full bg-[#f8f9fa] border-none rounded-lg p-4 text-sm appearance-none focus:ring-2 focus:ring-[#2e6db4] disabled:opacity-50"
                    >
                      <option value="">Select a teacher...</option>
                      {selectedModule?.teacher_list?.map((name: string) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#2e6db4] font-semibold text-xs uppercase tracking-wider mb-3">
                  Upload Documents {editId && "(Optional if already uploaded)"}
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-[#f8f9fa] p-12 text-center transition-all hover:bg-slate-100 relative group">
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center">
                    <svg className="w-10 h-10 text-slate-300 mb-4 group-hover:text-[#2e6db4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-slate-600 font-medium">
                        {file ? file.name : (editId ? "Click to replace current file" : "Click to browse or drag and drop")}
                    </p>
                    <p className="text-slate-400 text-[11px] mt-1">PDF, DOCX, or RTF (Max. 50MB)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[#2e6db4] font-semibold text-xs uppercase tracking-wider mb-3">Notes for the Professor</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly describe your methodology..."
                  className="w-full h-40 bg-[#f8f9fa] border-none rounded-lg p-4 text-sm resize-none focus:ring-2 focus:ring-[#2e6db4]"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-3 bg-[#1a3562] text-white px-8 py-4 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg shadow-blue-900/20 transition-all hover:bg-[#122646] active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : (editId ? "Update Archive" : "Submit Assignment")}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-8">
              <div className="flex items-center gap-2 mb-6 text-slate-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Curator's Notes</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1a3562] mb-6 leading-tight">
                {selectedModule?.module_title || "Academic Guidelines"}
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-400 font-bold text-[10px] tracking-[0.2em] mb-2 uppercase">Instructions</label>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {selectedModule?.module_description || "Select a module to view instructions."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapping in Suspense because useSearchParams() requires it in Next.js Client Components
export default function AssignmentSubmission() {
  return (
    <Suspense fallback={<div>Loading Archival Interface...</div>}>
      <SubmissionForm />
    </Suspense>
  );
}