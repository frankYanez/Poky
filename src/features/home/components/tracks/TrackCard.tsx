import React from 'react';
import { useRouter } from 'next/navigation'; // o 'next/router' si usas pages

interface TrackCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  points: number;
  progress: number;
  totalModules: number;
  completedModules: number;
}

export default function TrackCard({
  id,
  icon,
  title,
  description,
  difficulty,
  duration,
  points,
  progress,
  totalModules,
  completedModules,
}: TrackCardProps) {
  const router = useRouter();

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'Principiante': return '🌱';
      case 'Intermedio': return '⚡';
      case 'Avanzado': return '🔥';
      default: return '⚡';
    }
  };

  const handleClick = () => {
    router.push(`/tracks/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full group relative bg-[#ddd] rounded-2xl overflow-hidden shadow-soft transition-all duration-400 cursor-pointer hover:shadow-hard hover:-translate-y-3"
    >
      {/* Hover overlay effect */}
      <div className="absolute top-0 left-0 right-0 h-[180px] bg-gradient-to-br from-violet-primary to-violet-secondary opacity-0 transition-opacity duration-400 group-hover:opacity-10" />

      {/* Header with icon */}
      <div className="relative h-[180px] bg-gradient-to-br from-violet-primary to-violet-secondary flex items-center justify-center overflow-hidden">
        <div className="w-[100px] h-[100px] text-[56px] bg-white/20 backdrop-blur-[10px] rounded-full flex items-center justify-center border-4 border-white/30 animate-rotate-slow">
          {icon}
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Title */}
        <h3 className="font-fredoka text-[26px] font-bold text-text-dark mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-text-gray leading-relaxed mb-6">
          {description}
        </p>

        {/* Meta tags */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-lavender rounded-[20px] text-[13px] font-semibold text-violet-primary">
            {getDifficultyIcon()} {difficulty}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-lavender rounded-[20px] text-[13px] font-semibold text-violet-primary">
            ⏱️ {duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-lavender rounded-[20px] text-[13px] font-semibold text-violet-primary">
            🏅 {points} pts
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-lavender rounded-lg overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-violet-primary to-violet-secondary rounded-lg transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress text */}
        <div className="text-[13px] text-text-gray text-right">
          {completedModules} de {totalModules} módulos completados
          {progress === 100 && ' ✓'}
        </div>
      </div>
    </div>
  );
}