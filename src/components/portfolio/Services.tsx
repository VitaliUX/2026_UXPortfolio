import { motion } from "framer-motion";
import { Search, PencilRuler, Sparkles, Code2, FlaskConical } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Search,
    title: "Research",
    desc: "User interviews, analyzing study sessions, competitive audits — understanding the problem before sketching the solution.",
    items: ["User Interviews", "Heuristic Audit", "Analytics Review", "Personas"],
  },
  {
    num: "02",
    icon: PencilRuler,
    title: "Wireframes",
    desc: "Information architecture, user flows, low-fi wireframes — the structural argument of the product.",
    items: ["IA & Sitemaps", "Flows", "Wireframes", "Prototypes"],
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Visuals",
    desc: "Visual interface design, design systems, icon sets and bespoke iconographic web fonts.",
    items: ["UI Design", "Design Systems", "Icons", "Brand"],
  },
  {
    num: "04",
    icon: Code2,
    title: "Code",
    desc: "Front-end implementation in HTML, CSS and JavaScript — bridging the design file and production.",
    items: ["HTML / CSS", "JavaScript", "React", "SVG / Animation"],
  },
  {
    num: "05",
    icon: FlaskConical,
    title: "Test",
    desc: "Usability testing, iteration, validation — closing the loop between design intent and user reality.",
    items: ["Usability Testing", "A/B", "Iteration", "QA"],
  },
];

export const Services = () => {
  return (
    <section id="services" className="px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-4 mb-16">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-accent">// Process</p>
        </div>
        <h2 className="col-span-12 md:col-span-9 display-serif text-4xl md:text-6xl">
          Five stages from problem<br />to <span className="text-accent">shipped product</span>.
        </h2>
      </div>

      <div className="border-t border-border">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="grid grid-cols-12 gap-4 py-8 md:py-12 border-b border-border group hover:bg-cream-deep transition-colors duration-500 px-2 -mx-2"
            >
              <div className="col-span-2 md:col-span-1 mono text-sm text-accent">{s.num}</div>
              <div className="col-span-10 md:col-span-4 flex items-center gap-4">
                <Icon className="w-6 h-6 text-accent shrink-0" strokeWidth={1.5} />
                <h3 className="display-serif text-2xl md:text-4xl">{s.title}</h3>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-6 text-muted-foreground text-sm md:text-base leading-relaxed">
                {s.desc}
              </div>
              <ul className="col-span-12 md:col-span-3 flex flex-wrap md:flex-col gap-x-4 gap-y-1 mono text-xs text-muted-foreground">
                {s.items.map((it) => (
                  <li key={it}>— {it}</li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
