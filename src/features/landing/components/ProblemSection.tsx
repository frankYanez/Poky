"use client";

import Image from "next/image";
import { motion } from "motion/react";

const problems = [
  {
    title: "Falsificación de certificados",
    description:
      "Hasta 38% de los diplomas en la región presentan alteraciones o copias sin respaldo digital verificable.",
    icon: "/assets/warning-sign-icon-glass-style-yellow-orange-gradient.png",
    accent: "from-[#FFD86Baa] to-[#FF7A6Bbb]",
  },
  {
    title: "Ausencia de trazabilidad",
    description:
      "Los registros quedan dispersos. Sin hash ni eventos firmados es imposible seguir quién emitió y cuándo se modificó.",
    icon: "/assets/glass-pie-chart.png",
    accent: "from-[#7AB8FFbb] to-[#8B4DF7aa]",
  },
  {
    title: "Pérdida de confianza",
    description:
      "Compañías y gobiernos desconfían de los títulos locales, retrasando contrataciones y procesos de acreditación.",
    icon: "/assets/glass-shield.png",
    accent: "from-[#F7A8D6bb] to-[#7AB8FFaa]",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-heading"
      className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,216,107,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(122,184,255,0.14),transparent_45%)]" />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-4 text-white">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <span className="text-lg">2️⃣</span> El problema
          </p>
          <h2
            id="problema-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            Página 2 · Problemas de certificación
          </h2>
          <p className="max-w-3xl text-lg text-white/75">
            El mundo educativo se ahoga en procesos manuales. Poky documenta el dolor
            para que los comités directivos entiendan por qué la autenticación
            descentralizada es urgente.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div key={problem.title} style={{ perspective: "1400px" }}>
              <motion.article
                className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white shadow-2xl backdrop-blur-xl"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ rotateX: 4, rotateY: -4, translateZ: 12 }}
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${problem.accent} opacity-0 transition duration-300 group-hover:opacity-100`}
                />
                <div className="relative flex flex-col gap-4" style={{ transform: "translateZ(15px)" }}>
                  <div className="relative inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-glow">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${problem.accent} opacity-70 blur-lg`}
                    />
                    <Image
                      src={problem.icon}
                      alt={problem.title}
                      width={64}
                      height={64}
                      className="relative size-10 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{problem.title}</h3>
                  <p className="text-base text-white/80">{problem.description}</p>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
