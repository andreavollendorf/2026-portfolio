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
          <div className="flex items-center gap-4">
            <Link href="https://linkedin.com/in/andrea-vollendorf" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">LinkedIn</Link>
            <Link href="/Andrea-Vollendorf-Resume-2026.pdf" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">Resume</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
