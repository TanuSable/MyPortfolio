import { projects } from "@/data/portfolio";
import { SectionTitle } from "@/components/ui/section-title";

export function ProjectsSection() {
  return (
    <section>
      <div data-animate>
        <SectionTitle eyebrow="Projects" title="Selected work" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article key={project.name} data-animate className="border-t border-white/15 pt-5">
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="mt-2 text-xs uppercase tracking-wider text-pink-300">{project.stack}</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {project.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
