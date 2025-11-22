import ContainerContent from "@/src/shared/components/ContainerContent";
import ContainerSection from "@/src/shared/components/ContainerSection";
import TrackCard from "./TrackCard";


const tracks = [
  {
    id: 'zero-knowledge-proofs',
    icon: '🔐',
    title: 'Zero-Knowledge Proofs',
    description: 'Domina los fundamentos de las pruebas de conocimiento cero y su aplicación en blockchain.',
    difficulty: 'Intermedio' as const,
    duration: '8 horas',
    points: 500,
    progress: 60,
    totalModules: 10,
    completedModules: 6,
  },
  {
    id: 'smart-contracts-101',
    icon: '⛓️',
    title: 'Smart Contracts 101',
    description: 'Aprende a crear, desplegar y auditar contratos inteligentes en Ethereum.',
    difficulty: 'Principiante' as const,
    duration: '12 horas',
    points: 700,
    progress: 100,
    totalModules: 12,
    completedModules: 12,
  },
  {
    id: 'defi-fundamentals',
    icon: '🌐',
    title: 'DeFi Fundamentals',
    description: 'Explora el ecosistema DeFi: lending, staking, AMMs y más.',
    difficulty: 'Intermedio' as const,
    duration: '10 horas',
    points: 600,
    progress: 80,
    totalModules: 10,
    completedModules: 8,
  },
];


export function Tracks() {
  return <ContainerSection id="tracks" padding="lg" minHeight="screen">
    <ContainerContent maxWidth="compact">
         <div className="grid grid-cols-1  gap-8 w-full">
          {tracks.map((track) => (
            <TrackCard key={track.id} {...track} />
          ))}
        </div>
    </ContainerContent>
  </ContainerSection>;
}
