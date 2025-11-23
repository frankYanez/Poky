"use client";

import { useParams, useRouter } from "next/navigation";
import { AuthGuard } from "@/src/features/autentication/components/AuthGuard";
import { getTrackById } from "@/src/features/home/data/tracks";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Award, User, Play, BookOpen, HelpCircle, Code, Check, Lock } from "lucide-react";
import ContainerContent from "@/src/shared/components/ContainerContent";
import ContainerSection from "@/src/shared/components/ContainerSection";
import type { Module } from "@/src/features/home/data/tracks";
import Header from "@/src/features/home/components/header/Header";

export default function TrackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trackId = params.id as string;
  const track = getTrackById(trackId);

  if (!track) {
    notFound();
  }

  const getDifficultyConfig = () => {
    switch (track.difficulty) {
      case "Principiante":
        return { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
      case "Intermedio":
        return { color: "bg-violet-500/20 text-violet-400 border-violet-500/30" };
      case "Avanzado":
        return { color: "bg-orange-500/20 text-orange-400 border-orange-500/30" };
      default:
        return { color: "bg-violet-500/20 text-violet-400 border-violet-500/30" };
    }
  };

  const getModuleIcon = (type: Module["type"]) => {
    switch (type) {
      case "video":
        return <Play className="size-4" />;
      case "reading":
        return <BookOpen className="size-4" />;
      case "quiz":
        return <HelpCircle className="size-4" />;
      case "practice":
        return <Code className="size-4" />;
    }
  };

  const getModuleTypeLabel = (type: Module["type"]) => {
    switch (type) {
      case "video":
        return "Video";
      case "reading":
        return "Lectura";
      case "quiz":
        return "Quiz";
      case "practice":
        return "Práctica";
    }
  };

  const difficultyConfig = getDifficultyConfig();
  const isCompleted = track.progress === 100;

  // Find next module to continue
  const nextModule = track.modules.find((m) => !m.completed && !m.locked);

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <ContainerSection padding="sm" minHeight="screen" className="flex flex-col">
        {/* Hero Header */}
        <div className="flex relative  bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden p-6 rounded-2xl">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-300/5 blur-3xl" />
          </div>

          <ContainerContent maxWidth="compact" className="flex flex-col relative z-10 pt-6 pb-12">
            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-dark-300 hover:text-dark-100 transition-colors mb-8 group"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Volver</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Track Image */}
              <div className="relative flex-shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className={`absolute inset-0 rounded-full blur-2xl ${isCompleted ? "bg-gold-400/30" : "bg-violet-500/30"} animate-glow-pulse`} />
                  <div className="relative glass-card rounded-3xl p-6 flex items-center justify-center">
                    <Image
                      src={track.image}
                      alt={track.title}
                      width={80}
                      height={80}
                      className="drop-shadow-2xl"
                    />
                  </div>
                  {isCompleted && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-gold-glow">
                      Completado
                    </div>
                  )}
                </div>
              </div>

              {/* Track Info */}
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wide border ${difficultyConfig.color}`}>
                    {track.difficulty}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-dark-100 mb-3">
                  {track.title}
                </h1>

                <p className="text-dark-300 text-base md:text-lg mb-6 max-w-2xl">
                  {track.longDescription}
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-dark-300">
                    <Clock className="size-4 text-violet-400" />
                    <span className="text-sm">{track.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-300">
                    <Award className="size-4 text-gold-400" />
                    <span className="text-sm">{track.points} puntos</span>
                  </div>
                  <div className="flex items-center gap-2 text-dark-300">
                    <User className="size-4 text-violet-400" />
                    <span className="text-sm">{track.instructor}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {track.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-dark-700/50 border border-dark-600/50 rounded-full text-xs text-dark-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="max-w-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-dark-400">Progreso del track</span>
                    <span className={`text-sm font-bold ${isCompleted ? "text-gold-400" : "text-violet-400"}`}>
                      {track.progress}%
                    </span>
                  </div>
                  <div className="relative w-full h-2.5 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${isCompleted ? "bg-gradient-to-r from-gold-500 to-gold-400" : "bg-gradient-to-r from-violet-500 to-violet-300"}`}
                      style={{ width: `${track.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-dark-400 mt-2">
                    {track.completedModules} de {track.totalModules} módulos completados
                  </p>
                </div>
              </div>
            </div>
          </ContainerContent>
        </div>

        {/* Modules List */}
        <ContainerContent maxWidth="compact" className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-dark-100">Módulos del Track</h2>
            
          </div>

          <div className="space-y-3">
            {track.modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => {
                  if (!module.locked) {
                    router.push(`/tracks/${trackId}/module/stablecoins-fundamentals`);
                  }
                }}
                className={`group relative glass-card rounded-2xl p-5 transition-all duration-200 ${
                  module.locked
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-dark-700/30 hover:shadow-soft"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Module number / status */}
                  <div
                    className={`
                      relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                      ${module.completed
                        ? "bg-gradient-to-br from-gold-500 to-gold-400 text-dark-900"
                        : module.locked
                          ? "bg-dark-700 text-dark-500"
                          : "bg-dark-700/50 border border-violet-500/30 text-violet-400"
                      }
                    `}
                  >
                    {module.completed ? (
                      <Check className="size-5" />
                    ) : module.locked ? (
                      <Lock className="size-4" />
                    ) : (
                      index + 1
                    )}
                  </div>

                  {/* Module info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold truncate ${module.completed ? "text-dark-200" : "text-dark-100"}`}>
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-sm text-dark-400 truncate">{module.description}</p>
                  </div>

                  {/* Module meta */}
                  <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-1.5 text-dark-400">
                      {getModuleIcon(module.type)}
                      <span className="text-xs">{getModuleTypeLabel(module.type)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-dark-400">
                      <Clock className="size-3.5" />
                      <span className="text-xs">{module.duration}</span>
                    </div>
                  </div>

                  {/* Action indicator */}
                  {!module.locked && !module.completed && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="size-4" />
                    </div>
                  )}
                </div>

                {/* Mobile meta */}
                <div className="flex sm:hidden items-center gap-4 mt-3 pt-3 border-t border-dark-700/50">
                  <div className="flex items-center gap-1.5 text-dark-400">
                    {getModuleIcon(module.type)}
                    <span className="text-xs">{getModuleTypeLabel(module.type)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-dark-400">
                    <Clock className="size-3.5" />
                    <span className="text-xs">{module.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ContainerContent>
      </ContainerSection>
    </AuthGuard>
  );
}
