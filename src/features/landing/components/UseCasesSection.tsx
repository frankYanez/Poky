"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";

const benefits = [
  {
    title: "Proceso simplificado",
    description:
      "Emisión en minutos con flujos asistidos: desde la carga del expediente hasta la firma automática en la cadena.",
    icon: "/assets/glass-coins-financial-exchange-pink-yellow-gradient (1).png",
    accent: "from-[#8B4DF7aa] via-[#7AB8FFaa] to-[#F7A8D6aa]",
  },
  {
    title: "Transparencia total",
    description:
      "Cada evento queda trazado con sello de tiempo, hash y testigos; alumnos y empleadores verifican al instante.",
    icon: "/assets/glass-megaphone.png",
    accent: "from-[#7AB8FFaa] via-[#40ffaa90] to-[#FFD86Baa]",
  },
  {
    title: "Accesibilidad ampliada",
    description:
      "Certificados legibles en móvil y offline, con QR/DID y soporte multi-idioma para adopción global.",
    icon: "/assets/mail-envelope-symbol-gradient-glass-object-purple-blue-color-scheme.png",
    accent: "from-[#F7A8D6aa] via-[#8B4DF7aa] to-[#7AB8FFaa]",
  },
  {
    title: "Confianza inmediata",
    description:
      "Dashboards para acreditadores y empresas con alertas de fraude en tiempo real y reputación agregada.",
    icon: "/assets/thumbs-up-icon-glossy-glass-render-pink-yellow-gradient.png",
    accent: "from-[#FFD86Baa] via-[#F7A8D6aa] to-[#8B4DF7aa]",
  },
];

export function UseCasesSection() {
  return (
    <ContainerSection padding="md" minHeight="none">
      <div className="pointer-events-none absolute inset-0 " />
      <ContainerContent
        maxWidth="compact"
        padded
        className="relative flex flex-col gap-12"
      >
        <header className="flex flex-col gap-4 text-white max-w-3xl">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <span className="text-lg">4️⃣</span> Caso de uso / Beneficios
          </p>
          <h2
            id="beneficios-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
            Por qué este protocolo mejora la educación
          </h2>
          <p className="text-lg text-white/75">
            Página 4 · Validación educativa instantánea. Explicamos cómo
            elevamos la experiencia sin entrar aún en lo técnico: claridad,
            velocidad y acceso global desde el primer día.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} style={{ perspective: "1400px" }}>
              <motion.article
                className="group relative h-full rounded-3xl border border-white/15 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-2xl"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 35, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                whileHover={{ rotateX: 6, rotateY: -6, translateZ: 16 }}
              >
                <div
                  aria-hidden
                  className={`absolute inset-px rounded-[1.6rem] bg-gradient-to-br ${benefit.accent} opacity-0 blur-2xl transition duration-400 group-hover:opacity-50`}
                />
                <div
                  className="relative flex flex-col gap-4"
                  style={{ transform: "translateZ(14px)" }}
                >
                  <div className="relative inline-flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-glow">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.accent} opacity-60 blur-2xl`}
                    />
                    <Image
                      src={benefit.icon}
                      alt={benefit.title}
                      width={64}
                      height={64}
                      className="relative size-10 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-base text-white/80">
                    {benefit.description}
                  </p>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </ContainerContent>
    </ContainerSection>
  );
}

export default UseCasesSection;
