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

export default function Header() {
  // const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const scrolled = useScroll(10);

    const {  logout: clearAuth } = useAuthStore();
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
    { label: "Tracks", href: "#", icon: Disc3 },
    { label: "Mis tracks", href: "#", icon: ListMusic },
    { label: "Informacion", href: "#", icon: Info },
  ];

  // useEffect para el drawer (comentado por ahora)
  // React.useEffect(() => {
  //   document.body.style.overflow = open ? "hidden" : "";
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [open]);

  return (
    <>
      {/* HEADER */}
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full border-transparent border-b bg-neutral-950",
          {
            "bg-neutral-900/95 backdrop-blur-2xl": scrolled,
          }
        )}
      >
        <ContainerContent maxWidth="compact">
          <nav className="flex w-full items-center justify-between py-3">
            {/* Logo */}
            <a href="#" className="text-2xl font-bold text-white">POKY</a>

            {/* Desktop links */}
            <div className="hidden items-center gap-2 md:flex">
              {links.map((link, i) => (
                <a
                  key={i}
                  className={button({
                    intent: "ghost",
                    size: "sm",
                    weight: "md",
                  })}
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
              <div className="relative">
                <button
                  onClick={() => setShowLogout(!showLogout)}
                  className="flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <User className="size-5 text-white" />
                </button>
                {/* Logout dropdown desktop */}
                <button
                  onClick={handleLogout}
                  className={cn(
                    "absolute right-0 top-12 flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm whitespace-nowrap transition-all duration-200",
                    showLogout ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                  )}
                >
                  <LogOut className="size-4" />
                  Cerrar sesión
                </button>
              </div>
            </div>

            {/* Mobile: Avatar con logout */}
            <div className="relative flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowLogout(!showLogout)}
                className="flex items-center justify-center size-9 rounded-full bg-white/10"
              >
                <User className="size-4 text-white" />
              </button>
              {/* Logout button slide mobile */}
              <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-sm transition-all duration-200",
                  showLogout ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                )}
              >
                <LogOut className="size-4" />
                Salir
              </button>
            </div>
          </nav>
        </ContainerContent>
      </header>

      {/* MOBILE DRAWER (comentado por ahora)
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 w-full rounded-t-3xl bg-neutral-900 text-white px-5 pb-8 pt-4 shadow-2xl transition-transform duration-300 md:hidden",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex justify-center mb-4">
          <div className="w-10 h-1 rounded-full bg-neutral-700" />
        </div>
        <nav className="grid gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                button({ intent: "ghost", size: "lg", weight: "md" }),
                "w-full justify-start rounded-xl px-4 py-3 text-base"
              )}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      */}

      {/* MOBILE BOTTOM NAVIGATION (estilo app) */}
      <div className="fixed bottom-0 left-0 z-40 flex w-full justify-around bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800 py-2 md:hidden">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition"
            >
              <Icon className="size-5" />
              <span className="text-xs">{link.label}</span>
            </a>
          );
        })}
      </div>
    </>
  );
}
