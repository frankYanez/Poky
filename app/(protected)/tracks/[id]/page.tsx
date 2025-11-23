"use client";

import { useParams, useRouter } from "next/navigation";
import { AuthGuard } from "@/src/features/autentication/components/AuthGuard";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Clock, Award, User, Play, BookOpen, HelpCircle, Code, Calendar, CheckCircle } from "lucide-react";
import ContainerContent from "@/src/shared/components/ContainerContent";
import ContainerSection from "@/src/shared/components/ContainerSection";
import Header from "@/src/features/home/components/header/Header";

import { useTrack } from "@/src/features/home/hooks/useTrack";
import { useModules } from "@/src/features/home/hooks/useModules";
import { MODULE_ABI, MODULE_REGISTRY_ADDRESS, type RemoteTrack } from "@/app/(protected)/dashboard/page";
import { useReadContract } from "wagmi";
import { useTrackProgressStore } from "@/src/features/track/store/trackProgressStore";

export default function TrackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const trackId = params.id as string;

  const track: RemoteTrack | null = useTrack(trackId);
  const { isModuleCompleted, getCompletedCount } = useTrackProgressStore();

  
     const { data: dataModule } = useReadContract({
    address: MODULE_REGISTRY_ADDRESS,
    abi: MODULE_ABI,
    functionName: "getModules",
    args: [0, 20], // offset, limit
    chainId: undefined,
    query: { enabled: true },
  });
  if (!track) return notFound();

  console.log("Track data:", dataModule);

  

  const getDifficultyConfig = () => ({
    color: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  });

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="size-4" />;
      case "reading":
        return <BookOpen className="size-4" />;
      case "quiz":
        return <HelpCircle className="size-4" />;
      case "practice":
        return <Code className="size-4" />;
      default:
        return <BookOpen className="size-4" />;
    }
  };

  const getModuleTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Video";
      case "reading":
        return "Lectura";
      case "quiz":
        return "Quiz";
      case "practice":
        return "Práctica";
      default:
        return "Módulo";
    }
  };

  const difficultyConfig = getDifficultyConfig();

  return (
    <AuthGuard requireAuth={true} redirectTo="/">
      <Header />
      <ContainerSection padding="sm" minHeight="screen" className="flex flex-col">
        <div className="flex flex-col relative bg-gradient-to-b from-dark-800 to-dark-900 overflow-hidden p-6 rounded-2xl">
          <ContainerContent maxWidth="compact" className="relative z-10">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-dark-300 hover:text-dark-100 mb-8 group"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1" />
              <span className="text-sm">Volver</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="relative glass-card rounded-3xl p-6 flex items-center justify-center">
                  <Image
                    src="/assets/glass-pie-chart.png"
                    alt={track.title ?? "Track"}
                    width={80}
                    height={80}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-dark-100 mb-3">
                  {track.title || "Track sin título"}
                </h1>

                <div className="flex items-center gap-2 text-dark-300 mb-4">
                  <User className="size-4 text-violet-400" />
                  <span className="text-sm">
                    Autor: {track.author ?? "Desconocido"}
                  </span>
                </div>

                <p className="text-dark-300 text-base md:text-lg mb-6 max-w-2xl">
                  Creado:{" "}
                  {track.createdAt
                    ? new Date(Number(track.createdAt) * 1000).toLocaleString()
                    : "---"}
                </p>
              </div>
            </div>
          </ContainerContent>
        </div>

        <ContainerContent maxWidth="compact" className="py-10">
          <h2 className="text-xl font-bold text-dark-100 mb-6">
            Módulos del Track
          </h2>

          <div className="space-y-3">
            {dataModule?.map((mod, index) => {
              const completed = isModuleCompleted(trackId, String(mod.id));
              return (
                <div
                  key={String(mod.id)}
                  onClick={() => router.push(`/tracks/${trackId}/module/${mod.id}`)}
                  className={`group glass-card rounded-2xl p-5 hover:bg-dark-700/30 transition-all cursor-pointer ${
                    completed ? "border-green-500/30" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                        completed
                          ? "bg-green-500/20 border border-green-500/30 text-green-400"
                          : "bg-dark-700/50 border border-violet-500/30 text-violet-400"
                      }`}
                    >
                      {completed ? (
                        <CheckCircle className="size-5" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate text-dark-100 group-hover:text-violet-400 transition-colors">
                          {mod.title}
                        </h3>
                        {completed && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            Completado
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-dark-400 truncate">
                        {mod.description}
                      </p>
                    </div>

                    <div className="hidden sm:flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-dark-400">
                        {getModuleIcon("video")}
                        <span className="text-xs">Video</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-dark-400">
                        <Clock className="size-3.5" />
                        <span className="text-xs">5 min</span>
                      </div>
                    </div>

                    <div className="text-dark-400 group-hover:text-violet-400 transition-colors">
                      <ArrowLeft className="size-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ContainerContent>
      </ContainerSection>
    </AuthGuard>
  );
}
