"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef, createContext, useContext } from "react";
import WorkDropdown from "../components/work-dropdown";
import MobileMenu from "../components/mobile-menu";
import { caseStudies } from "../data/case-studies";

// ── Lightbox Context ────────────────────────────────────────────────

const LightboxContext = createContext<
  ((alt: string, src?: string) => void) | undefined
>(undefined);

// ── Layout ──────────────────────────────────────────────────────────

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src?: string;
  alt: string;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center p-6 cursor-zoom-out ${
        isClosing ? "animate-[fade-out_150ms_ease-in_forwards]" : "animate-[fade-in_200ms_ease-out]"
      }`}
      style={{ zIndex: 'var(--z-lightbox)' }}
      onClick={handleClose}
      onAnimationEnd={() => { if (isClosing) onClose(); }}
    >
      <button
        className="absolute top-4 right-4 p-3 text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white/60 outline-none rounded-sm"
        onClick={handleClose}
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className={`relative max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden px-6 pt-10 pb-6 ${
          isClosing ? "animate-[scale-out_150ms_ease-in_forwards]" : "animate-[scale-in_200ms_ease-out]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {src ? (
          <img src={src} alt={alt} className="max-w-full max-h-[80vh] object-contain mx-auto block" />
        ) : (
          <div className="w-[80vw] h-[60vh] flex items-center justify-center text-[var(--muted)]">
            {alt}
          </div>
        )}
      </div>
    </div>
  );
}

export function CaseStudyLayout({
  breadcrumb,
  title,
  description,
  meta,
  sections,
  nextProject,
  heroContent,
  children,
}: {
  breadcrumb: string;
  title: string;
  description: string;
  meta: { label: string; value: string }[];
  sections: { id: string; label: string }[];
  nextProject?: { slug: string; title: string };
  heroContent?: React.ReactNode | null;
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "overview");
  const [showTitle, setShowTitle] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [lightboxImage, setLightboxImage] = useState<{ alt: string; src?: string } | null>(null);

  const openLightbox = useCallback((alt: string, src?: string) => {
    setLightboxImage({ alt, src });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowTitle(y > 200);
      if (y < 100) {
        setNavVisible(true);
      } else if (y < lastScrollY.current) {
        setNavVisible(true);
      } else if (y > lastScrollY.current + 10) {
        setNavVisible(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LightboxContext.Provider value={openLightbox}>
      <div className="min-h-screen">
        {/* Lightbox */}
        {lightboxImage && (
          <Lightbox
            alt={lightboxImage.alt}
            src={lightboxImage.src}
            onClose={closeLightbox}
          />
        )}

        {/* Top Navigation */}
        <nav
          aria-label="Case study navigation"
          className={`sticky top-0 backdrop-blur-md transition-transform duration-300 relative ${
            navVisible ? "translate-y-0" : "-translate-y-full"
          }`}
          style={{ zIndex: 'var(--z-nav)', transitionTimingFunction: 'var(--ease-out-quart)', backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)" }}
        >
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
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className={`hidden sm:block text-[14px] font-medium transition-[opacity,transform] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm ${
                showTitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ transitionTimingFunction: 'var(--ease-out-quart)' }}
            >
              {title.replace(/\.$/, "")}
            </button>
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

        {/* Sticky Left Nav */}
        <aside className="hidden xl:block fixed left-8 top-[11.5rem] w-36">
          <ul className="space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`text-[13px] block py-1 transition-[color,opacity,transform,font-weight] duration-300 focus-visible:ring-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm ${
                    activeSection === section.id
                      ? "text-[var(--foreground)] font-medium translate-x-1.5 opacity-100"
                      : "text-[var(--muted)] link-hover opacity-60 hover:opacity-100"
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="max-w-[800px] mx-auto px-6 pt-8 sm:pt-20 pb-16">
          {/* Hero */}
          <header className="pb-10">
            <div className="text-[12px] text-[var(--muted)] mb-6">
              {breadcrumb}
            </div>

            <h1 className="text-[36px] sm:text-[44px] font-medium leading-[1.1] tracking-[-0.02em] mb-6">
              {title}
            </h1>

            <p className="text-[16px] leading-relaxed text-[var(--muted)] mb-8">
              {description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-[13px]">
              {meta.map((item) => (
                <div key={item.label}>
                  <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--muted)] mb-2 font-mono">
                    {item.label}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>
          </header>

          {/* Hero content area */}
          {heroContent !== null &&
            (heroContent !== undefined ? (
              heroContent
            ) : (
              <ImageBlock alt="Product hero image — phone mockup" />
            ))}

          {/* Page content (sections) */}
          {children}

          {/* Footer Navigation */}
          <footer className="py-10 mt-4 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-[14px] text-[var(--muted)] link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
              >
                ← All projects
              </Link>
              {nextProject && (
                <Link
                  href={`/case-study/${nextProject.slug}`}
                  className="text-[14px] text-[var(--muted)] link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
                >
                  Next project →
                </Link>
              )}
            </div>
          </footer>
        </main>

        {/* Site Footer */}
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
              <Link href="/Andrea-Vollendorf-Resume-2026.pdf" target="_blank" rel="noopener noreferrer" className="link-hover transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm">Resume</Link>
            </div>
          </div>
        </footer>
      </div>
    </LightboxContext.Provider>
  );
}

// ── Content Components ──────────────────────────────────────────────

export function Section({
  id,
  sectionTitle,
  chapterTitle,
  subtitle,
  children,
}: {
  id: string;
  sectionTitle: string;
  chapterTitle: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-5 font-mono">
        {sectionTitle}
      </div>
      {chapterTitle && (
        <h2 className="text-[26px] sm:text-[32px] font-medium leading-[1.2] tracking-[-0.01em] mb-4">
          {chapterTitle}
        </h2>
      )}
      {subtitle && (
        <p className="text-[15px] font-medium text-[var(--foreground)] mb-6">
          {subtitle}
        </p>
      )}
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-[1.75] text-[var(--muted)]">
      {children}
    </p>
  );
}

export function ImageBlock({
  alt,
  caption,
  src,
  contained,
  flush,
  maxWidth,
}: {
  src?: string;
  alt: string;
  caption?: string;
  contained?: boolean;
  flush?: boolean;
  maxWidth?: string;
}) {
  const openLightbox = useContext(LightboxContext);

  const isWhiteBox = contained || flush;
  const containerClass = isWhiteBox
    ? `flex items-center justify-center rounded-xl bg-[var(--surface)] ${flush ? "" : `px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 sm:h-[380px]`}`
    : "bg-[var(--surface)]";

  return (
    <figure className="my-8">
      <div
        className={`relative rounded-lg overflow-hidden ${containerClass} ${src ? "cursor-zoom-in" : ""} transition-opacity img-hover`}
        style={{}}
        {...(src ? {
          role: "button",
          tabIndex: 0,
          onClick: () => openLightbox?.(alt, src),
          onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox?.(alt, src); } },
        } : {})}
      >
        {src ? (
          <img src={src} alt={alt} loading="lazy" decoding="async" className={`block ${flush ? "w-full" : isWhiteBox ? "max-h-full object-contain" : "w-full"}`} style={maxWidth ? { maxWidth } : undefined} />
        ) : (
          <div className="aspect-[16/10] flex items-center justify-center text-[var(--muted)] text-sm">
            {alt}
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="text-[13px] text-[var(--muted)] mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function TwoImages({
  images,
}: {
  images: { src?: string; alt: string; caption?: string }[];
}) {
  const openLightbox = useContext(LightboxContext);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
      {images.map((img, i) => (
        <figure key={i}>
          <div
            className={`relative rounded-lg overflow-hidden bg-[var(--surface)] ${img.src ? "cursor-zoom-in" : ""} transition-opacity img-hover`}
            {...(img.src ? {
              role: "button",
              tabIndex: 0,
              onClick: () => openLightbox?.(img.alt, img.src),
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox?.(img.alt, img.src); } },
            } : {})}
          >
            {img.src ? (
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full block" />
            ) : (
              <div className="aspect-[4/3] flex items-center justify-center text-[var(--muted)] text-sm">
                {img.alt}
              </div>
            )}
          </div>
          {img.caption && (
            <figcaption className="text-[13px] text-[var(--muted)] mt-2">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function KeyGaps({ gaps }: { gaps: { description: string }[] }) {
  return (
    <div className="my-8">
      <div className="text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] mb-4 font-mono">
        Key Gaps
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {gaps.map((gap, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-[var(--muted)] mt-0.5">→</span>
            <span className="text-[14px] leading-relaxed">{gap.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WhatWorked({
  worked,
  didnt,
}: {
  worked: string[];
  didnt: string[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-8">
      <div>
        <div className="text-[11px] uppercase tracking-[0.1em] text-emerald-600 mb-4 font-mono">
          What Worked
        </div>
        <ul className="space-y-3">
          {worked.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px]">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-[0.1em] text-rose-500 mb-4 font-mono">
          What Didn&apos;t
        </div>
        <ul className="space-y-3">
          {didnt.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14px]">
              <span className="text-rose-400 mt-0.5">✗</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 p-6 bg-[var(--surface)] rounded-lg shadow-[0_0_0_1px_var(--border)]">
      <p className="text-[15px] leading-relaxed">{children}</p>
    </div>
  );
}

export function LearningItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 py-8 border-t border-[var(--border)]">
      <h3 className="text-[15px] font-medium">{title}</h3>
      <p className="text-[14px] leading-relaxed text-[var(--muted)]">{children}</p>
    </div>
  );
}

// ── New Components ──────────────────────────────────────────────────

export function Stats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-8 my-8">
      {stats.map((stat, i) => (
        <div key={i}>
          <div className="text-[28px] font-medium tracking-[-0.02em] mb-1 tabular-nums">
            {stat.value}
          </div>
          <div className="text-[13px] leading-relaxed text-[var(--muted)]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Quote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution: string;
}) {
  return (
    <blockquote className="my-8 border-l-2 border-[var(--border)] pl-6 py-1">
      <p className="text-[15px] leading-[1.75] italic text-[var(--foreground)]">
        &ldquo;{children}&rdquo;
      </p>
      <cite className="block mt-3 text-[13px] text-[var(--muted)] not-italic">
        — {attribution}
      </cite>
    </blockquote>
  );
}

export function ImageCarousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div
      className="my-8 -mx-6 overflow-x-auto scrollbar-hide"
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div className="flex gap-4 px-6" style={{ width: "max-content" }}>
        {images.map((img, i) => (
          <div
            key={i}
            className="w-[320px] sm:w-[400px] flex-shrink-0 rounded-lg overflow-hidden bg-[var(--surface)]"
          >
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full block" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function VideoBlock({
  src,
  poster,
  alt,
  caption,
}: {
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="flex justify-center px-6 py-8 rounded-xl bg-[var(--surface)]">
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
          className="w-full block rounded-lg"
        />
      </div>
      {caption && (
        <figcaption className="text-[13px] text-[var(--muted)] mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function TeamMember({
  name,
  role,
  children,
}: {
  name: string;
  role: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-6 border-t border-[var(--border)] first:border-t sm:[&:nth-child(2)]:border-t">
      <div className="text-[15px] font-medium">{name}</div>
      <div className="text-[13px] text-[var(--muted)] mb-2">{role}</div>
      <p className="text-[14px] leading-relaxed text-[var(--muted)]">{children}</p>
    </div>
  );
}
