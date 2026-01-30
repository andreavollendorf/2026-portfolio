import Link from "next/link";
import ThemeToggle from "./components/theme-toggle";


const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/andrea-vollendorf" },
  { label: "Resume", href: "https://www.dropbox.com/scl/fi/s15ylrn1qsom928kebdj4/andrea-vollendorf-resume.pdf?" },
];

const projects = [
  {
    slug: "proof-serves",
    title: "Proof Serves",
    description: "Client experience redesign",
    company: "PROOF",
    year: "2025",
    span: "col-span-2 row-span-2",
    coverDate: "November 2025",
  },
  {
    slug: "theoremreach",
    title: "Theorem Reach",
    description: "Strategy breakdown tool",
    company: "TheoremReach",
    year: "2021",
    span: "col-span-2 row-span-1",
    coverDate: "September 2021",
  },
  {
    slug: "proof-ops",
    title: "Proof Ops",
    description: "Operations task management",
    company: "Proof",
    year: "2025",
    span: "col-span-2 row-span-2",
    coverDate: "2025",
  },
  {
    slug: "userwise",
    title: "Userwise",
    description: "Liveops platform",
    company: "Userwise",
    year: "2021",
    span: "col-span-1 row-span-2",
    coverDate: "2021",
  },
  {
    slug: "ikigai",
    title: "Ikigai",
    description: "Generative AI platform",
    company: "Ikigai",
    year: "2021",
    span: "col-span-1 row-span-2",
    coverDate: "2021",
  },
  {
    slug: "unfold",
    title: "Unfold",
    description: "Creative tools",
    company: "UNFOLD",
    year: "2023",
    span: "col-span-2 row-span-1",
    coverDate: "2023",
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    description: "Design system development",
    company: "Proof",
    year: "2024",
    span: "col-span-2 row-span-2",
    coverDate: "2024",
  },
  {
    slug: "treecard",
    title: "Treecard Banking",
    description: "0→1 banking flows",
    company: "Treecard",
    year: "2022",
    span: "col-span-1 row-span-2",
    coverDate: "2022",
  },
  {
    slug: "storymaster",
    title: "Storymaster",
    description: "AI-driven language learning app",
    company: "Storymaster",
    year: "2022",
    span: "col-span-1 row-span-2",
    coverDate: "2022",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav>
        <div className="flex items-center justify-between px-6 py-5 max-w-[1200px] mx-auto">
            <Link href="/" className="text-[15px]">
              Andrea Vollendorf
            </Link>
            <ThemeToggle />
          </div>
      </nav>

      {/* Hero */}
      <header className="px-6 pt-16 pb-24 max-w-[1200px] mx-auto">
        <div className="max-w-[720px]">
          <h1 className="text-[32px] sm:text-[40px] leading-[1.2] tracking-[-0.02em] font-medium mb-8">
          Designing systems that scale.
          </h1>
          <p className="text-[16px] leading-[1.7] text-[var(--muted)] mb-12">
          I’m Andrea, a product designer based in coastal Maine, with 14+ years of experience turning complexity into clarity.

I believe good design should make work feel lighter. Clear structure, thoughtful defaults, and calm interfaces reduce stress and help people move forward with confidence. 
          </p>
          <div className="flex gap-3 text-[14px]">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`
                  relative inline-flex items-center justify-center h-8 px-4 py-1.5 rounded-lg text-[13px] font-medium hover:brightness-105 active:scale-[0.97] transition-[filter,transform] duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] outline-none
                  ${link.label === "LinkedIn" || link.label === "Resume" ? "group" : ""}
                `}
                style={{
                  background: "linear-gradient(#ffdd73 0%, #ffbe25 100%)",
                  color: "#171717",
                  boxShadow: "inset 0 0 1px 1px #ffffff24, 0 0 0 1px #00000014, 0 2px 2px #0000000a, 0 0 0 1px #ffbe25",
                }}
              >
                {link.label === "LinkedIn" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-[200px] h-[120px]">
                    {/* LinkedIn profile card */}
                    <img
                      src="/linkedin-profile.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[160px] opacity-0 group-hover:animate-[spring-up-left_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
                    />
                    {/* LinkedIn logo */}
                    <img
                      src="/linkedin-logo.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[70px] opacity-0 group-hover:animate-[spring-up-right_0.35s_cubic-bezier(0.34,1.56,0.64,1)_0.04s_forwards]"
                      style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.08))' }}
                    />
                  </div>
                )}
                {link.label === "Resume" && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none w-[200px] h-[120px]">
                    {/* Resume preview - on the right */}
                    <img
                      src="/resume-preview.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[160px] opacity-0 group-hover:animate-[spring-up-right-card_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                      style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
                    />
                    {/* Dropbox logo - on the left, on top */}
                    <img
                      src="/dropbox-logo.webp"
                      alt=""
                      className="absolute bottom-0 left-1/2 w-[70px] opacity-0 group-hover:animate-[spring-up-left-logo_0.35s_cubic-bezier(0.34,1.56,0.64,1)_0.04s_forwards]"
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
      <section id="projects" className="px-6 pb-32 max-w-[1200px] mx-auto">
        <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal">
          Selected Work
        </h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/case-study/${project.slug}`}
              className={`group ${project.span} rounded-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)] outline-none`}
            >
              <article className="relative h-full rounded-xl overflow-hidden bg-white shadow-[0_0_0_1px_#00000014,0px_2px_2px_#0000000a] transition-[transform,box-shadow] duration-200 will-change-transform hover-hover:hover:scale-[1.01] active:scale-[0.98] flex flex-col justify-end p-5" style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}>
                <span className="text-[13px] font-medium">{project.title}</span>
                <span className="text-[11px] text-[var(--muted)] mt-1">{project.coverDate || project.year}</span>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[var(--border)] max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[13px] text-[var(--muted)]">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="hover:text-[var(--foreground)] transition-colors" target="_blank" rel="noopener noreferrer">Next.js</Link>
            ,{" "}
            <Link href="https://react.dev" className="hover:text-[var(--foreground)] transition-colors" target="_blank" rel="noopener noreferrer">React</Link>
            ,{" "}
            <Link href="https://agentation.dev/" className="hover:text-[var(--foreground)] transition-colors" target="_blank" rel="noopener noreferrer">Agentation</Link>
            {" & "}
            <Link href="https://claude.ai/code" className="hover:text-[var(--foreground)] transition-colors" target="_blank" rel="noopener noreferrer">Claude Code</Link>
          </p>
          <p>
            Made in Maine
          </p>
        </div>
      </footer>
    </div>
  );
}
