import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContentBlock, ProjectSection } from "../../data/projectData";

/* ───────────────────────────── Lightbox ───────────────────────────── */
const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
    onClick={onClose}
  >
    <img
      src={src}
      alt={alt}
      className="max-h-[90vh] max-w-[90vw] object-contain"
    />
  </motion.div>
);

/* ───────────────────────── Horizontal Gallery ───────────────────────── */
type GalleryBlock = Extract<ContentBlock, { type: "gallery" }>;

const HorizontalGallery = ({
  block,
  onImageClick,
}: {
  block: GalleryBlock;
  onImageClick: (src: string, alt: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = block.images.length;

  const scrollTo = useCallback(
    (index: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(index, total - 1));
      const child = el.children[clamped] as HTMLElement;
      if (child) {
        el.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
        setCurrent(clamped);
      }
    },
    [total],
  );

  // Track scroll position to update counter
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.clientWidth / 2 - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setCurrent(closest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") scrollTo(current + 1);
      if (e.key === "ArrowLeft") scrollTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, scrollTo]);

  return (
    <div className="my-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl text-foreground/90 font-semibold uppercase tracking-wide">
          {block.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="mono text-xs text-muted-foreground tabular-nums">
            {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={() => scrollTo(current - 1)}
            disabled={current === 0}
            className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent disabled:opacity-20 disabled:cursor-default transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            disabled={current === total - 1}
            className="w-8 h-8 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-accent disabled:opacity-20 disabled:cursor-default transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {block.images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
            className="flex-none snap-center cursor-zoom-in"
            style={{ width: "min(85vw, 900px)" }}
            onClick={() => onImageClick(img.src, img.alt)}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-auto max-h-[65vh] object-contain transition-transform duration-500 hover:scale-[1.01]"
            />
          </motion.div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {block.images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-accent" : "w-1.5 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

/* ───────────────────────────── Block Renderer ───────────────────────────── */
const BlockRenderer = ({ block, onImageClick }: { block: ContentBlock; onImageClick: (src: string, alt: string) => void }) => {
  switch (block.type) {
    case "h1":
      return (
        <h1 className="display-serif text-4xl md:text-5xl lg:text-6xl mb-8">
          {block.text}
        </h1>
      );
    case "h3":
      return (
        <h3 className="text-xl md:text-2xl text-foreground/90 font-semibold uppercase tracking-wide mt-12 mb-4">
          {block.text}
        </h3>
      );
    case "mark":
      return (
        <h5 className="text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground/80 mt-8 mb-3">
          {block.text}
        </h5>
      );
    case "p":
      return (
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 max-w-prose">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="list-disc list-inside space-y-2 mb-6 text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "toolbar":
      return (
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 mt-8 mb-6">
          {block.items.map((item) => (
            <div key={item.label} className="text-sm">
              <span className="eyebrow text-accent text-[10px]">{item.label}</span>
              <span className="block text-muted-foreground mt-1">{item.value}</span>
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="my-8 cursor-zoom-in"
          onClick={() => onImageClick(block.src, block.alt)}
        >
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full h-auto"
          />
        </motion.div>
      );
    case "video":
      return (
        <div className="my-8">
          <video
            controls
            poster={block.poster}
            className="w-full h-auto"
          >
            <source src={block.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    case "gallery":
      return <HorizontalGallery block={block} onImageClick={onImageClick} />;

    default:
      return null;
  }
};

/* ───────────────────────────── Section Wrapper ───────────────────────────── */
const Section = ({ section, index, fillViewport }: { section: ProjectSection; index: number; fillViewport?: boolean }) => {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      {lightbox && (
        <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={
          fillViewport
            ? "px-6 md:px-10 lg:px-16 py-6 flex flex-col justify-center h-full"
            : `px-6 md:px-10 lg:px-16 py-16 md:py-24 ${index % 2 === 0 ? "" : "border-t border-border/30"}`
        }
      >
        <div className={fillViewport ? "w-full max-w-6xl mx-auto" : "max-w-4xl mx-auto"}>
          {section.blocks.map((block, i) => (
            <BlockRenderer
              key={i}
              block={block}
              onImageClick={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </motion.section>
    </>
  );
};

/* ───────────────────────────── Main Layout ───────────────────────────── */
export const CaseStudyLayout = ({ sections }: { sections: ProjectSection[] }) => {
  // Detect gallery-only pages: single section with only a gallery block
  const isGalleryOnly =
    sections.length === 1 &&
    sections[0].blocks.length === 1 &&
    sections[0].blocks[0].type === "gallery";

  return (
    <div className={`w-full h-full ${isGalleryOnly ? "overflow-hidden" : "overflow-y-auto"}`}>
      {sections.map((section, i) => (
        <Section key={i} section={section} index={i} fillViewport={isGalleryOnly} />
      ))}
    </div>
  );
};

