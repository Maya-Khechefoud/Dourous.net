// app/about/page.tsx
// BODY ONLY — navbar and footer are handled separately
// Place bib.jpg → /public/bib.jpg
// Place estin students image → /public/img/about/students.jpg (or any illustration)

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "#FCF9F1" }}>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          Eyebrow · Big headline · Red rule · Full-width library photo
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="flex flex-col items-center pt-14 pb-0"
        style={{ backgroundColor: "#FCF9F1" }}
      >
        {/* Eyebrow label */}
        <p
          className="tracking-[0.22em] uppercase mb-4"
          style={{ fontSize: "10px", fontWeight: 700, color: "#00236F" }}
        >
          Institutional Ethos
        </p>

        {/* Headline */}
        <h1
          className="text-center mb-5 px-4"
          style={{
            fontFamily: '"Cardo", Georgia, serif',
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            color: "#00236F",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}
        >
          Architecture of Knowledge.
        </h1>

        {/* Dark-red horizontal rule */}
        <div
          className="mb-12"
          style={{
            width: "56px",
            height: "3px",
            backgroundColor: "#7B1D1D",
            borderRadius: "2px",
          }}
        />

        {/* Full-bleed library banner */}
        <div className="w-full relative overflow-hidden" style={{ height: "clamp(200px, 28vw, 310px)" }}>
          <Image
            src="/"
            alt="Library — Long Room"
            fill
            className="object-cover object-center"
            priority
          />
          {/* soft vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 100%)",
            }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — MISSION
          White bg · Text left (48%) · Dark image right (52%)
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="flex"
        style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E5E1D3" }}
      >
        {/* ── Left: text ── */}
        <div
          className="flex flex-col justify-center px-14 py-16"
          style={{ flex: "0 0 48%", borderRight: "1px solid #E5E1D3" }}
        >
          {/* Open-book icon */}
          <div className="mb-7">
            <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path
                d="M1 2C1 2 6 1 14 4C22 1 27 2 27 2V20C27 20 22 19 14 22C6 19 1 20 1 20V2Z"
                stroke="#00236F"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <line x1="14" y1="4" x2="14" y2="22" stroke="#00236F" strokeWidth="1.5" />
            </svg>
          </div>

          <h2
            className="mb-5"
            style={{
              fontFamily: '"Cardo", Georgia, serif',
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 700,
              color: "#00236F",
              lineHeight: 1.28,
            }}
          >
            Empowering Academic Exchange Through Digital Simplicity
          </h2>

          <p className="mb-4" style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.78 }}>
            Born within the halls of ESTIN, Dourous.net is an educational extranet platform designed
            to modernise the connection between students and faculty members. By simplifying homework
            submission, document sharing, and academic communication, the platform transforms routine
            educational tasks into a seamless digital experience.
          </p>

          <p className="mb-10" style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.78 }}>
            Created by students, inspired by academic realities, and dedicated to every learner —
            Dourous.net stands as a bridge between technology and education.
          </p>

          {/* CTA — solid navy, square corners */}
          <div>
            <Link
              href="/estin.png"
              className="inline-flex items-center gap-2 px-5 py-3 text-white transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#00236F",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              Learn more about ESTIN →
            </Link>
          </div>
        </div>

        {/* ── Right: dark photo panel ── */}
        <div
          className="relative"
          style={{ flex: "0 0 52%", minHeight: "480px", backgroundColor: "#111827" }}
        >
          <Image
            src="/img/about/notebook.jpg"
            alt="Notebook on desk"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — DEDICATION
          Cream bg · Text left (48%) · Illustration right (52%)
      ════════════════════════════════════════════════════════════════ */}
      <section
        className="flex"
        style={{ backgroundColor: "#FCF9F1", borderTop: "1px solid #E5E1D3" }}
      >
        {/* ── Left: text ── */}
        <div
          className="flex flex-col justify-center px-14 py-16"
          style={{ flex: "0 0 48%" }}
        >
          <h2
            className="mb-5"
            style={{
              fontFamily: '"Cardo", Georgia, serif',
              fontSize: "clamp(20px, 2.2vw, 28px)",
              fontWeight: 700,
              color: "#00236F",
              lineHeight: 1.28,
            }}
          >
            Dedicated to Every Student, Designed for Every Teacher
          </h2>

          <p className="mb-4" style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.78 }}>
            Dourous.net was built with a clear mission: to offer educational institutions a secure
            and elegant digital environment where academic interactions become faster, clearer, and
            more productive.
          </p>

          <p className="mb-10" style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.78 }}>
            The platform allows students to submit assignments in PDF format, access
            faculty-specific spaces, and maintain organised academic records, while enabling
            teachers to receive, review, and manage coursework in one centralised interface.
          </p>

          {/* Three pillars — left-border treatment */}
          <div className="flex items-stretch">
            {[
              { title: "Accessibility", sub: "Educational Reach",   active: true  },
              { title: "Efficiency",    sub: "Technological Ease",  active: false },
              { title: "Modernity",     sub: "Smarter Future",      active: false },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="flex-1 py-2 px-4"
                style={{
                  borderLeft: `2px solid ${pillar.active ? "#00236F" : "#CBD5E1"}`,
                }}
              >
                <p
                  style={{
                    fontFamily: '"Cardo", Georgia, serif',
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00236F",
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </p>
                <p
                  className="uppercase tracking-widest mt-0.5"
                  style={{ fontSize: "8px", fontWeight: 700, color: "#94A3B8" }}
                >
                  {pillar.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: students illustration ── */}
        <div
          className="relative"
          style={{ flex: "0 0 52%", minHeight: "480px", backgroundColor: "#E8EDF5" }}
        >
          <Image
            src="/img/about/students.jpg"
            alt="Students collaborating"
            fill
            className="object-cover object-top"
          />
        </div>
      </section>

    </main>
  );
}