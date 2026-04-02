import Link from "next/link";
import NavBar from "./components/nav-bar";
import ProjectCarousel from "./components/project-carousel";
import TestimonialCard from "./components/testimonial-card";


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
    coverImages: [{ src: "/images/theoremreach/hero-light.png" }],
  },
  {
    slug: "userwise",
    title: "Userwise",
    description: "Campaign content builder",
    company: "Userwise",
    year: "2021",
    coverDate: "2021",
    coverImages: [{ src: "/images/userwise/hero.png" }],
    hasCaseStudy: true,
  },
  {
    slug: "theoremreach",
    title: "Theorem Reach",
    description: "Strategy breakdown tool",
    company: "TheoremReach",
    year: "2021",
    coverDate: "September 2021",
    coverImages: [{ src: "/images/theoremreach/hero-2.png" }],
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
      <NavBar />

      {/* Hero */}
      <header className="px-6 lg:px-20 pt-8 pb-8 sm:pt-16 sm:pb-14 mx-auto">
        <div className="max-w-[700px]">
          <h1 className="text-[28px] sm:text-[36px] leading-[1.2] tracking-[-0.01em] font-[500] text-[rgba(0,0,0,.85)] mb-4">
          Complex systems tend to fail the people who need them most.
          </h1>
          <p className="text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-6 sm:mb-8">
          I&apos;m Andrea, a product design leader on the coast of Maine. I&apos;ve spent 14 years designing for the complex, regulated, invisible stuff - the systems that sit between people and the things they actually need. I bring strong craft, clear judgment, and strategic direction to work that usually doesn&apos;t get any of it.</p>
        </div>
      </header>

      {/* Projects */}
      <section id="projects" className="pb-20">
        <div className="px-6 lg:px-20 mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
              Selected Work
            </span>
            <div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" />
          </div>
        </div>
        <ProjectCarousel projects={projects} />
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-20 pb-20 mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            From Colleagues
          </span>
          <div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              quote: "Andrea is the best design leader I\u2019ve worked with in my entire career. Not even close. She\u2019s an insanely sharp systems thinker\u2009\u2014\u2009when things get messy, she steps back, sees the whole system clearly, and simplifies it into something the team can actually act on. She brings a level of kindness, joy and care that is uncommon.",
              name: "Shaun Tan",
              role: "Product Designer, Proof",
              photo: "/images/testimonials/shaun.jpeg",
              gif: "/images/testimonials/office.gif",
            },
            {
              quote: "She has a knack for communicating and articulating new ideas to clients and stakeholders clearly, and she\u2019s able to handle any type of feedback and untangle conflict with ease. She has the gift of building trust quickly and has no hesitation in taking the lead. Her passion for design, people, and making an impact are the driving factors to help her achieve anything she sets her mind to.",
              name: "Kevin Bhagat",
              role: "Product Design Director, Heyo",
              photo: "/images/testimonials/kevin.jpeg",
              gif: "/images/testimonials/kevin-reaction.gif",
            },
            {
              quote: "Andrea seamlessly unites teams and stakeholders, solves complex problems with simple and elegant solutions, and builds scalable design systems. She combines a collaborative approach with methodical research and product thinking to create intuitive and impactful designs. Andrea leads by example\u2009\u2014\u2009one of empathy and dedication to continuous growth.",
              name: "Esther Chung",
              role: "Principal Product Designer, Sesame",
              photo: "/images/testimonials/esther.jpeg",
              gif: "/images/testimonials/esther-reaction.gif",
            },
          ].map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="px-6 lg:px-20 py-8 border-t border-[var(--border)] mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[12px] text-[rgba(0,0,0,.5)]">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Next.js</Link>
            ,{" "}
            <Link href="https://agentation.dev/" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Agentation</Link>
            {" & "}
            <Link href="https://claude.ai/code" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" target="_blank" rel="noopener noreferrer">Claude Code</Link>
          </p>
          <div className="flex items-center gap-3">
            <Link href="https://x.com/AndreaLobster" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="X (Twitter)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </Link>
            <Link href="https://linkedin.com/in/andrea-vollendorf" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </Link>
            <Link href="https://github.com/andreavollendorf" target="_blank" rel="noopener noreferrer" className="text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.8)] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
