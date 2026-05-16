import { experience } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/section-title";

export function ExperienceSection() {
  return (
    <section>
      <div data-animate>
        <SectionTitle eyebrow="Experience" title="What I build in production" />
      </div>

      <div className="space-y-5">
        {experience.map((item) => (
          <article key={item.role} data-animate className="border-l border-pink-400/70 pl-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{item.role}</h3>
              <span className="text-xs text-slate-400">{item.period}</span>
            </div>
            <p className="mt-2 text-sm text-pink-300">{item.company}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {item.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
