"use client";

import ContainerContent from "@/src/shared/components/ContainerContent";
import ContainerSection from "@/src/shared/components/ContainerSection";
import TrackCard from "./TrackCard";
import Image from "next/image";
import { tracks } from "@/src/features/home/data/tracks";

export function Tracks() {
  const completedCount = tracks.filter((t) => t.progress === 100).length;
  const totalPoints = tracks.reduce(
    (acc, t) => acc + Math.floor((t.points * t.progress) / 100),
    0
  );

  return (
    <ContainerSection id="tracks" padding="none" minHeight="screen">
      <ContainerContent maxWidth="compact" className="py-8">
        {/* Section Header */}
        <div className="text-center mb-12 mt-10">
          {/* Badge Icon */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 to-violet-300/20 rounded-full blur-xl animate-glow-pulse" />
            <Image
              src="/assets/glass-pie-chart.png"
              alt="Learning tracks"
              width={364}
              height={364}
              className="relative z-10 drop-shadow-2xl"
            />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-3 tracking-tight">
            Tus Learning Tracks
          </h2>

          {/* Subtitle */}
          <p className="text-dark-300 text-lg max-w-md mx-auto mb-8">
            Colecciona badges y demuestra tus habilidades en Web3
          </p>

          {/* Stats Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full">
              <Image
                src="/assets/like-icon-social-approval-glass-square-button.png"
                alt="Completados"
                width={24}
                height={24}
              />
              <span className="font-bold text-violet-400">{completedCount}</span>
              <span className="text-dark-400 text-sm">completados</span>
            </div>
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full">
              <Image
                src="/assets/thumbs-up-icon-glossy-glass-render-pink-yellow-gradient.png"
                alt="Puntos"
                width={24}
                height={24}
              />
              <span className="font-bold text-gold-400">{totalPoints}</span>
              <span className="text-dark-400 text-sm">puntos</span>
            </div>
            <div className="inline-flex items-center gap-2 glass-card px-5 py-2.5 rounded-full">
              <Image
                src="/assets/blue-purple-glass-heart.png"
                alt="Tracks"
                width={24}
                height={24}
              />
              <span className="font-bold text-dark-200">{tracks.length}</span>
              <span className="text-dark-400 text-sm">tracks</span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {tracks.map((track, index) => (
            <TrackCard key={track.id} {...track} comingSoon={index > 0} />
          ))}
        </div>

        {/* Explore More CTA */}
        <div className="mt-12 text-center">
          <button className="group inline-flex items-center gap-3 px-8 py-4 glass-card border border-violet-500/30 text-violet-400 font-bold uppercase tracking-wider text-sm rounded-[38px] transition-all duration-300 hover:bg-violet-500/10 hover:border-violet-500/50 hover:shadow-glow hover:scale-[1.02]">
            <span>Explorar más tracks</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </ContainerContent>
    </ContainerSection>
  );
}
