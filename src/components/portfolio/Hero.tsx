import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-16 px-6 md:px-10 flex flex-col justify-between overflow-hidden">
      {/* subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      {/* glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative grid grid-cols-12 gap-4 items-end flex-1">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-3 hidden md:block"
        >
          <p className="eyebrow text-accent">// INIT</p>
          <p className="mt-4 text-sm text-muted-foreground max-w-[20ch] leading-relaxed">
            Mobile & Web UX Designer / UI Engineer based in Palo Alto, CA.
          </p>
        </motion.div>

        <div className="col-span-12 md:col-span-9">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <p className="eyebrow text-muted-foreground mb-6 md:hidden">// Vitali Tsernosev</p>
            <h1 className="display-serif text-[16vw] md:text-[11vw] leading-[0.88]">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">Designing</span>
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">interfaces<span className="text-accent">,</span></span>
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block overflow-hidden"
              >
                <span className="block">shipping <span className="text-accent">code</span>.</span>
              </motion.span>
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        className="relative grid grid-cols-12 gap-4 items-end mt-12 pt-8 border-t border-border"
      >
        <div className="col-span-12 md:col-span-5">
          <p className="eyebrow text-muted-foreground mb-3">// About</p>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed max-w-md">
            16 years in UX/UI. The last 7 focused on mobile —
            smartphones, tablets, contact-center platforms.
            Research, wireframes, visuals, and the code to ship them.
          </p>
        </div>
        <div className="col-span-6 md:col-span-3 md:col-start-7">
          <p className="eyebrow text-muted-foreground mb-3">// Based</p>
          <p className="mono text-sm">Palo Alto<br/>California, USA</p>
        </div>
        <div className="col-span-6 md:col-span-3">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 mono text-xs uppercase tracking-widest text-accent border border-accent px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            View Portfolio
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
