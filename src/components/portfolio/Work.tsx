import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import work1 from "@/assets/extr.png";
import work2 from "@/assets/img/ac_vd4.png";
import work3 from "@/assets/img/cisco_preview.jpg";
import work4 from "@/assets/img/portfolios/kollective/1a.png";
import work5 from "@/assets/img/yuzu_preview.png";
import work6 from "@/assets/img/yp_preview.png";
import work7 from "@/assets/img/ss_preview.png";

type Project = {
  num: string;
  title: string;
  role: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  span: string;
  ratio: string;
  link: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Extreme Networks",
    role: "Sr UX/UI Engineer",
    year: "2020 — 2026",
    description:
      "Conversational engagement software thatlets brands orchestrate campaigns and proactively engage consumers across voice, messaging, and email.",
    tags: ["SaaS", "Enterprise", "Data Viz"],
    image: work1,
    span: "md:col-span-7",
    ratio: "aspect-[4/5]",
    link: "extreme",
  },
  {
    num: "02",
    title: "Acqueon",
    role: "Lead UX/UI Designer",
    year: "2020",
    description:
      "Conversational engagement software that lets brands orchestrate campaigns and proactively engage consumers across voice, messaging, and email.",
    tags: ["SaaS", "Enterprise", "Data Viz"],
    image: work2,
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
    link: "acqueon",
  },
  {
    num: "03",
    title: "Cisco / Broadsoft",
    role: "UX Designer / UI Engineer",
    year: "2018 — 2022",
    description:
      "Cisco Webex Contact Center — designed and built from the ground up as a cloud solution. Delivered a 70-icon set converted to an iconic web font.",
    tags: ["Contact Center", "Cloud", "Iconography"],
    image: work3,
    span: "md:col-span-5",
    ratio: "aspect-square",
    link: "cisco2",
  },
  {
    num: "04",
    title: "Kollective Technology",
    role: "UX/UI Designer",
    year: "2017",
    description:
      "Network Administration Tool for an enterprise content delivery platform — making bandwidth-hungry content efficient at the network edge.",
    tags: ["Admin Tool", "Network", "Dashboard"],
    image: work4,
    span: "md:col-span-7",
    ratio: "aspect-[4/5]",
    link: "kollective",
  },
  {
    num: "05",
    title: "Yuzu — Barnes & Noble",
    role: "Mobile UX Designer",
    year: "2015 — 2016",
    description:
      "Next-generation reading and note-taking eReader. A learning platform that lets students build a personal experience around digital course materials.",
    tags: ["Mobile", "eReader", "Education"],
    image: work5,
    span: "md:col-span-6",
    ratio: "aspect-square",
    link: "yuzu",
  },
  {
    num: "06",
    title: "YP Holdings",
    role: "Senior UX/UI Designer",
    year: "2013 — 2015",
    description:
      "YP app and yp.com — flagship consumer brands used by ~70M monthly visitors. Local search, display advertising, and direct marketing solutions.",
    tags: ["Mobile App", "Local Search", "Consumer"],
    image: work6,
    span: "md:col-span-6",
    ratio: "aspect-[4/5]",
    link: "yp",
  },
  {
    num: "07",
    title: "SolutionSet (now Epsilon)",
    role: "Web/Mobile UI Designer & Developer",
    year: "2010 — 2013",
    description:
      "Web, mobile and digital marketing solutions for American Express, California Lottery, Cisco, Duke, Stanford, and TXU Energy.",
    tags: ["Agency", "Front-end", "Multi-client"],
    image: work7,
    span: "md:col-span-6",
    ratio: "aspect-square",
    link: "solutionset",
  },
];

import { Link } from "react-router-dom";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className={`col-span-12 ${project.span} group`}
  >
    <Link to={`/work/${project.link}`} className="block">
      <div className={`relative overflow-hidden bg-zinc-200 border border-border ${project.ratio}`}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-4 left-4 mono text-xs text-accent">[{project.num}]</div>
        <div className="absolute top-4 right-4 mono text-[10px] uppercase tracking-widest text-foreground/70 bg-background/40 backdrop-blur-sm px-2 py-1">
          {project.year}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="flex items-baseline gap-3">
            <h3 className="display-serif text-2xl md:text-3xl">{project.title}</h3>
            <ArrowUpRight className="w-5 h-5 shrink-0 transition-all duration-500 group-hover:rotate-45 group-hover:text-accent" />
          </div>
          <p className="eyebrow text-accent mt-2">{project.role}</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-prose">
            {project.description}
          </p>
        </div>
        <ul className="col-span-12 md:col-span-4 flex flex-wrap md:justify-end gap-2 self-start">
          {project.tags.map((t) => (
            <li key={t} className="mono text-[10px] uppercase tracking-widest border border-border px-2 py-1 text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  </motion.article>
);

export const Work = () => {
  return (
    <section id="work" className="px-6 md:px-10 py-24 md:py-32">
      <div className="grid grid-cols-12 gap-4 mb-16 md:mb-24 items-end">
        <div className="col-span-12 md:col-span-7">
          <p className="eyebrow text-accent mb-6">// Selected Work — 2010 / 2026</p>
          <h2 className="display-serif text-5xl md:text-7xl">
            Built for teams<br />shipping at scale<span className="text-accent">.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9 text-sm text-muted-foreground leading-relaxed">
          <p>
            Six projects spanning enterprise SaaS, contact center,
            education, and consumer mobile — for Cisco, Barnes & Noble,
            YP, and others.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-x-4 gap-y-20 md:gap-y-32">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};
