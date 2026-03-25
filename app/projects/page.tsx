import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="py-14">
      <header className="mb-8">
        <p className="font-mono text-accent2">02. Work</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Selected Projects
        </h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="rounded-xl2 border border-white/5 bg-panel/70 p-6 shadow-soft hover:shadow-glow transition"
          >
            <div className="mb-4 h-44 w-full overflow-hidden rounded-lg border border-white/5">
              {/* Replace with actual <Image/> later */}
              <div className="h-full w-full bg-gradient-to-br from-accent/25 to-accent2/20" />
            </div>

            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-ink/75">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded border border-white/10 px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-4 text-sm">
              {p.demo && (
                <a
                  className="text-accent hover:shadow-glow rounded-md border border-accent/30 px-3 py-1 transition"
                  href={p.demo}
                  target="_blank"
                >
                  Live
                </a>
              )}
              {p.repo && (
                <a
                  className="text-accent hover:shadow-glow rounded-md border border-accent/30 px-3 py-1 transition"
                  href={p.repo}
                  target="_blank"
                >
                  Code
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
