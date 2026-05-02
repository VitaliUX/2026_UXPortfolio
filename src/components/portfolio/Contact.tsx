import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

const details = [
  { icon: Mail, label: "E-mail", value: "vitali@vett.biz", href: "mailto:vitali@vett.biz" },
  { icon: Phone, label: "Cell", value: "650.862.0454", href: "tel:+16508620454" },
  { icon: MapPin, label: "Address", value: "4276 Wilkie Way Apt O\nPalo Alto, CA 94306" },
];

export const Contact = () => {
  return (
    <section id="contact" className="relative px-6 md:px-10 pt-24 md:pt-40 pb-10 bg-cream-deep border-t border-border overflow-hidden">
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <p className="eyebrow text-accent mb-8">// Contact</p>
        <h2 className="display-serif text-[14vw] md:text-[10vw] leading-[0.88]">
          Let's build<br />
          something <span className="text-accent">good</span>.
        </h2>
      </motion.div>

      <div className="relative grid grid-cols-12 gap-4 mt-16 md:mt-24">
        <div className="col-span-12 md:col-span-7">
          <a
            href="mailto:vitali@vett.biz"
            className="group inline-flex items-center gap-3 display-serif text-2xl md:text-5xl border-b border-foreground pb-2 break-all"
          >
            vitali@vett.biz
            <ArrowUpRight className="w-7 h-7 md:w-10 md:h-10 shrink-0 transition-all duration-500 group-hover:rotate-45 group-hover:text-accent" />
          </a>
          <p className="mt-6 text-muted-foreground max-w-md text-sm md:text-base leading-relaxed">
            For new projects, contracts, or a conversation about UX,
            front-end engineering, or design systems.
          </p>
        </div>

        <div className="col-span-12 md:col-span-5 md:col-start-8 mt-12 md:mt-0">
          <ul className="space-y-6">
            {details.map((d) => {
              const Icon = d.icon;
              const content = (
                <div className="flex items-start gap-4 group">
                  <Icon className="w-5 h-5 text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="eyebrow text-muted-foreground mb-1">{d.label}</p>
                    <p className="mono text-sm md:text-base whitespace-pre-line group-hover:text-accent transition-colors">
                      {d.value}
                    </p>
                  </div>
                </div>
              );
              return (
                <li key={d.label}>
                  {d.href ? <a href={d.href}>{content}</a> : content}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <footer className="relative mt-32 pt-8 border-t border-border grid grid-cols-12 gap-4 mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <p className="col-span-12 md:col-span-4">© Vitali Tsernosev — MMXXVI</p>
        <p className="col-span-6 md:col-span-4 md:text-center">vett.biz / portfolio</p>
        <p className="col-span-6 md:col-span-4 text-right">Palo Alto · 37.4°N</p>
      </footer>
    </section>
  );
};
