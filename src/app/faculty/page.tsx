import React from "react";

type Teacher = {
  name: string;
};

type Module = {
  title: string;
  teachers: Teacher[];
};

const modules: Module[] = [
  {
    title: "Analysis",
    teachers: [
      { name: "Cherfaoui Salima" },
      { name: "Hamadouche Taklit" },
      { name: "Bosla" },
      { name: "Moussawi" },
    ],
  },
  {
    title: "Architecture",
    teachers: [
      { name: "Chelouah Leila" },
      { name: "Touloum Soumaya" },
      { name: "Harfouche Sarah"},
      { name: "Hachemi Said"},
    ],
  },
  
  {
    title: "Electronics",
    teachers: [
      { name: "Benali Ahmed" },
      { name: "Khelifi Nadia" },
    ],
  },
  {
    title: "Algorithms",
    teachers: [
      { name: "Cheklat nadia" },
      { name: "Khataoui lila " },
    ],
  },
   {
    title: "Algebra",
    teachers: [
      { name: "Bensliman Ali" },
      { name: "Yahiaoui Karima" },
      { name: "Bouchefra Samira"},
      { name: "Saba Ali"},
    ],
}
];

export default function FacultyPage() {
  return (
    <main className="min-h-screen px-6 py-12 pt-24 bg-brand-cream">
      
      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold font-serif text-brand-blue">
          Faculty of Dourous-Net
        </h1>
        <p className="text-muted-slate mt-3 max-w-2xl mx-auto">
          Our academic staff is composed of experienced educators and researchers
          dedicated to guiding students through engineering, science, and digital innovation.
        </p>
      </div>

      {/* MODULES */}
      <div className="space-y-12">
        {modules.map((module, index) => (
          <section key={index}>
            
            {/* Module Title */}
            <h2 className="text-2xl font-semibold text-brand-blue mb-6">
              {module.title}
            </h2>

            {/* Teachers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {module.teachers.map((teacher, i) => (
                <div
                  key={i}
                  className="
                    bg-brand-white
                    border border-muted-lavender
                    rounded-2xl
                    shadow-sm
                    p-5
                    text-center
                    transition-all duration-300
                    hover:bg-brand-blue
                    hover:text-brand-white
                    hover:shadow-lg
                    hover:-translate-y-1
                    cursor-pointer
                    active:scale-95
                  "
                >
                  {/* Avatar circle */}
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-accent-tan flex items-center justify-center text-brand-blue font-bold group-hover:text-brand-white">
                    {teacher.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-brand-blue transition">
                    {teacher.name}
                  </h3>

                  {/* Role */}
                  <p className="text-sm text-muted-slate mt-1 group-hover:text-brand-cream">
                    Lecturer
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}