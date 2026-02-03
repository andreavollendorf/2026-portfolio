"use client";

import Link from "next/link";
import WorkDropdown from "../components/work-dropdown";
import MobileMenu from "../components/mobile-menu";
import { caseStudies } from "../data/case-studies";

const toolkit = [
  { name: "Figma", src: "/images/about/toolkit/figma.avif" },
  { name: "Claude", src: "/images/about/toolkit/claude.avif" },
  { name: "Linear", src: "/images/about/toolkit/linear.avif" },
  { name: "Notion", src: "/images/about/toolkit/notion.avif" },
  { name: "Framer", src: "/images/about/toolkit/framer.avif" },
  { name: "Loom", src: "/images/about/toolkit/loom.avif" },
  { name: "Arc", src: "/images/about/toolkit/arc.avif" },
  { name: "Slack", src: "/images/about/toolkit/slack.avif" },
];

const volunteering = [
  {
    category: "Pro-Bono Digital Marketing & UI/UX",
    org: "Federal Hill House",
    description:
      "Led a charity hackathon to rebrand & improve website, marketing, copy & video for Federal Hill House, serving low-income and immigrant families.",
  },
  {
    category: "Pro-Bono Product Design",
    org: "1 Million Home",
    description:
      "Volunteered design and consulting services to develop a field app for social workers at 1 Million Home, a charity focused on reuniting orphaned children with their families.",
  },
  {
    category: "All Season Giver",
    org: "Blue Hill Heritage Trust",
    description:
      "Volunteering & donating to Blue Hill Heritage Trust to preserve natural & cultural heritage through conservation & education.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav aria-label="About page navigation" className="sticky top-0 backdrop-blur-md" style={{ zIndex: "var(--z-nav)", backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)" }}>
        <Link
          href="/"
          className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 inline-flex items-center gap-2 text-[14px] text-[var(--muted)] link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor"/>
          </svg>
          <span>Index</span>
        </Link>
        <div className="flex items-center justify-between py-5 px-6">
          <div />
          <div />
          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/about" className="text-[13px] font-medium text-[var(--muted)] link-hover transition-colors h-8 px-2 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none">
              About
            </Link>
            <WorkDropdown caseStudies={caseStudies} />
          </div>
          {/* Mobile */}
          <div className="sm:hidden">
            <MobileMenu caseStudies={caseStudies} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[800px] mx-auto px-6 pt-8 sm:pt-20 pb-16">
        {/* Hero — image floated right, text fills around it */}
        <section className="pb-14 overflow-hidden">
          <img
            src="/images/about/headshot.webp"
            alt="Andrea Vollendorf"
            className="hidden sm:block float-right ml-8 mb-4 w-[38%] rounded-xl object-cover"
          />
          <h1 className="text-[22px] sm:text-[26px] font-medium leading-[1.3] tracking-[-0.01em] mb-6 [text-wrap:pretty]">
            I&apos;ve spent my career helping teams untangle complex systems and build products people can actually trust.
          </h1>
          <img
            src="/images/about/headshot.webp"
            alt="Andrea Vollendorf"
            className="sm:hidden w-full rounded-xl object-cover mb-6"
          />
          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-5">
            I care a lot about clarity. Not just visual clarity, but conceptual clarity. What&apos;s happening. What&apos;s already been tried.
          </p>
          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-5">
            My perspective on design comes from lived experience. In my early adulthood, I experienced housing insecurity and saw how quickly access disappears when systems decide your time and dignity matter less. I watched my mom struggle to apply for food assistance when her English was limited. The process was slow, confusing, and fragmented&hellip;faxing documents, making calls, waiting in lines. At the same time, I could walk into a McDonald&apos;s and order food instantly on a touchscreen without speaking to a single human.
          </p>
          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-5">
            That contrast stuck with me. It&apos;s what pulled me toward product design.
          </p>
          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-5">
            I&apos;m also a mom, which has deepened my appreciation for systems that respect people&apos;s time and cognitive load. I live in rural Maine, where access, distance, and infrastructure shape everyday life. These experiences have influenced how I think about durability, simplicity, and designing for real-world constraints.
          </p>
          <p className="text-[15px] leading-[1.75] text-[var(--muted)] mb-5">
            Today, I design systems that reduce friction, preserve context, and make progress visible. I&apos;m drawn to work where clarity builds trust and where thoughtful structure prevents errors before they happen.
          </p>
          <p className="text-[15px] leading-[1.75] text-[var(--muted)]">
            I believe good design should make things feel fairer, calmer, and easier — not just for some people, but for everyone.
          </p>
        </section>

        {/* Divider */}
        <div className="border-t border-[var(--border)]" />

        {/* More about me */}
        <section className="py-14">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal font-mono">
            More about me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: "/images/about/maine.webp", caption: "I live in beautiful coastal Maine and love a good hike." },
              { src: "/images/about/yogurt.avif", caption: "Loaded yogurt bowls are my current hyper-fixation." },
              { src: "/images/about/disney.avif", caption: "I'm not a Disney adult...I'm just an adult who really enjoys going to Disney." },
            ].map((img) => (
              <figure key={img.src} className="transition-transform duration-300 ease-out hover:-translate-y-1">
                <div className="rounded-lg overflow-hidden bg-[var(--surface)]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full block aspect-square object-cover"
                  />
                </div>
                <figcaption className="text-[13px] text-[var(--muted)] mt-3 leading-relaxed">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[var(--border)]" />

        {/* My toolkit */}
        <section className="py-14">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal font-mono">
            My toolkit
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {toolkit.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2">
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="w-full aspect-square rounded-2xl object-cover"
                />
                <span className="text-[12px] text-[var(--muted)]">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-[var(--border)]" />

        {/* Volunteering */}
        <section className="py-14">
          <h2 className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-8 font-normal font-mono">
            Volunteering
          </h2>
          <div className="space-y-0">
            {volunteering.map((item) => (
              <div
                key={item.org}
                className="grid grid-cols-1 sm:grid-cols-[160px_140px_1fr] gap-x-8 gap-y-1 py-6 border-t border-[var(--border)] first:border-t-0 first:pt-0"
              >
                <span className="text-[13px] text-[var(--muted)]">{item.category}</span>
                <span className="text-[14px] font-medium">{item.org}</span>
                <p className="text-[14px] leading-relaxed text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

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
