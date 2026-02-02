import Link from "next/link";
import WorkDropdown from "./components/work-dropdown";
import MobileMenu from "./components/mobile-menu";
import ProjectCarousel from "./components/project-carousel";
import { caseStudies } from "./data/case-studies";


const projects = [
  {
    slug: "easy-a",
    title: "EasyA",
    description: "Web3 education app",
    company: "EasyA",
    year: "2023",
    coverDate: "2023",
    coverImages: [{ src: "/images/easy-a/hero.png" }, { src: "/images/easy-a/hero-2.png" }],
  },
  
  {
    slug: "proof-serves",
    title: "Proof Serves",
    description: "Client experience redesign",
    company: "PROOF",
    year: "2025",
    coverDate: "November 2025",
    coverImages: [{ src: "/images/proof-serves/hero-light.png" }],
    hasCaseStudy: true,
  },
  {
    slug: "theoremreach",
    title: "Theorem Reach",
    description: "Strategy breakdown tool",
    company: "TheoremReach",
    year: "2021",
    coverDate: "September 2021",
    coverImages: [{ src: "/images/theoremreach/hero-light.png" }, { src: "/images/theoremreach/hero-2.png" }],
  },
  {
    slug: "proof-ops",
    title: "Proof Ops",
    description: "Operations task management",
    company: "Proof",
    year: "2025",
    coverDate: "2025",
    coverImages: [{ src: "/images/proof-ops/hero-light.png" }],
    hasCaseStudy: true,
  },
  {
    slug: "treecard",
    title: "Treecard Banking",
    description: "0\u21921 banking flows",
    company: "Treecard",
    year: "2022",
    coverDate: "2022",
    coverImages: [{ src: "/images/treecard/hero.png" }, { src: "/images/treecard/hero-2.png" }],
  },
  {
    slug: "ikigai",
    title: "Ikigai",
    description: "Generative AI platform",
    company: "Ikigai",
    year: "2021",
    coverDate: "2021",
    coverImages: [{ src: "/images/ikigai/hero.png" }],
  },
  
  {
    slug: "storymaster",
    title: "Storymaster",
    description: "AI-driven language learning app",
    company: "Storymaster",
    year: "2022",
    coverDate: "2022",
    coverImages: [{ src: "/images/storymaster/hero.png" }, { src: "/images/storymaster/hero-2.png" }],
  },
  {
    slug: "proof-ops",
    title: "Proof Ops",
    description: "Operations task management",
    company: "Proof",
    year: "2025",
    coverDate: "2025",
    coverImages: [{ src: "/images/proof-ops/hero-2.png" }],
    hasCaseStudy: true,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav aria-label="Main navigation" className="relative z-[var(--z-nav)]">
        <div className="flex items-center justify-between px-6 py-5 mx-auto">
            <Link href="/" className="text-[15px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">
              Andrea Vollendorf
            </Link>
            {/* Desktop: hover dropdown + theme toggle */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/about" className="text-[13px] font-medium text-[var(--muted)] link-hover transition-colors h-8 px-2 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none">
                About
              </Link>
              <WorkDropdown caseStudies={caseStudies} />
            </div>
            {/* Mobile: hamburger menu */}
            <div className="sm:hidden">
              <MobileMenu caseStudies={caseStudies} />
            </div>
          </div>
      </nav>

      {/* Hero */}
      <header className="px-6 pt-8 pb-8 sm:pt-16 sm:pb-24 mx-auto">
        <div className="max-w-[720px]">
          <h1 className="text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium mb-8">
          Designing structure for complex work.
          </h1>
          <p className="text-[16px] leading-[1.7] text-[var(--muted)] mb-6 sm:mb-12">
          I’m Andrea, a product designer based in coastal Maine, with 14+ years of experience designing highly constrained, nuanced systems with strong UX judgment and a high bar for craft.

I specialize in regulated, edge-case-heavy workflows, shaping messy requirements into intentional, durable interfaces that hold up in the real world.
          </p>
        </div>
      </header>

      {/* Projects */}
      <section id="projects" className="pb-32">
        <div className="px-6 mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal">
            Selected Work
          </h2>
        </div>
        <ProjectCarousel projects={projects} />
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[var(--border)] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[13px] text-[var(--muted)]">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Next.js</Link>
            ,{" "}
            <Link href="https://agentation.dev/" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Agentation</Link>
            {" & "}
            <Link href="https://claude.ai/code" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Claude Code</Link>
          </p>
          <div className="flex items-center gap-4">
            <Link href="https://linkedin.com/in/andrea-vollendorf" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">LinkedIn</Link>
            <Link href="https://www.dropbox.com/scl/fi/s15ylrn1qsom928kebdj4/andrea-vollendorf-resume.pdf?" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
