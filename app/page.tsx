"use client";
import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  defaultSiteContent,
  AboutContent,
  ExperienceItem,
  Project,
} from "@/data/site-content";

export default function Home() {
  const [about, setAbout] = useState<AboutContent>(defaultSiteContent.about);
  const [projects, setProjects] = useState<Project[]>(defaultSiteContent.projects);
  const [experience, setExperience] = useState<ExperienceItem[]>(
    defaultSiteContent.experience
  );
  const [techStack, setTechStack] = useState<string[]>(
    defaultSiteContent.techStack
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [lightbox, setLightbox] = useState<{
    title: string;
    urls: string[];
    index: number;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const response = await fetch("/api/content", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = await response.json();
        if (!isMounted) {
          return;
        }

        setProjects(
          Array.isArray(data?.projects) ? data.projects : defaultSiteContent.projects
        );
        setAbout(
          data?.about && typeof data.about === "object"
            ? data.about
            : defaultSiteContent.about
        );
        setExperience(
          Array.isArray(data?.experience)
            ? data.experience
            : defaultSiteContent.experience
        );
        setTechStack(
          Array.isArray(data?.techStack)
            ? data.techStack
            : defaultSiteContent.techStack
        );
      } catch {
        // Keep fallback content when external content is unavailable.
      }
    };

    loadContent();
    const intervalId = window.setInterval(loadContent, 30000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      }

      if (event.key === "ArrowRight") {
        setLightbox((current) => {
          if (!current) return current;
          return {
            ...current,
            index: (current.index + 1) % current.urls.length,
          };
        });
      }

      if (event.key === "ArrowLeft") {
        setLightbox((current) => {
          if (!current) return current;
          return {
            ...current,
            index:
              (current.index - 1 + current.urls.length) % current.urls.length,
          };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox]);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState(null);
    setIsSubmitting(true);

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setSubmitState({
        type: "error",
        message: "All fields are required.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "Unable to send message right now.");
      }

      setSubmitState({
        type: "success",
        message: "Email successfully sent.",
      });
      form.reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message.";
      setSubmitState({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="top">
      <section className="section min-h-[78vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl space-y-5"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
            Software Engineer
          </p>
          <h1 className="text-5xl md:text-7xl font-bold">
            Hi, I&apos;m <span className="text-accent">Josh Cox</span>
          </h1>
          <p className="text-lg md:text-xl text-ink max-w-2xl leading-relaxed">
            
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://github.com/Josh-Cox"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-surface/70 text-ink transition hover:border-accent/60 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.75-1.34-1.75-1.1-.74.08-.73.08-.73 1.22.08 1.86 1.24 1.86 1.24 1.08 1.85 2.84 1.31 3.53 1 .11-.78.43-1.31.78-1.61-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.2-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.22a11.43 11.43 0 0 1 6 0c2.28-1.54 3.29-1.22 3.29-1.22.66 1.64.25 2.86.12 3.16.77.84 1.24 1.9 1.24 3.2 0 4.58-2.8 5.59-5.48 5.89.44.37.83 1.09.83 2.21v3.28c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/josh-cox-bb2874270/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-surface/70 text-ink transition hover:border-accent/60 hover:text-accent"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>
            <a
              href={about.cvUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View CV PDF"
              aria-disabled={!about.cvUrl}
              className={`inline-flex h-11 items-center justify-center rounded-md border border-white/15 bg-surface/70 px-3 text-sm font-mono text-ink transition hover:border-accent/60 hover:text-accent ${
                about.cvUrl ? "" : "pointer-events-none opacity-40"
              }`}
              onClick={(event) => {
                if (!about.cvUrl) event.preventDefault();
              }}
            >
              CV
            </a>
          </div>
          <a href="#projects" className="btn text-sm font-mono">
            View Projects
          </a>
        </motion.div>
      </section>

      <section id="about" className="section border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
              About
            </p>
            <p className="text-2xl leading-relaxed text-text">
              {about.intro}
            </p>
            <p className="mt-6 text-ink leading-relaxed max-w-2xl">
              {about.details}
            </p>
          </div>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-surface/70 px-3 py-1 text-xs text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section border-t border-white/10">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-8">
          Experience
        </p>
        <div className="space-y-8">
          {experience.map((item) => (
            <article
              key={`${item.years}-${item.title}`}
              className="grid gap-3 md:grid-cols-[140px_1fr] border-b border-white/10 pb-8"
            >
              <p className="text-xs font-mono text-ink/70 pt-1">{item.years}</p>
              <div>
                <h3 className="text-xl">{item.title}</h3>
                <p className="text-accent mt-1">{item.company}</p>
                <p className="text-ink mt-3 leading-relaxed">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="section border-t border-white/10">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-8">
          Projects
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="card">
              <div className="mb-4">
                {(() => {
                  const imageUrls =
                    Array.isArray(p.imageUrls) && p.imageUrls.length > 0
                      ? p.imageUrls
                      : p.imageUrl
                        ? [p.imageUrl]
                        : [];

                  if (!imageUrls.length) {
                    return (
                      <div className="h-44 w-full overflow-hidden rounded-lg border border-white/10 bg-surface/70">
                        <div className="h-full w-full bg-gradient-to-br from-accent/25 to-accent2/20" />
                      </div>
                    );
                  }

                  if (imageUrls.length === 1) {
                    return (
                      <button
                        type="button"
                        onClick={() =>
                          setLightbox({ title: p.title, urls: imageUrls, index: 0 })
                        }
                        className="h-72 w-full overflow-hidden rounded-lg border border-white/10 bg-surface/70"
                      >
                        <img
                          src={imageUrls[0]}
                          alt={p.title}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </button>
                    );
                  }

                  return (
                    <div className="grid h-72 grid-cols-3 gap-2">
                      {imageUrls.slice(0, 3).map((url, index) => (
                        <button
                          type="button"
                          onClick={() =>
                            setLightbox({ title: p.title, urls: imageUrls, index })
                          }
                          key={`${p.title}-image-${index}`}
                          className="overflow-hidden rounded-lg border border-white/10 bg-surface/70"
                        >
                          <img
                            src={url}
                            alt={`${p.title} screenshot ${index + 1}`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  );
                })()}
                <p className="mt-2 text-xs text-ink/70">
                  Click image to enlarge
                </p>
              </div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl">{p.title}</h3>
                <div className="flex gap-3 text-sm">
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  )}
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer">
                      Live
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 text-ink leading-relaxed">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-surface/70 px-2 py-1 text-xs text-ink"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section border-t border-white/10">
        <div className="mx-auto max-w-4xl">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4 text-center">
            Contact Me
          </p>
          <p className="mt-5 text-center text-ink text-lg">
            I&apos;d love to hear from you!
          </p>

          {submitState && (
            <p
              className={`mt-8 rounded-md border px-4 py-3 text-sm ${
                submitState.type === "success"
                  ? "border-accent/40 bg-accent/10 text-accent2"
                  : "border-red-400/30 bg-red-500/10 text-red-300"
              }`}
            >
              {submitState.message}
            </p>
          )}

          <form className="mt-12 space-y-6" onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full rounded-md border border-white/15 bg-surface/60 px-5 py-4 text-text placeholder:text-ink/70 outline-none transition focus:border-accent/60 focus:ring-1 focus:ring-accent/40"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full rounded-md border border-white/15 bg-surface/60 px-5 py-4 text-text placeholder:text-ink/70 outline-none transition focus:border-accent/60 focus:ring-1 focus:ring-accent/40"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows={8}
              className="w-full rounded-md border border-white/15 bg-surface/60 px-5 py-4 text-text placeholder:text-ink/70 outline-none transition focus:border-accent/60 focus:ring-1 focus:ring-accent/40"
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-ink">Or give me a call - 07938864084</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-md border border-accent/60 bg-accent/20 px-8 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-bg"
              >
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[70] bg-bg/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl items-center justify-center px-4 py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-6 top-6 rounded-md border border-white/20 px-3 py-1 text-sm text-ink hover:text-accent"
              onClick={() => setLightbox(null)}
            >
              Close
            </button>
            {lightbox.urls.length > 1 && (
              <button
                type="button"
                className="absolute left-4 rounded-md border border-white/20 px-3 py-2 text-lg text-ink hover:text-accent"
                onClick={() =>
                  setLightbox((current) =>
                    current
                      ? {
                          ...current,
                          index:
                            (current.index - 1 + current.urls.length) %
                            current.urls.length,
                        }
                      : current
                  )
                }
              >
                {"<"}
              </button>
            )}
            <div className="w-full">
              <p className="mb-3 text-center text-sm text-ink">{lightbox.title}</p>
              <div className="h-[80vh] overflow-hidden rounded-xl2 border border-white/10 bg-surface/70">
                <img
                  src={lightbox.urls[lightbox.index]}
                  alt={`${lightbox.title} full view`}
                  className="h-full w-full object-contain"
                />
              </div>
              {lightbox.urls.length > 1 && (
                <p className="mt-3 text-center text-xs text-ink/70">
                  {lightbox.index + 1} / {lightbox.urls.length}
                </p>
              )}
            </div>
            {lightbox.urls.length > 1 && (
              <button
                type="button"
                className="absolute right-4 rounded-md border border-white/20 px-3 py-2 text-lg text-ink hover:text-accent"
                onClick={() =>
                  setLightbox((current) =>
                    current
                      ? {
                          ...current,
                          index: (current.index + 1) % current.urls.length,
                        }
                      : current
                  )
                }
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
