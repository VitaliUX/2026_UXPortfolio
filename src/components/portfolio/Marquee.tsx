const items = [
  "UX Research",
  "Wireframes",
  "Visual Design",
  "UI Engineering",
  "Prototyping",
  "Usability Testing",
  "Design Systems",
  "Icon Design",
];

export const Marquee = () => {
  const loop = [...items, ...items];
  return (
    <section className="border-y border-border py-5 overflow-hidden bg-cream-deep">
      <div className="marquee-track flex whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-6 pr-6 mono text-sm uppercase tracking-[0.3em]"
          >
            <span className="text-foreground/80">{item}</span>
            <span className="text-accent">●</span>
          </div>
        ))}
      </div>
    </section>
  );
};
