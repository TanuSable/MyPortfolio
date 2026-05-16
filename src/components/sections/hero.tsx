import Image from "next/image";
import { heroImages, profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="relative overflow-hidden p-2 md:p-4">
      <div data-parallax className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-500/30 blur-3xl" />
      <div data-parallax className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-fuchsia-400/25 blur-3xl" />
      <div className="grid items-center gap-10 md:grid-cols-[1.15fr_0.85fr]">
        <div data-animate>
          <p className="text-xs uppercase tracking-[0.2em] text-pink-300">{profile.title}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
            <a className="px-1 py-1 underline decoration-pink-400/80 underline-offset-4 transition hover:text-pink-300" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="px-1 py-1 underline decoration-pink-400/80 underline-offset-4 transition hover:text-pink-300" href={`tel:${profile.phone}`}>
              {profile.phone}
            </a>
          </div>
        </div>

        <div data-animate className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Image
              src={heroImages[0]}
              alt="Coding workspace"
              width={1200}
              height={800}
              className="h-48 w-full rounded-2xl object-cover md:h-60"
              priority
            />
          </div>
          <Image
            src={heroImages[1]}
            alt="Developer setup"
            width={600}
            height={600}
            className="h-36 w-full rounded-2xl object-cover md:h-44"
          />
          <Image
            src={heroImages[2]}
            alt="Modern technology"
            width={600}
            height={600}
            className="h-36 w-full rounded-2xl object-cover md:h-44"
          />
        </div>
      </div>
    </section>
  );
}
