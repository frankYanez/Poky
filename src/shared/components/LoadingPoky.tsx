"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function LoadingPoky() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/10 backdrop-blur-2xl">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/assets/logo-poky-front.png"
          alt="Loading Poky"
          width={120}
          height={120}
          priority
        />
      </motion.div>
    </div>
  );
}
