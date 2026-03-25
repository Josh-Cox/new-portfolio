export default function AboutPage() {
  return (
    <section className="py-14">
      <header className="mb-8">
        <p className="font-mono text-accent2">01. About</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white">About Me</h1>
      </header>

      <div className="rounded-xl2 border border-white/5 bg-panel/70 p-8 shadow-soft">
        <p className="text-ink/80 leading-relaxed">
          Short bio goes here. Talk about your background, strengths, and what
          you enjoy building. Replace this with your real copy.
        </p>
      </div>
    </section>
  );
}
