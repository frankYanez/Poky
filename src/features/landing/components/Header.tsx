"use client";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { AuthModal } from "../../autentication/components/AuthModal";
import Image from "next/image";
import Link from "next/link";
import { useScroll } from "@/src/shared/hooks/useScroll";
import { cn } from "@/src/shared/lib/cn/utils";
import { HEADER_DATA } from "../data/landingData";

export default function Header() {
  const scrolled = useScroll(10);
  return (
    <>
      <header className={cn(
                "fixed top-0 left-0 z-40 w-full border-b transition-all duration-300",
                scrolled
                  ? "bg-linear-to-tr from-black/80 via-[#051018]/20 to-black/45 backdrop-blur-2xl border-zinc-700/10 shadow-soft"
                  : "bg-transparent border-transparent"
              )}>
        <ContainerContent maxWidth="compact">
          <nav className="flex w-full items-center justify-between py-3">
            {/* Logo */}
            <Link
              href="/"
              className="cursor-pointer text-2xl font-bold text-white flex flex-row items-center gap-2"
            >
              <Image
                src="/assets/logo-poky-grade.png"
                alt={HEADER_DATA.logoAlt}
                width={48}
                height={48}
              />
              <p>{HEADER_DATA.brandName}</p>
            </Link>

            {/* Desktop links */}
            <div className="hidden items-center gap-2 md:flex cursor-pointer hover:scale-105">
              <AuthModal />
            </div>
          </nav>
        </ContainerContent>
      </header>
    </>
  );
}
