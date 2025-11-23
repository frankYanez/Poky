"use client";

import Image from "next/image";
import { motion } from "motion/react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { PROBLEM_SECTION_DATA, PROBLEMS_DATA } from "../data/landingData";

export function ProblemSection() {
  return (
    <ContainerSection>
      <div className="pointer-events-none absolute inset-0 " />
      <ContainerContent maxWidth="compact">
        <div className="flex flex-col gap-4 text-white">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            <span className="text-lg">{PROBLEM_SECTION_DATA.badgeNumber}</span> {PROBLEM_SECTION_DATA.badge}
          </p>
          <h2
            id="problema-heading"
            className="text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
          >
             Learning has <span className="text-[#4bd2ff]">no trustless</span> verification layer
          </h2>
          <p className="max-w-3xl text-lg text-white/75">
            {PROBLEM_SECTION_DATA.description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {PROBLEMS_DATA.map((problem, index) => (
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
                <div
                  className="relative flex flex-col gap-4"
                  style={{ transform: "translateZ(15px)" }}
                >
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
                  <p className="text-base text-white/80">
                    {problem.description}
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
