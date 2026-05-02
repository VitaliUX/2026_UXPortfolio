import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Nav } from "../components/portfolio/Nav.tsx";
import { CaseStudyLayout } from "../components/portfolio/CaseStudyLayout.tsx";
import projectDataMap from "../data/projectData.ts";

/* ─── Horizontal Page Loader (NProgress-style) ─── */
const PageLoader = () => {
  const [phase, setPhase] = useState<"trickle" | "complete" | "done">("trickle");

  useEffect(() => {
    // Trickle to ~80% quickly, then snap to 100% and fade out
    const t1 = setTimeout(() => setPhase("complete"), 600);
    const t2 = setTimeout(() => setPhase("done"), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div className="fixed top-[71px] left-0 right-0 z-[300] h-[3px] pointer-events-none">
      <motion.div
        className="h-full bg-accent"
        initial={{ width: "0%" }}
        animate={{
          width: phase === "trickle" ? "80%" : "100%",
          opacity: phase === "complete" ? 0 : 1,
        }}
        transition={
          phase === "trickle"
            ? { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            : { duration: 0.3, ease: "easeOut" }
        }
      />
    </div>
  );
};

export default function ProjectView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle escape key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const projectData = id ? projectDataMap[id] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-[80px]"
    >
      <AnimatePresence>
        <PageLoader key={id} />
      </AnimatePresence>

      <Nav backMode={true} />
      
      <div className="flex-1 relative overflow-hidden">
        {projectData ? (
          <CaseStudyLayout sections={projectData.sections} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Project not found.
          </div>
        )}
      </div>
    </motion.div>
  );
}
