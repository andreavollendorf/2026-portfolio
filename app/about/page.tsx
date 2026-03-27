"use client";

import Link from "next/link";
import NavBar from "../components/nav-bar";

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
      <NavBar showBack />

      {/* Main Content */}
      <main className="max-w-[48rem] mx-auto px-6 pt-8 sm:pt-20 pb-16">
        {/* Hero — image floated right, text fills around it */}
        <section className="pb-14 overflow-hidden">
          <img
            src="/images/about/headshot.webp"
            alt="Andrea Vollendorf"
            className="hidden sm:block float-right ml-8 mb-4 w-[38%] rounded-lg object-cover"
          />
          <h1 className="text-[20px] sm:text-[24px] font-[500] leading-[1.4] tracking-[-0.01em] text-[rgba(0,0,0,.85)] mb-4 [text-wrap:pretty]">
            I&apos;ve spent my career helping teams untangle complex systems and build products people can actually trust.
          </h1>
          <img
            src="/images/about/headshot.webp"
            alt="Andrea Vollendorf"
            className="sm:hidden w-full rounded-lg object-cover mb-6"
          />
          <p className="text-[14px] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-4">
            I care a lot about clarity. Not just visual clarity, but conceptual clarity. What&apos;s happening. What&apos;s already been tried.
          </p>
          <p className="text-[14px] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-4">
            My perspective on design comes from lived experience. In my early adulthood, I experienced housing insecurity and saw how quickly access disappears when systems decide your time and dignity matter less. I watched my mom struggle to apply for food assistance when her English was limited. The process was slow, confusing, and fragmented&hellip;faxing documents, making calls, waiting in lines. At the same time, I could walk into a McDonald&apos;s and order food instantly on a touchscreen without speaking to a single human.
          </p>
          <p className="text-[14px] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-4">
            That contrast stuck with me. It&apos;s what pulled me toward product design.
          </p>
          <p className="text-[14px] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-4">
            I&apos;m also a mom, which has deepened my appreciation for systems that respect people&apos;s time and cognitive load. I live in rural Maine, where access, distance, and infrastructure shape everyday life. These experiences have influenced how I think about durability, simplicity, and designing for real-world constraints.
          </p>
          <p className="text-[14px] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-4">
            Today, I design systems that reduce friction, preserve context, and make progress visible. I&apos;m drawn to work where clarity builds trust and where thoughtful structure prevents errors before they happen.
          </p>
          <p className="text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)]">
            I believe good design should make things feel fairer, calmer, and easier — not just for some people, but for everyone.
          </p>
        </section>

        {/* More about me */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            More about me
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { src: "/images/about/maine.webp", caption: "I live in beautiful coastal Maine and love a good hike." },
              { src: "/images/about/yogurt.avif", caption: "Loaded yogurt bowls are my current hyper-fixation." },
              { src: "/images/about/disney.avif", caption: "I\u2019m not a Disney adult\u2026I\u2019m just an adult who really enjoys going to Disney." },
            ].map((img) => (
              <figure key={img.src} className="transition-transform duration-300 ease-out [@media(hover:hover)]:hover:-translate-y-1">
                <div className="rounded-lg overflow-hidden bg-[var(--surface)]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full block aspect-square object-cover"
                  />
                </div>
                <figcaption className="text-[12px] text-[rgba(0,0,0,.4)] mt-2 leading-[1.5]">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* My toolkit */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            My toolkit
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {toolkit.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2">
                <img
                  src={tool.src}
                  alt={tool.name}
                  className="w-full aspect-square rounded-2xl object-cover"
                />
                <span className="text-[12px] text-[rgba(0,0,0,.4)]">{tool.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteering */}
        <section className="pt-16">
          <div className="flex items-center gap-3 mb-6"><span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
            Volunteering
          </span><div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" /></div>
          <div className="space-y-0">
            {volunteering.map((item) => (
              <div
                key={item.org}
                className="grid grid-cols-1 sm:grid-cols-[160px_140px_1fr] gap-x-8 gap-y-1 py-6 border-t border-[var(--border)] first:border-t-0 first:pt-0"
              >
                <span className="text-[13px] text-[rgba(0,0,0,.5)]">{item.category}</span>
                <span className="text-[13px] font-[550]">{item.org}</span>
                <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

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
