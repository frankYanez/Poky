"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import ContainerSection from "@/src/shared/components/ContainerSection";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { HERO_DATA } from "../data/landingData";

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
            The on-chain layer for <span className="text-[#4bd2ff]">verifiable</span> learning          </h1>

          <motion.p
            className="max-w-2xl text-lg text-white/80"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            {HERO_DATA.lead}
          </motion.p>
        

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
           
            <button className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white/90 backdrop-blur transition hover:border-white/70 hover:bg-white/10">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white">
                <Play className="size-4" />
              </span>
              {HERO_DATA.ctaButton}
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
                alt={HERO_DATA.imageAlt}
                width={760}
                height={760}
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
                {HERO_DATA.coreInsight.label}
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {HERO_DATA.coreInsight.title}
              </p>
              <p className="mt-1 text-white/70">
                {HERO_DATA.coreInsight.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </ContainerContent>
    </ContainerSection>
  );
}

