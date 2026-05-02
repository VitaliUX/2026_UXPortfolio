import { motion } from "framer-motion";
import portrait from "@/assets/portrait.jpg";

const stats = [
  { value: "16", label: "Years in UX/UI" },
  { value: "07", label: "Years on Mobile" },
  { value: "11", label: "Years in Silicon Valley" },
  { value: "70+", label: "Icons in Broadsoft Set" },
];

const stack = [
  "Figma", "Sketch", "Principle", "Framer",
  "HTML / CSS", "JavaScript", "React", "SVG",
  "Design Systems", "Prototyping", "Usability Testing",
];

export const About = () => {
  return (
    <section id="about" className="px-6 md:px-10 py-24 md:py-32 bg-cream-deep border-y border-border">
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="col-span-12 md:col-span-5 md:sticky md:top-28 self-start"
        >
          <div className="aspect-[4/5] overflow-hidden border border-border relative group">
            <img
              src={portrait}
              alt="Vitali Tsernosev"
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
              <p className="eyebrow text-accent">// 0xVT</p>
              <p className="mono text-sm mt-1">Vitali Tsernosev</p>
            </div>
          </div>
        </motion.div>

        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow text-accent mb-8">// About_Me</p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="display-serif text-4xl md:text-6xl"
          >
            Research, wireframes, visuals, <span className="text-accent">code</span>, test.
          </motion.h2>

          <div className="mt-10 space-y-5 text-foreground/80 text-base md:text-lg leading-relaxed max-w-prose">
            <p>
              For 16 years I've been working in the UX/UI field. The last 7 years
              generally focused on mobile devices — smartphones and tablets.
              I have real fun researching, analyzing user study sessions,
              wireframing, designing, and developing visual interfaces, then
              testing the products.
            </p>
            <p>
              If you're looking for a professional who can work on information
              architecture and wireframes, design, and even code — you can
              definitely contact me.
            </p>
            <p className="text-muted-foreground">
              Already 11 years I live in Silicon Valley, California. Enjoy its
              great climate, beautiful nature and allergies. During the design
              cycle at Broadsoft I produced new icons and design elements for
              the design library — a 70-icon Contact Center set, converted to
              SVG and shipped as a web font.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-cream-deep p-5">
                <p className="display-serif text-4xl md:text-5xl text-accent">{s.value}</p>
                <p className="eyebrow text-muted-foreground mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="mt-14">
            <p className="eyebrow text-muted-foreground mb-4">// Toolkit</p>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="mono text-xs border border-border px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
