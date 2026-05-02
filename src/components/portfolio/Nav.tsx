import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export const Nav = ({ backMode = false }: { backMode?: boolean }) => {
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (backMode) return; // Don't run scroll spy on secondary pages

    const handleScroll = () => {
      let current = "";
      const viewportMiddle = window.innerHeight / 3;

      for (const link of links) {
        // Strip the leading slash and hash to find the element
        const id = link.href.split('#')[1];
        if (!id) continue;

        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            current = link.href;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = links[links.length - 1].href;
      }

      if (window.scrollY < 50) {
        current = "";
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [backMode]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 backdrop-blur-md bg-background/70 border-b border-border"
    >
      <nav className="flex items-center justify-between">
        {backMode ? (
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="mono uppercase tracking-widest text-xs font-semibold">Back to Index</span>
          </button>
        ) : (
          <a href="#" className="flex items-center group text-accent">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
            >
              <g>
                <path fill="currentColor" d="M150,150h150V10H10v580c0,0,365.4,6.3,439.4,0C563,580.3,590,480.8,590,450c0-103.6,0-450,0-450H450v450 H150V150z" />
              </g>
              <g>
                <path fill="currentColor" d="M580,0v450c0,0-3.1,130-130,130H20V20h280V0H0v150v300v150h450c150,0,150-150,150-150V0H580z" />
              </g>
            </svg>
          </a>
        )}
        <ul className="hidden md:flex items-center gap-8 mono text-xs uppercase tracking-widest">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`relative group transition-colors hover:text-accent ${activeSection === l.href ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                {l.label}
                {activeSection === l.href && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 mono text-xs uppercase tracking-widest text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Available
        </a>
      </nav>
    </motion.header>
  );
};
