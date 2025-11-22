"use client";
import { useState, useEffect } from "react";
import { User, Disc3, ListMusic, Info, LogOut } from "lucide-react";
import { useScroll } from "@/src/shared/hooks/useScroll";
import { cn } from "@/src/shared/lib/cn/utils";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { button } from "@/src/shared/lib/cva/button";
import { useAuthStore } from "@/src/features/autentication/store/authStore";
import { useLogout } from "@getpara/react-sdk";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const scrolled = useScroll(10);

  const { logout: clearAuth } = useAuthStore();
  const { logoutAsync } = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAsync();
      clearAuth();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Cerrar logout al hacer click fuera
  useEffect(() => {
    if (!showLogout) return;

    const handleClickOutside = () => setShowLogout(false);
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLogout]);

  const links = [
    { label: "Mis tracks", href: "#", icon: ListMusic },
    { label: "Tracks", href: "#tracks", icon: Disc3 },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 left-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "bg-dark-900/90 backdrop-blur2xl border-dark-700/10 shadow-soft"
            : "bg-transparent border-transparent"
        )}
      >
        <ContainerContent maxWidth="compact">
          <nav className="flex w-full items-center justify-between py-4">
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
            <div className="hidden items-center gap-1 md:flex">
              {links.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    className={cn(
                      button({
                        intent: "ghost",
                        size: "sm",
                        weight: "md",
                      }),
                      "text-dark-200 hover:text-dark-100 hover:bg-dark-700/50 gap-2"
                    )}
                    href={link.href}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </a>
                );
              })}

              {/* User menu */}
              <div className="relative ml-2">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className={cn(
                    "flex items-center justify-center size-10 rounded-full transition-all duration-200",
                    "bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600/50",
                    showLogout && "bg-violet-500/20 border-violet-500/30"
                  )}
                >
                  <User className="size-5 text-dark-200" />
                </button>

                {/* Logout dropdown desktop */}
                <div
                  className={cn(
                    "absolute right-0 top-14 glass-card rounded-xl overflow-hidden transition-all duration-200",
                    showLogout
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  )}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-dark-200 hover:text-red-400 hover:bg-red-500/10 text-sm whitespace-nowrap transition-colors duration-200 w-full"
                  >
                    <LogOut className="size-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile: Avatar con logout */}
            <div className="relative flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className={cn(
                  "flex items-center justify-center size-9 rounded-full transition-all duration-200",
                  "bg-dark-700/50 border border-dark-600/50",
                  showLogout && "bg-violet-500/20 border-violet-500/30"
                )}
              >
                <User className="size-4 text-dark-200" />
              </button>

              {/* Logout button slide mobile */}
              <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-red-400 text-sm transition-all duration-200",
                  showLogout
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4 pointer-events-none"
                )}
              >
                <LogOut className="size-4" />
                Salir
              </button>
            </div>
          </nav>
        </ContainerContent>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 z-40 flex w-full justify-around bg-dark-900/95 backdrop-blur-xl border-t border-dark-700/50 py-3 md:hidden safe-area-bottom">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center gap-1 text-dark-400 hover:text-violet-400 transition-colors duration-200"
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{link.label}</span>
            </a>
          );
        })}
      </div>

      {/* Spacer for fixed header */}
      <div className="h-[72px]" />
    </>
  );
}
