"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { SOLUTION_SECTION_DATA, SOLUTIONS_DATA } from "../data/landingData";

export function SolutionSection() {
  return (
    <ContainerSection>
      {/* <AnimatedBackdrop /> */}

      <ContainerContent maxWidth="compact">
        <header className="flex flex-col gap-4">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <span className="text-lg">{SOLUTION_SECTION_DATA.badgeNumber}</span> {SOLUTION_SECTION_DATA.badge}
          </p>
          <h2
            id="solucion-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
          An on-chain <span className="text-[#4bd2ff]">protocol</span> to prove what you’ve learned
          </h2>
          <p className="max-w-3xl text-lg text-white/75">
            {SOLUTION_SECTION_DATA.description}
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {SOLUTIONS_DATA.map((solution, index) => (
            <motion.article
              key={solution.title}
              className="group relative h-full rounded-[2rem] border border-white/15 bg-white/5 p-6 text-white shadow-2xl backdrop-blur-2xl"
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.15 * index,
                ease: "easeOut",
              }}
            >
              <motion.div
                aria-hidden
                className={`absolute -inset-px rounded-[2rem] bg-gradient-to-br ${solution.accent} opacity-0 blur-3xl transition duration-500 group-hover:opacity-60`}
                initial={false}
              />
              <div
                className="relative flex flex-col gap-5"
                style={{ perspective: "1400px" }}
              >
                <motion.div
                  className="relative inline-flex size-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 shadow-glow"
                  style={{ transformStyle: "preserve-3d" }}
                  initial={{ rotateY: -6 }}
                  whileHover={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div
                    className={`absolute inset-0 rounded-3xl ${solution.glow} blur-2xl`}
                  />
                  <Image
                    src={solution.icon}
                    alt={solution.title}
                    width={80}
                    height={80}
                    className="relative size-12 object-contain"
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold">{solution.title}</h3>
                <p className="text-base text-white/80">
                  {solution.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </ContainerContent>
    </ContainerSection>
  );
}

function AnimatedBackdrop() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,77,247,0.25),transparent_55%),radial-gradient(circle_at_70%_10%,rgba(122,184,255,0.25),transparent_50%)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-20 top-14 h-32 rounded-full border border-white/5 bg-white/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </>
  );
}
