"use client";
import React, { useEffect, useRef } from "react";
import type { FC } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import ContainerContent from "@/src/shared/components/ContainerContent";
import { FOOTER_DATA } from "../data/landingData";

const Footer: FC = () => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // base styles for the spotlight element
    Object.assign(el.style, {
      position: "fixed",
      width: "520px",
      height: "520px",
      borderRadius: "50%",
      pointerEvents: "none",
      background:
        "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)",
      zIndex: "40",
      mixBlendMode: "screen",
      transform: "translate(-50%, -50%)",
      left: "50%",
      top: "50%",
      opacity: "0",
    } as React.CSSProperties);

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(el, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(el, { opacity: 1, duration: 0.25, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.5, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer className="relative isolate overflow-hidden bg-linear-to-tr from-black/80 via-[#051018]/70 to-black/95 text-white">
      <div ref={spotlightRef} aria-hidden />
      <ContainerContent maxWidth="compact" className="py-12 flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white/5 p-2 flex items-center justify-center">
            <Image
              src="/assets/logo-poky-grade.png"
              alt={FOOTER_DATA.brand.logoAlt}
              width={36}
              height={36}
            />
          </div>
          <div className="leading-tight">
            <div className="text-lg font-semibold">{FOOTER_DATA.brand.name}</div>
            <div className="text-sm text-(--color-muted)">
              {FOOTER_DATA.brand.tagline}
            </div>
          </div>
        </div>

       

        <div className="flex items-center gap-3">
          {FOOTER_DATA.socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              aria-label={s.label}
              className="h-9 w-9 rounded-full bg-white/5 flex items-center justify-center text-xs font-medium hover:bg-white/7 transition"
              target="_blank"
              rel="noreferrer"
            >
              {s.id === "twitter" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M20 7.5c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.5-1.7-.7.4-1.4.7-2.2.9C17 6.1 16 6 15.1 6c-1.6 0-2.9 1.3-2.9 2.9 0 .2 0 .4.1.6-2.4-.1-4.5-1.3-5.9-3.1-.2.4-.3.9-.3 1.3 0 1 .5 1.9 1.2 2.5-.5 0-1-.1-1.4-.4v.1c0 1.4 1 2.6 2.3 2.8-.4.2-.9.2-1.3.1.4 1.2 1.6 2 3 2-1.1.9-2.4 1.5-3.9 1.5H6c1.4.9 3 1.4 4.8 1.4 5.8 0 9-4.8 9-9v-.4c.6-.4 1-1 1.4-1.6-.6.3-1.3.5-2 .6z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {s.id === "github" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 .5C5.6.5.5 5.6.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.4.1 2.2 1.5 2.2 1.5 1.1 1.9 2.9 1.4 3.6 1.1.1-.9.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.4.1-2.9 0 0 1-.3 3.2 1.2.9-.2 1.9-.3 2.9-.3s2 .1 2.9.3c2.2-1.6 3.2-1.2 3.2-1.2.7 1.5.2 2.6.1 2.9.8.8 1.3 1.9 1.3 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1.1.8 2.3v3.4c0 .4.2.7.8.6C20.2 21.4 23.5 17.1 23.5 12 23.5 5.6 18.4.5 12 .5z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {s.id === "dribbble" && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M12 0C5.4 0 0 5.4 0 12c0 6.6 5.4 12 12 12s12-5.4 12-12C24 5.4 18.6 0 12 0zm6.6 5.1c1.2 1.5 1.9 3.4 1.9 5.4 0 .2 0 .5-.1.7-2.6-.4-4.9-1-6.5-1.7.4-.8.8-1.6 1.1-2.5 1.9.4 3.6 1 4.6 2.1zM12 2.2c2.8 0 5.3 1 7.2 2.6-.9 1.1-2.4 1.7-4.1 2.1-.4.1-.9.2-1.3.3-.5-.9-1.1-1.9-1.6-2.8-0-.1-.1-.1-.1-.1C11.9 3.5 11.0 2.2 12 2.2z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </a>
          ))}
        </div>
      </ContainerContent>

      <div className="border-t border-white/6 py-6 text-center text-sm text-(--color-muted)">
        © {new Date().getFullYear()} {FOOTER_DATA.copyright}
      </div>
    </footer>
  );
};

export default Footer;
