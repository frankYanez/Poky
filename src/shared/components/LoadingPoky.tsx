import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

export default function LoadingPoky({ loading }: { loading?: boolean }) {
  return (
    <div>
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900 w-screen"
        initial={{ opacity: 0, rotateY: 0 }}
        animate={{ opacity: 1 }}
        exit={{ rotateY: 360 }}
        transition={{ duration: 1.5 }}
      >
        <Image
          src="/assets/logo-poky-front.png"
          alt="Loading Poky"
          width={250}
          height={250}
        />
      </motion.div>
    </div>
  );
}
