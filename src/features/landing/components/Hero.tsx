"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";

const heroHighlights = [
  "Interfaces generativas entrenadas en tus datos privados",
  "Orquestación multiagente con monitoreo en tiempo real",
  "Implementaciones seguras con auditoría continua",
];

const heroStats = [
  { label: "Lanzamientos guiados", value: "120+" },
  { label: "Latencia promedio", value: "180 ms" },
  { label: "CSAT", value: "4.97/5" },
];

const heroHeading = "Construimos experiencias de IA ";

const heroLead =
  "Poky combina diseño sensorial, infraestructura de datos y copilotos autónomos para que tu producto destaque en rendimiento, accesibilidad y velocidad de lanzamiento.";

export function Hero() {
  return (
    <ContainerSection>
      <ContainerContent
        maxWidth="compact"
        className="relative flex flex-col sm:flex-row gap-4 items-center pt-32 sm:pt-0 justify-center max-h-screen"
      >
        <div className="relative flex w-full flex-col gap-8 lg:w-1/2">
          <h1
            id="hero-heading"
            className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl"
          >
            {heroHeading.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.04 * index,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="max-w-2xl text-lg text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            {heroLead}
          </motion.p>
          {/* 
          <motion.ul
            className="space-y-3 text-base text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.45 }}
          >
            {heroHighlights.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-accentPink to-accentBlue shadow-glow" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>

          
          <motion.dl
            className="grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-[0.3em] text-white/50">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
           */}

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {/* CTA Buttons 
            <Link
              href="#agenda"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accentPink px-8 py-3 text-base font-semibold text-white shadow-glow transition hover:scale-[1.01]"
            >
              Agenda una demo
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          */}
            <button className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:border-white/70 hover:bg-white/10">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white">
                <Play className="size-4" />
              </span>
              Ver lanzamiento guiado
            </button>
          </motion.div>
        </div>

        <div className="relative w-full lg:w-1/2">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
          >
            <div className="absolute -top-10 right-8 h-24 w-24 rounded-full bg-accentBlue/30 blur-3xl" />
            <div className="absolute -bottom-8 left-12 h-32 w-32 rounded-full bg-accentPink/25 blur-3xl" />

            <div className="relative rounded-2xl border border-white/10 bg-black/20 p-4">
              <Image
                src="/assets/logo-poky-front.png"
                alt="Tablero táctil con visualizaciones de datos y fragmentos de UI de Poky"
                width={860}
                height={860}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
            </div>

            <motion.div
              className="absolute -right-6 bottom-8 w-48 rounded-2xl border border-white/15 bg-black/80 p-4 text-sm text-white/90 backdrop-blur"
              initial={{ opacity: 0, y: 20, x: 20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">
                Core Insight
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                UX iterado por IA + Research Crew
              </p>
              <p className="mt-1 text-white/70">
                Modelamos microinteracciones con datos reales de uso para
                optimizar adopción en la primera sesión.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </ContainerContent>
    </ContainerSection>
  );
}

function BrandMark() {
  return (
    <motion.div
      className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.45em] text-white/70 shadow-glow backdrop-blur"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Poky, estudio creativo de IA"
    >
      <motion.span
        className="relative flex size-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-primary via-secondary to-accentPink text-lg font-black text-white shadow-glow"
        initial={{ rotate: -12 }}
        animate={{ rotate: [-12, 8, -4, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 6,
          ease: "easeInOut",
        }}
      >
        <span>PK</span>
        <motion.span
          className="absolute -right-1 -top-1 size-3 rounded-full bg-white/80 shadow-glow"
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
      Poky
    </motion.div>
  );
}

function GridOrnaments() {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.8 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-20 h-64 rounded-3xl border border-white/5 bg-white/5 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.5 }}
      />
    </>
  );
}
