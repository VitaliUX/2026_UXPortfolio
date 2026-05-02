import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Work } from "@/components/portfolio/Work";
import { About } from "@/components/portfolio/About";
import { Services } from "@/components/portfolio/Services";
import { Contact } from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Work />
      <About />
      <Services />
      <Contact />
    </main>
  );
};

export default Index;
