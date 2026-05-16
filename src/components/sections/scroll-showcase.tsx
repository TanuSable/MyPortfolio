"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./scroll-showcase.module.css";

const outerImages = [
  "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1556304044-0699e31c6a34?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?auto=format&fit=crop&w=1000&q=80"
];

const innerImages = [
  "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1667483629944-6414ad0648c5?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?auto=format&fit=crop&w=1000&q=80"
];

const centerPair = [
  "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
];

const centerImage =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80";

export function ScrollShowcase() {
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
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };
          const stickyTrigger = rootRef.current?.querySelector("[data-scroll-stage]") as HTMLElement | null;
          const center = rootRef.current?.querySelector("[data-center-image]") as HTMLElement | null;
          const layers = gsap.utils.toArray<HTMLElement>(rootRef.current?.querySelectorAll("[data-layer]") ?? []);

          if (!stickyTrigger || !center) return;

          if (reduceMotion) {
            gsap.set(layers, { opacity: 1, scale: 1 });
            gsap.set(center, { scale: 1 });
            return;
          }

          const startScale = window.innerWidth < 900 ? 4.2 : 6.5;

          gsap.set(layers, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
          gsap.set(center, { scale: startScale, transformOrigin: "50% 50%" });

          const eases = ["power1.inOut", "power3.inOut", "power4.inOut"] as const;
          gsap.to(center, {
            scale: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: stickyTrigger,
              start: "top top",
              end: "80% bottom",
              scrub: true
            }
          });

          layers.forEach((layer, index) => {
            const endDistance = 1 - index * 0.05;
            const sharedTrigger = {
              trigger: stickyTrigger,
              start: "top top",
              end: `${Math.max(0.85, endDistance)} bottom`,
              scrub: true
            };

            gsap.timeline({ scrollTrigger: sharedTrigger }).to(layer, {
              opacity: 0,
              duration: 0.55,
              ease: "none"
            }).to(layer, {
              opacity: 1,
              duration: 0.45,
              ease: "sine.out"
            });

            gsap.timeline({ scrollTrigger: sharedTrigger }).to(layer, {
              scale: 0,
              duration: 0.3,
              ease: "none"
            }).to(layer, {
              scale: 1,
              duration: 0.7,
              ease: eases[index] ?? "power2.inOut"
            });
          });

          const onReady = () => ScrollTrigger.refresh();
          window.addEventListener("load", onReady);
          return () => window.removeEventListener("load", onReady);
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className={`${styles.wrap} text-white`}>
      <header className={styles.intro}>
        <h1 className="text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.8] tracking-tight">
          let&apos;s
          <br />
          scroll.
        </h1>
        <h2 className="pt-6 text-sm text-slate-300 md:text-lg">
          Inspired by
          {" "}
          <a
            href="https://codepen.io/jh3y/pen/VYZwOwd"
            target="_blank"
            rel="noreferrer"
            className="text-pink-300 transition hover:text-pink-200"
          >
            Jhey
          </a>
          {" "}
          and rebuilt with Next.js + Tailwind + GSAP
        </h2>
      </header>

      <section className={styles.stickySection} data-scroll-stage>
        <div className={styles.stickyContent}>
          <div className={styles.grid}>
            <div className={`${styles.layer} ${styles.layerOne}`} data-layer>
              {outerImages.map((src) => (
                <div key={src} className={styles.card}>
                  <Image src={src} alt="" width={800} height={1000} className={styles.thumb} />
                </div>
              ))}
            </div>

            <div className={`${styles.layer} ${styles.layerTwo}`} data-layer>
              {innerImages.map((src) => (
                <div key={src} className={styles.card}>
                  <Image src={src} alt="" width={800} height={1000} className={styles.thumb} />
                </div>
              ))}
            </div>

            <div className={`${styles.layer} ${styles.layerThree}`} data-layer>
              {centerPair.map((src) => (
                <div key={src} className={styles.card}>
                  <Image src={src} alt="" width={800} height={1000} className={styles.thumb} />
                </div>
              ))}
            </div>

            <div className={styles.scaler}>
              <Image
                src={centerImage}
                alt="Featured fashion visual"
                width={900}
                height={1200}
                className={styles.thumb}
                data-center-image
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid min-h-[70vh] place-items-center">
        <h2 className="text-[clamp(2rem,8vw,6rem)] font-semibold tracking-tight text-pink-200">fin.</h2>
      </section>
    </section>
  );
}
