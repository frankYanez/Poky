"use client";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { AuthModal } from "../../autentication/components/AuthModal";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className=" backdrop-blur-2xl fixed top-0 left-0 z-40 w-full border-transparent border-b ">
        <ContainerContent maxWidth="compact">
          <nav className="flex w-full items-center justify-between py-3">
            {/* Logo */}
            <a
              href="#"
              className="text-2xl font-bold text-white flex flex-row items-center gap-2"
            >
              <Image
                src="/assets/logo-poky-grade.png"
                alt="Poky Logo"
                width={48}
                height={48}
              />
              <p>POKY</p>
            </a>

            {/* Desktop links */}
            <div className="hidden items-center gap-2 md:flex">
              <AuthModal />
            </div>
          </nav>
        </ContainerContent>
      </header>
    </>
  );
}
