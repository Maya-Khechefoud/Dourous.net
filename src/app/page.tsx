import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FCF9F1]">
      {/* ── HERO SECTION ── */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#000d1a]">
        
        {/* SYMMETRIC BACKGROUND ENGINE (Side-by-Side) */}
        <div className="absolute inset-0 z-0 flex flex-row w-full">
          {/* Left Panel */}
          <div className="relative flex-1 h-full">
            <Image 
              src="/bib.jpg" 
              alt="Library Left" 
              fill
              className="object-cover opacity-80"
              quality={100}
            />
          </div>

          {/* Center Panel (Highest Quality Focal Point) */}
          <div className="relative flex-1 h-full border-x border-white/5">
            <Image 
              src="/bib.jpg" 
              alt="Library Center" 
              fill
              className="object-cover"
              priority
              quality={100}
            />
          </div>

          {/* Right Panel */}
          <div className="relative flex-1 h-full">
            <Image 
              src="/bib.jpg" 
              alt="Library Right" 
              fill
              className="object-cover opacity-80"
              quality={100}
            />
          </div>

          {/* THE 40% BLUE FOUNDATION 
              Starts at 60% depth to keep the top of the library clear.
          */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_60%,rgba(16,37,100,0.6)_75%,rgba(9,22,74,0.95)_100%)]" />
          
          {/* Global soft vignette for cinematic depth */}
          <div className="absolute inset-0 bg-black/15" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl px-6 text-center pt-24">
          <h1 
            className="text-white font-bold tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 7.5rem)', fontFamily: 'Georgia, serif' }}
          >
            Dourous-Net
          </h1>

          {/* REFINED DESCRIPTION: High Legibility (Sans-serif, normal case, wide tracking) */}
          <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed max-w-xl tracking-widest font-light drop-shadow-md">
            A digital scriptorium dedicated to the meticulous preservation 
            of intellectual heritage and the pursuit of academic 
            excellence in the modern era.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
            {/* LOGIN BUTTON */}
            <Link
              href="/login"
              className="min-w-[170px] px-10 py-4 rounded-2xl font-sans text-xs font-bold text-white border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all tracking-widest uppercase shadow-lg"
            >
              Login
            </Link>
            
            {/* SIGN IN BUTTON */}
            <Link
              href="/signin"
              className="min-w-[170px] px-10 py-4 rounded-2xl font-sans text-xs font-bold text-[#00236F] bg-[#FCF9F1] shadow-2xl hover:scale-105 transition-all tracking-widest uppercase"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ── */}
      <section className="bg-[#FCF9F1] flex flex-col items-center justify-center text-center px-6 py-32 gap-8 border-t border-[#00236F]/5">
        {/* Quote Mark */}
        <span className="font-serif text-9xl text-[#00236F]/10 leading-none select-none">
          &#x201D;
        </span>

        <blockquote className="font-serif text-xl md:text-3xl italic text-[#00236F] leading-relaxed max-w-2xl">
          &ldquo;Knowledge is the inheritance of humanity,
          <br />
          and its preservation is the duty of the wise.&rdquo;
        </blockquote>

        <div className="w-20 h-[1.5px] bg-[#00236F]/20 my-4" />

        <p className="text-[0.65rem] tracking-[0.6em] uppercase text-[#00236F]/40 font-bold">
          — Extranet Charter, Art. 1
        </p>
      </section>
    </main>
  );
}