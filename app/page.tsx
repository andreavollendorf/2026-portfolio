import Link from "next/link";
import ThemeToggle from "./components/theme-toggle";
import ProjectCarousel from "./components/project-carousel";


const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrea-vollendorf" },
  { label: "Resume", href: "https://www.dropbox.com/scl/fi/s15ylrn1qsom928kebdj4/andrea-vollendorf-resume.pdf?" },
];

const projects = [
  {
    slug: "theoremreach",
    title: "Theorem Reach",
    description: "Strategy breakdown tool",
    company: "TheoremReach",
    year: "2021",
    coverDate: "September 2021",
    coverImages: [{ src: "/images/theoremreach/hero-light.png" }],
  },
  {
    slug: "proof-serves",
    title: "Proof Serves",
    description: "Client experience redesign",
    company: "PROOF",
    year: "2025",
    coverDate: "November 2025",
    coverImages: [{ src: "/images/proof-serves/hero-light.png" }],
  },
  {
    slug: "easy-a",
    title: "EasyA",
    description: "Web3 education app",
    company: "EasyA",
    year: "2023",
    coverDate: "2023",
    coverImages: [{ src: "/images/easy-a/hero.png" }],
  },
  {
    slug: "proof-ops",
    title: "Proof Ops",
    description: "Operations task management",
    company: "Proof",
    year: "2025",
    coverDate: "2025",
    coverImages: [{ src: "/images/proof-ops/hero-light.png" }],
  },
  {
    slug: "userwise",
    title: "Userwise",
    description: "Liveops platform",
    company: "Userwise",
    year: "2021",
    coverDate: "2021",
    coverImages: [{ src: "/images/userwise/hero-light.png" }],
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
    slug: "treecard",
    title: "Treecard Banking",
    description: "0\u21921 banking flows",
    company: "Treecard",
    year: "2022",
    coverDate: "2022",
    coverImages: [{ src: "/images/treecard/hero.png" }],
  },
  {
    slug: "storymaster",
    title: "Storymaster",
    description: "AI-driven language learning app",
    company: "Storymaster",
    year: "2022",
    coverDate: "2022",
    coverImages: [{ src: "/images/storymaster/hero.png" }],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav aria-label="Main navigation">
        <div className="flex items-center justify-between px-6 py-5 max-w-[1200px] mx-auto">
            <Link href="/" className="text-[15px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">
              Andrea Vollendorf
            </Link>
            <ThemeToggle />
          </div>
      </nav>

      {/* Hero */}
      <header className="px-6 pt-16 pb-24 max-w-[1200px] mx-auto">
        <div className="max-w-[720px]">
          <h1 className="text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium mb-8">
          Designing structure for complex work.
          </h1>
          <p className="text-[16px] leading-[1.7] text-[var(--muted)] mb-12">
          I’m Andrea, a product designer based in coastal Maine, with 14+ years of experience designing highly constrained, nuanced systems with strong UX judgment and a high bar for craft.

I specialize in regulated, edge-case-heavy workflows, shaping messy requirements into intentional, durable interfaces that hold up in the real world.
          </p>
          <div className="flex gap-3 text-[14px]">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  relative inline-flex items-center justify-center h-8 px-4 py-1.5 rounded-lg text-[13px] font-medium btn-hover active:scale-[0.98] transition-[filter,transform] duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none
                  ${link.label === "LinkedIn" || link.label === "Resume" ? "group" : ""}
                `}
                style={{
                  background: "linear-gradient(#ffdd73 0%, #ffbe25 100%)",
                  color: "#171717",
                  boxShadow: "inset 0 0 1px 1px rgba(255,255,255,0.14), 0 0 0 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.04), 0 0 0 1px #ffbe25",
                }}
              >
                {link.label === "LinkedIn" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none select-none w-[200px] h-[120px]">
                    {/* LinkedIn profile card */}
                    <img
                      src="/linkedin-profile.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[160px] opacity-0 spring-hover-left group-focus-visible:animate-[spring-up-left_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
                    />
                    {/* LinkedIn logo */}
                    <img
                      src="/linkedin-logo.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[70px] opacity-0 spring-hover-right group-focus-visible:animate-[spring-up-right_0.35s_cubic-bezier(0.34,1.56,0.64,1)_0.04s_forwards]"
                      style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.08))' }}
                    />
                  </div>
                )}
                {link.label === "Resume" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none select-none w-[200px] h-[120px]">
                    {/* Resume preview - on the right */}
                    <img
                      src="/resume-preview.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[160px] opacity-0 spring-hover-right-card group-focus-visible:animate-[spring-up-right-card_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
                    />
                    {/* Dropbox logo - on the left, on top */}
                    <img
                      src="/dropbox-logo.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[70px] opacity-0 spring-hover-left-logo group-focus-visible:animate-[spring-up-left-logo_0.35s_cubic-bezier(0.34,1.56,0.64,1)_0.04s_forwards]"
                      style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.08))' }}
                    />
                  </div>
                )}
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Projects */}
      <section id="projects" className="pb-32">
        <div className="px-6 max-w-[1200px] mx-auto">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal">
            Selected Work
          </h2>
        </div>
        <ProjectCarousel projects={projects} />
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[var(--border)] max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[13px] text-[var(--muted)]">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Next.js</Link>
            ,{" "}
            <Link href="https://agentation.dev/" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Agentation</Link>
            {" & "}
            <Link href="https://claude.ai/code" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Claude Code</Link>
          </p>
          <p>
            Made in Maine
          </p>
        </div>
      </footer>
    </div>
  );
}
