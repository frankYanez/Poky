"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { USE_CASES_SECTION_DATA, USE_CASES_DATA } from "../data/landingData";

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
            <span className="text-lg">{USE_CASES_SECTION_DATA.badgeNumber}</span> {USE_CASES_SECTION_DATA.badge}
          </p>
          <h2
            id="beneficios-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
             Who <span className="text-[#4bd2ff]">benefits</span> from verifiable learning?
          </h2>
          <p className="text-lg text-white/75">
            {USE_CASES_SECTION_DATA.description}
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES_DATA.map((useCase, index) => (
            <div key={useCase.title} style={{ perspective: "1400px" }}>
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
                  className={`absolute inset-px rounded-[1.6rem] bg-gradient-to-br ${useCase.accent} opacity-0 blur-2xl transition duration-400 group-hover:opacity-50`}
                />
                <div
                  className="relative flex flex-col gap-4"
                  style={{ transform: "translateZ(14px)" }}
                >
                  <div className="relative inline-flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-glow">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${useCase.accent} opacity-60 blur-2xl`}
                    />
                    <Image
                      src={useCase.icon}
                      alt={useCase.title}
                      width={64}
                      height={64}
                      className="relative size-10 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <p className="text-base text-white/80">
                    {useCase.description}
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
