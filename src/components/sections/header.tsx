import { profile } from "@/data/portfolio";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" }
];

export function Header() {
  return (
    <header data-animate className="sticky top-0 z-50 mx-auto w-fit pt-0">
      <div className="rounded-full bg-gradient-to-r from-pink-500/40 via-fuchsia-400/30 to-pink-500/40 p-[1px] shadow-[0_10px_40px_rgba(236,72,153,0.25)]">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-black/90 px-4 py-1.5 backdrop-blur-xl md:px-5">
          <a href="#home" data-nav-item className="text-sm font-semibold tracking-[0.14em] text-white">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-pink-400 align-middle" />
            {profile.name}
          </a>

          <nav className="flex flex-wrap items-center gap-1 text-xs md:text-sm">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-nav-item
                className="px-2 py-1 text-slate-200/90 transition hover:text-pink-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            data-nav-item
            href={`mailto:${profile.email}`}
            className="rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-400 px-4 py-1.5 text-xs font-medium text-white shadow-[0_0_28px_rgba(236,72,153,0.35)] transition hover:scale-[1.02] hover:opacity-95 md:text-sm"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
