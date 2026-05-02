import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Nav } from "../components/portfolio/Nav.tsx";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col pt-[80px]"
    >
      <Nav backMode={true} />
      
      <div className="flex-1 relative">
        {/* We load the local HTML files in an iframe to preserve their internal jQuery/RoyalSlider scripts */}
        <iframe
          src={`/mobi/folio_${id}.html`}
          className="absolute inset-0 w-full h-full border-0"
          title={`Project ${id}`}
        />
      </div>
    </motion.div>
  );
}
