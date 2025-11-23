"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TrackCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  points: number;
  progress: number;
  totalModules: number;
  completedModules: number;
  comingSoon?: boolean;
}

export default function TrackCard({
  id,
  image,
  title,
  description,
  difficulty,
  duration,
  points: _points,
  progress,
  totalModules,
  completedModules,
  comingSoon = false,
  setIdTrack,
}: TrackCardProps & {
  setIdTrack: React.Dispatch<React.SetStateAction<number>>;
}) {
  const router = useRouter();
  const isCompleted = progress === 100;

  const getDifficultyConfig = () => {
    switch (difficulty) {
      case "Principiante":
        return {
          label: "Principiante",
          color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
        };
      case "Intermedio":
        return {
          label: "Intermedio",
          color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
        };
      case "Avanzado":
        return {
          label: "Avanzado",
          color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        };
      default:
        return {
          label: "Intermedio",
          color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig();

  const handleClick = () => {
    if (comingSoon) return;
    router.push(`/tracks/${id}n`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative glass-card rounded-[24px] overflow-hidden transition-all duration-300 ease-out bg-black ${
        comingSoon
          ? "cursor-not-allowed opacity-50 grayscale"
          : "cursor-pointer hover:shadow-card-hover hover:-translate-y-2 hover:glass-card-hover"
      }`}
    >
      {/* Glow effect on hover */}
      {!comingSoon && (
        <div className="absolute backdrop-blur-3xl inset-0  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-violet-300/10 to-violet-500/20 rounded-[28px] blur-2xl" />
        </div>
      )}

      {/* Coming Soon Overlay */}
      {comingSoon && (
        <div className="absolute inset-0 z-20 back flex items-center justify-center pointer-events-none">
          <div className="bg-dark-800/90 backdrop-blur-2xl px-6 py-3 rounWded-full border border-violet-500/30">
            <span className="text-violet-400 font-bold text-lg uppercase tracking-wider">
              Próximamente
            </span>
          </div>
        </div>
      )}

      {/* Badge/Medal Header */}
      <div className="relative h-[200px] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent" />

        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-violet-500/5 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-violet-300/5 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-white/5" />

        {/* Main Badge - Glass Image */}
        <div className="relative z-10 flex flex-col items-center">
          <div
            className={`
              relative w-[120px] h-[120px] rounded-full
              flex items-center justify-center
              transition-all duration-300 ease-out
              group-hover:scale-110
              ${isCompleted ? "animate-pulse-glow" : ""}
            `}
          >
            {/* Glow behind image */}
            <div
              className={`absolute inset-0 rounded-full blur-xl ${
                isCompleted ? "bg-gold-400/30" : "bg-violet-500/30"
              } animate-glow-pulse`}
            />

            {/* Glass image */}
            <Image
              src={image}
              alt={title}
              width={60}
              height={60}
              className="relative z-10 drop-shadow-2xl group-hover:animate-float"
            />
          </div>
        </div>

        {/* Points Badge 
        <div className="absolute top-4 right-4 glass-card rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-lg">🏅</span>
          <span className="font-bold text-violet-400 text-sm">{points}</span>
          <span className="text-dark-300 text-xs font-medium">pts</span>
        </div>
        */}
      </div>

      {/* Content Body */}
      <div className="relative p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-dark-100 mb-2 tracking-tight leading-tight group-hover:text-violet-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-dark-300 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${difficultyConfig.color}`}
          >
            {difficultyConfig.label}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-dark-600/50 border border-dark-500/50 rounded-full text-[11px] font-semibold text-dark-200 uppercase tracking-wide">
            ⏱️ {duration}
          </span>
        </div>

        {/* Progress Section
        <div className="space-y-2">
          <div className="relative w-full h-2 bg-dark-700 rounded-full overflow-hidden">
            <div
              className={`
                h-full rounded-full transition-all duration-700 ease-out
                ${isCompleted ? "bg-gradient-to-r from-gold-500 to-gold-400" : "bg-gradient-to-r from-violet-500 to-violet-300"}
              `}
              style={{ width: `${progress}%` }}
            />
            {progress > 0 && progress < 100 && (
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xs text-dark-400 font-medium">
              {completedModules}/{totalModules} módulos
            </span>
            <span
              className={`text-xs font-bold ${isCompleted ? "text-gold-400" : "text-violet-400"}`}
            >
              {progress}%
            </span>
          </div>
        </div>
        */}
        {/* CTA Button */}
        <button
          onClick={() => setIdTrack(id)}
          className={`
            mt-4 w-full py-3 rounded-[38px]
            font-bold text-sm uppercase tracking-wider
            transition-all duration-200 ease-out
              bg-gradient-to-r from-violet-500 to-violet-300 text-white hover:shadow-glow hover:scale-[1.02]"
            
          `}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
