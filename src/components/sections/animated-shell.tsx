"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type AnimatedShellProps = {
  children: React.ReactNode;
};

export function AnimatedShell({ children }: AnimatedShellProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          noPreference: "(prefers-reduced-motion: no-preference)"
        },
        (context) => {
          const { reduceMotion } = context.conditions as {
            reduceMotion: boolean;
            noPreference: boolean;
          };

          if (reduceMotion) {
            gsap.set("[data-animate], [data-nav-item], [data-section]", { opacity: 1, y: 0 });
            return;
          }

          gsap.from("[data-animate]", {
            opacity: 0,
            y: 32,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out"
          });

          gsap.from("[data-nav-item]", {
            opacity: 0,
            y: -10,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.1
          });

          const sections = gsap.utils.toArray<HTMLElement>("[data-section]");
          sections.forEach((section) => {
            gsap.from(section, {
              opacity: 0,
              y: 28,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 82%",
                toggleActions: "play none none reverse"
              }
            });
          });

          gsap.to("[data-parallax]", {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return <div ref={rootRef}>{children}</div>;
}
