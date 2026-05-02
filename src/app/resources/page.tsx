import React from "react";

type ResourceCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const studentResources: ResourceCard[] = [
  {
    title: "Estin Bib",
    description:
      "Estin's students reference to previous interrogations, TDs, exams.",
    image: "/img/estinbib.png",
    link: "https://the-estin-bib.vercel.app/",
  },
  {
    title: "Elearn",
    description:
      "University courses, administrative papers, and final notes.",
    image: "/img/elearn.png",
    link: "https://elearn.estin.dz/",
  },
  {
    title: "Esi Tresor",
    description: "ESTIN Bib version for ESI Alger resources.",
    image: "/img/esitresor.png",
    link: "https://tresor.cse.club/",
  },
  {
    title: "MDN Web Docs",
    description: "Best documentation for web development.",
    image: "/img/MDN.png",
    link: "https://developer.mozilla.org",
  },
];

const cloudResources: ResourceCard[] = [
  {
    title: "AWS",
    description: "Cloud computing platform by Amazon.",
    image: "/img/AWS.png",
    link: "https://aws.amazon.com",
  },
  {
    title: "Google Cloud",
    description: "Scalable cloud services by Google.",
    image: "/img/gc.png",
    link: "https://cloud.google.com",
  },
  {
    title: "Vercel",
    description: "Deploy frontend apps instantly.",
    image: "/img/vercel.png",
    link: "https://vercel.com",
  },
  {
    title: "Supabase",
    description: "Open-source Firebase alternative.",
    image: "/img/supab.png",
    link: "https://supabase.com",
  },
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen px-6 py-12 pt-24 bg-brand-cream">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-serif text-brand-blue">
          Dourous-Net Resources
        </h1>
        <p className="text-muted-slate mt-2">
          Curated tools and learning platforms for students & developers
        </p>
      </div>

      {/* STUDENT SECTION */}
      <Section title="📚 Student Resources" data={studentResources} />

      {/* CLOUD SECTION */}
      <Section title="☁️ Cloud & Developer Tools" data={cloudResources} />
    </main>
  );
}

function Section({
  title,
  data,
}: {
  title: string;
  data: ResourceCard[];
}) {
  return (
    <section className="mb-14">
      
      <h2 className="text-2xl font-semibold mb-6 text-brand-blue">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {data.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              bg-brand-white
              rounded-2xl
              overflow-hidden
              border border-muted-lavender
              shadow-sm
              transition-all duration-300
              hover:bg-brand-blue
              hover:text-brand-white
              hover:shadow-lg
              hover:-translate-y-1
              active:scale-95
              cursor-pointer
            "
          >
            {/* IMAGE */}
            <div className="h-32 w-full overflow-hidden bg-accent-tan">
              <img
                src={item.image}
                alt={item.title}
                className="
                  w-full h-full object-cover
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <h3 className="font-semibold text-brand-blue group-hover:text-brand-white transition">
                {item.title}
              </h3>
              <p className="text-sm text-muted-slate group-hover:text-brand-cream mt-1 transition">
                {item.description}
              </p>
            </div>

          </a>
        ))}

      </div>
    </section>
  );
}