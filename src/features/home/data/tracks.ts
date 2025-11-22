export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "reading" | "quiz" | "practice";
  completed: boolean;
  locked: boolean;
}

export interface Track {
  id: string;
  image: string;
  title: string;
  description: string;
  longDescription: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  duration: string;
  points: number;
  progress: number;
  totalModules: number;
  completedModules: number;
  modules: Module[];
  skills: string[];
  instructor: string;
}

export const tracks: Track[] = [
  {
    id: "zero-knowledge-proofs",
    image: "/assets/glass-shield.png",
    title: "Zero-Knowledge Proofs",
    description:
      "Domina los fundamentos de las pruebas de conocimiento cero y su aplicación en blockchain.",
    longDescription:
      "Aprende cómo las pruebas de conocimiento cero permiten verificar información sin revelarla. Desde los fundamentos matemáticos hasta implementaciones prácticas en zkSNARKs y zkSTARKs.",
    difficulty: "Intermedio",
    duration: "8 horas",
    points: 500,
    progress: 60,
    totalModules: 10,
    completedModules: 6,
    skills: ["Criptografía", "Privacy", "zkSNARKs", "zkSTARKs"],
    instructor: "Dr. Alejandro Vega",
    modules: [
      {
        id: "zkp-1",
        title: "Introducción a ZKP",
        description: "Conceptos básicos y por qué son importantes",
        duration: "45 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-2",
        title: "Fundamentos Matemáticos",
        description: "Álgebra y teoría de números para ZKP",
        duration: "60 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-3",
        title: "Quiz: Conceptos Básicos",
        description: "Evalúa tu comprensión inicial",
        duration: "15 min",
        type: "quiz",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-4",
        title: "zkSNARKs Explicados",
        description: "Succinct Non-Interactive Arguments of Knowledge",
        duration: "50 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-5",
        title: "zkSTARKs vs zkSNARKs",
        description: "Comparación y casos de uso",
        duration: "40 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-6",
        title: "Práctica: Circuitos Básicos",
        description: "Crea tu primer circuito ZK",
        duration: "90 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "zkp-7",
        title: "ZK-Rollups",
        description: "Escalabilidad con pruebas de conocimiento cero",
        duration: "55 min",
        type: "video",
        completed: false,
        locked: false,
      },
      {
        id: "zkp-8",
        title: "Implementación en Solidity",
        description: "Verificadores on-chain",
        duration: "70 min",
        type: "practice",
        completed: false,
        locked: false,
      },
      {
        id: "zkp-9",
        title: "Casos de Uso Reales",
        description: "Tornado Cash, zkSync, StarkNet",
        duration: "45 min",
        type: "reading",
        completed: false,
        locked: false,
      },
      {
        id: "zkp-10",
        title: "Evaluación Final",
        description: "Demuestra tu dominio de ZKP",
        duration: "30 min",
        type: "quiz",
        completed: false,
        locked: false,
      },
    ],
  },
  {
    id: "smart-contracts-101",
    image: "/assets/glass-check-mark.png",
    title: "Smart Contracts 101",
    description:
      "Aprende a crear, desplegar y auditar contratos inteligentes en Ethereum.",
    longDescription:
      "Domina Solidity desde cero. Aprende las mejores prácticas de seguridad, patrones de diseño y cómo desplegar contratos en mainnet y testnets.",
    difficulty: "Principiante",
    duration: "12 horas",
    points: 700,
    progress: 100,
    totalModules: 12,
    completedModules: 12,
    skills: ["Solidity", "EVM", "Testing", "Security"],
    instructor: "María González",
    modules: [
      {
        id: "sc-1",
        title: "¿Qué es un Smart Contract?",
        description: "Introducción al concepto y su importancia",
        duration: "30 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "sc-2",
        title: "Configuración del Entorno",
        description: "Hardhat, Remix y herramientas esenciales",
        duration: "45 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "sc-3",
        title: "Solidity Básico",
        description: "Variables, tipos y estructuras",
        duration: "60 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "sc-4",
        title: "Funciones y Modificadores",
        description: "Control de acceso y lógica",
        duration: "55 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "sc-5",
        title: "Quiz: Solidity Básico",
        description: "Evalúa tu comprensión",
        duration: "20 min",
        type: "quiz",
        completed: true,
        locked: false,
      },
      {
        id: "sc-6",
        title: "Tu Primer Contrato",
        description: "Crea un token ERC-20",
        duration: "90 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "sc-7",
        title: "Patrones de Diseño",
        description: "Factory, Proxy, Diamond",
        duration: "70 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "sc-8",
        title: "Testing con Hardhat",
        description: "Unit tests y cobertura",
        duration: "60 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "sc-9",
        title: "Seguridad en Contratos",
        description: "Vulnerabilidades comunes",
        duration: "75 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "sc-10",
        title: "Gas Optimization",
        description: "Reduce costos de transacción",
        duration: "50 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "sc-11",
        title: "Deploy a Mainnet",
        description: "Proceso completo de deployment",
        duration: "45 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "sc-12",
        title: "Proyecto Final",
        description: "Crea una DApp completa",
        duration: "120 min",
        type: "practice",
        completed: true,
        locked: false,
      },
    ],
  },
  {
    id: "defi-fundamentals",
    image: "/assets/glass-coins-financial-exchange-pink-yellow-gradient (1).png",
    title: "DeFi Fundamentals",
    description: "Explora el ecosistema DeFi: lending, staking, AMMs y más.",
    longDescription:
      "Comprende cómo funcionan los protocolos DeFi más importantes. Desde Uniswap hasta Aave, aprende la mecánica detrás de la finanzas descentralizadas.",
    difficulty: "Intermedio",
    duration: "10 horas",
    points: 600,
    progress: 80,
    totalModules: 10,
    completedModules: 8,
    skills: ["DeFi", "AMMs", "Lending", "Yield Farming"],
    instructor: "Carlos Ruiz",
    modules: [
      {
        id: "defi-1",
        title: "Introducción a DeFi",
        description: "El ecosistema financiero descentralizado",
        duration: "40 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "defi-2",
        title: "AMMs: Automated Market Makers",
        description: "Cómo funcionan Uniswap y similares",
        duration: "55 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "defi-3",
        title: "Práctica: Swap en Uniswap",
        description: "Tu primera transacción DeFi",
        duration: "30 min",
        type: "practice",
        completed: true,
        locked: false,
      },
      {
        id: "defi-4",
        title: "Lending Protocols",
        description: "Aave, Compound y préstamos on-chain",
        duration: "60 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "defi-5",
        title: "Quiz: AMMs y Lending",
        description: "Evalúa tu comprensión",
        duration: "15 min",
        type: "quiz",
        completed: true,
        locked: false,
      },
      {
        id: "defi-6",
        title: "Yield Farming",
        description: "Estrategias de optimización de rendimiento",
        duration: "50 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "defi-7",
        title: "Stablecoins",
        description: "DAI, USDC, y mecanismos de estabilidad",
        duration: "45 min",
        type: "video",
        completed: true,
        locked: false,
      },
      {
        id: "defi-8",
        title: "Riesgos en DeFi",
        description: "Impermanent loss, rug pulls, hacks",
        duration: "55 min",
        type: "reading",
        completed: true,
        locked: false,
      },
      {
        id: "defi-9",
        title: "Liquid Staking",
        description: "Lido, Rocket Pool y derivados",
        duration: "50 min",
        type: "video",
        completed: false,
        locked: false,
      },
      {
        id: "defi-10",
        title: "Proyecto: Estrategia DeFi",
        description: "Diseña tu propia estrategia de yield",
        duration: "90 min",
        type: "practice",
        completed: false,
        locked: false,
      },
    ],
  },
];

export function getTrackById(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}
