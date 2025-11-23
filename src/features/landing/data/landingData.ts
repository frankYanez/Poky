// ============================================
// LANDING PAGE DATA (EN)
// ============================================

// --------------------------------------------
// HEADER
// --------------------------------------------
export const HEADER_DATA = {
  logoAlt: "Poky Logo",
  brandName: "POKY",
} as const;

// --------------------------------------------
// HERO SECTION
// --------------------------------------------
export const HERO_DATA = {
 
  lead: "Publish immutable learning modules, complete knowledge through commit–reveal, and claim soulbound badges that publicly prove your progress — portable, trustless, and cryptographically verifiable.",
  ctaButton: "Learn more",
  imageAlt: "Protocol interface showing modules, tracks and soulbound badges",
  coreInsight: {
    label: "Core Insight",
    title: "Cryptographic Learning Validation",
    description:
      "Commit–reveal flow, author signatures and soulbound badges ensure verifiable proof of completion without exposing your answers.",
  },
  brandMark: {
    initials: "PK",
    name: "Poky",
    ariaLabel: "Poky — verifiable learning protocol",
  },
} as const;

// --------------------------------------------
// PROBLEM SECTION
// --------------------------------------------
export const PROBLEM_SECTION_DATA = {
  badge: "The Problem",
  badgeNumber: "2️⃣",
 
  description:
    "Educational credentials rely on centralized authorities, manual processes, and opaque systems. Our protocol solves this at the root with cryptographic and on-chain verification.",
} as const;

export const PROBLEMS_DATA = [
  {
    title: "Forgery and lack of trust",
    description:
      "Certificates can be altered or fabricated. Without cryptographic proof, validation depends entirely on trusting an institution.",
    icon: "/assets/warning-sign-icon-glass-style-yellow-orange-gradient.png",
    accent: "from-[#FFD86Baa] to-[#FF7A6Bbb]",
  },
  {
    title: "Mutable, non-auditable records",
    description:
      "Educational content often lives in centralized databases. Without immutability or event logs, there is no auditability or timestamp integrity.",
    icon: "/assets/glass-pie-chart.png",
    accent: "from-[#7AB8FFbb] to-[#8B4DF7aa]",
  },
  {
    title: "Progress that can't be verified",
    description:
      "Completing a course produces no cryptographic evidence. No one can verify you actually learned something without trusting a middleman.",
    icon: "/assets/glass-shield.png",
    accent: "from-[#F7A8D6bb] to-[#7AB8FFaa]",
  },
] as const;

// --------------------------------------------
// SOLUTION SECTION
// --------------------------------------------
export const SOLUTION_SECTION_DATA = {
  badge: "The Solution",
  badgeNumber: "3️⃣",
  
  description:
    "Immutable modules, ordered tracks, commit–reveal progress and soulbound badges. A decentralized, auditable and portable learning infrastructure.",
} as const;

export const SOLUTIONS_DATA = [
  {
    title: "Immutable modules and tracks",
    description:
      "On-chain registries with sequential IDs, IPFS metadata, and ordered learning paths that preserve history — no edits, no silent mutations.",
    icon: "/assets/glass-check-mark.png",
    accent: "from-[#8B4DF7aa] via-[#7AB8FFaa] to-[#F7A8D6aa]",
    glow: "bg-[#8B4DF7]/40",
  },
  {
    title: "Commit–reveal verified progress",
    description:
      "Authors publish sequential commitments; learners reveal salted pre-images. No hash reuse, no forging completions, no trusted intermediaries.",
    icon: "/assets/like-icon-social-approval-glass-square-button.png",
    accent: "from-[#7AB8FFaa] via-[#7ADEFFaa] to-[#FFD86Baa]",
    glow: "bg-[#7AB8FF]/35",
  },
  {
    title: "Soulbound badges as proof of knowledge",
    description:
      "Learners mint module and track badges. No duplicates, optional burn-and-remint flow, and publicly verifiable across any web3 app or CV.",
    icon: "/assets/glass-shield.png",
    accent: "from-[#FFD86Baa] via-[#F7A8D6aa] to-[#8B4DF7aa]",
    glow: "bg-[#FFD86B]/30",
  },
] as const;

// --------------------------------------------
// USE CASES SECTION
// --------------------------------------------
export const USE_CASES_SECTION_DATA = {
  badge: "Use Cases",
  badgeNumber: "4️⃣",

  description:
    "From individual learners to institutions, Poky provides trustless infrastructure for anyone who needs to prove or verify knowledge.",
} as const;

export const USE_CASES_DATA = [
  {
    title: "Independent Learners",
    description:
      "Build a portable, verifiable learning portfolio. Collect soulbound badges that prove your skills to employers, DAOs, or communities — no institution required.",
    icon: "/assets/glass-earth-globe.png",
    accent: "from-[#8B4DF7aa] to-[#7AB8FFaa]",
  },
  {
    title: "Educators & Course Creators",
    description:
      "Publish immutable modules with commit–reveal validation. Your content stays tamper-proof, and completions are cryptographically verified.",
    icon: "/assets/glass-check-mark.png",
    accent: "from-[#7AB8FFaa] to-[#7ADEFFaa]",
  },
  {
    title: "DAOs & Web3 Communities",
    description:
      "Gate access, roles, or voting power based on verified learning. Require specific badges before joining governance or accessing resources.",
    icon: "/assets/glass-shield.png",
    accent: "from-[#FFD86Baa] to-[#F7A8D6aa]",
  },
  {
    title: "Employers & Recruiters",
    description:
      "Verify candidate credentials instantly on-chain. No calls to institutions, no forged certificates — just cryptographic proof of knowledge.",
    icon: "/assets/like-icon-social-approval-glass-square-button.png",
    accent: "from-[#F7A8D6aa] to-[#8B4DF7aa]",
  },
] as const;

// --------------------------------------------
// FOOTER
// --------------------------------------------
export const FOOTER_DATA = {
  brand: {
    name: "Poky",
    tagline: "Verifiable learning infrastructure",
    logoAlt: "Poky",
  },
  navigation: [
    { label: "Protocol", href: "#product" },
    { label: "Docs", href: "#docs" },
    { label: "GitHub", href: "#github" },
  ],
  socials: [
    { id: "twitter", href: "https://twitter.com/", label: "Twitter" },
    { id: "github", href: "https://github.com/", label: "GitHub" },
    { id: "dribbble", href: "https://dribbble.com/", label: "Dribbble" },
  ],
  copyright:
    "Poky — Open infrastructure for verifiable learning. All rights reserved.",
} as const;

// --------------------------------------------
// TYPES
// --------------------------------------------
export type Problem = (typeof PROBLEMS_DATA)[number];
export type Solution = (typeof SOLUTIONS_DATA)[number];
export type UseCase = (typeof USE_CASES_DATA)[number];
export type Social = (typeof FOOTER_DATA.socials)[number];
export type NavItem = (typeof FOOTER_DATA.navigation)[number];

