"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef, createContext, useContext } from "react";
import NavBar from "../components/nav-bar";


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
        className={`relative max-w-[90vw] max-h-[90vh] overflow-hidden ${
          isClosing ? "animate-[scale-out_150ms_ease-in_forwards]" : "animate-[scale-in_200ms_ease-out]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {src ? (
          <img src={src} alt={alt} className="max-w-full max-h-[80vh] object-contain mx-auto block" />
        ) : (
          <div className="w-[80vw] h-[60vh] flex items-center justify-center text-[rgba(0,0,0,.5)]">
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
  description: React.ReactNode;
  meta: { label: string; value: string }[];
  sections: { id: string; label: string }[];
  nextProject?: { slug: string; title: string };
  heroContent?: React.ReactNode | null;
  children: React.ReactNode;
}) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id ?? "overview");
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
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

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
        <NavBar showBack scrollTitle={title} />

        {/* Sticky Left Nav — vertical track with sliding indicator */}
        <SideNav sections={sections} activeSection={activeSection} />

        {/* Main Content */}
        <main className="max-w-[48rem] mx-auto px-6 pt-8 sm:pt-20 pb-16">
          {/* Hero */}
          <header className="pb-8">
            <div className="text-[10px] uppercase tracking-[.04em] text-[rgba(0,0,0,.3)] font-[500] mb-3">
              {breadcrumb}
            </div>

            <h1 className="text-[28px] sm:text-[32px] font-[500] leading-[1.15] tracking-[-0.01em] text-[rgba(0,0,0,.85)] mb-4">
              {title}
            </h1>

            <p className="text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)] mb-0">
              {description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-6 pt-5 border-t border-[rgba(0,0,0,.06)]">
              {meta.map((item) => (
                <div key={item.label}>
                  <div className="text-[10px] uppercase tracking-[.04em] text-[rgba(0,0,0,.3)] font-[500] mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-[13px] font-[450] whitespace-pre-line leading-[1.45] text-[rgba(0,0,0,.65)]">{item.value}</div>
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
          <footer className="py-8 mt-8 border-t border-[var(--border)]">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-[12px] text-[rgba(0,0,0,.55)] link-hover press-scale touch-hitbox transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
              >
                ← All projects
              </Link>
              {nextProject && (
                <Link
                  href={`/case-study/${nextProject.slug}`}
                  className="text-[12px] text-[rgba(0,0,0,.55)] link-hover press-scale touch-hitbox transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
                >
                  Next project →
                </Link>
              )}
            </div>
          </footer>
        </main>

        {/* Site Footer */}
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
    </LightboxContext.Provider>
  );
}

// ── Content Components ──────────────────────────────────────────────

function SideNav({ sections, activeSection }: { sections: { id: string; label: string }[]; activeSection: string }) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = sections.findIndex(s => s.id === activeSection);
    const item = itemRefs.current[idx];
    const list = listRef.current;
    const ind = indicatorRef.current;
    if (!item || !list || !ind) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const y = itemRect.top - listRect.top;
    const centerY = y + (itemRect.height - 12) / 2;

    ind.style.transform = `translateY(${centerY}px)`;
  }, [activeSection, sections]);

  return (
    <aside className="hidden xl:block fixed left-20 w-44" style={{ top: "9.25rem" }}>
      <div className="flex gap-3">
        <div className="relative" style={{ width: 1.5 }}>
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,.08)", borderRadius: 1 }} />
          <div
            ref={indicatorRef}
            style={{
              position: "absolute",
              left: 0,
              width: 1.5,
              height: 12,
              backgroundColor: "rgba(0,0,0,.8)",
              borderRadius: 1,
              transition: "transform 0.26s var(--ease-out-cubic)",
              willChange: "transform",
            }}
          />
        </div>
        <ul ref={listRef} className="flex flex-col" style={{ gap: 0 }}>
          {sections.map((section, i) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id} ref={(el) => { itemRefs.current[i] = el; }}>
                <a
                  href={`#${section.id}`}
                  className={`text-[12px] block py-[3px] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm ${
                    isActive
                      ? "text-[rgba(0,0,0,.8)] font-[550]"
                      : "text-[rgba(0,0,0,.3)]"
                  }`}
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

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
    <section id={id} className="scroll-mt-24 pt-16">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[13px] font-[550] tracking-[-0.005em] text-[rgba(0,0,0,.78)] whitespace-nowrap">
          {sectionTitle}
        </span>
        <div className="flex-1 h-px bg-[rgba(0,0,0,.08)]" />
      </div>
      {chapterTitle && (
        <h2 className="text-[24px] font-[500] leading-[1.4] tracking-[-0.01em] text-[rgba(0,0,0,.85)] mb-4">
          {chapterTitle}
        </h2>
      )}
      {subtitle && (
        <p className="text-[14px] font-[500] text-[rgba(0,0,0,.85)] mb-3">
          {subtitle}
        </p>
      )}
      <div className="flex flex-col gap-3.5">{children}</div>
    </section>
  );
}

export function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[14px] font-[450] leading-[1.45rem] tracking-[-0.005em] text-[rgba(0,0,0,.8)]">
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
    ? `flex items-center justify-center rounded-lg bg-[var(--surface)] ${flush ? "" : `px-3 pt-4 pb-4 sm:px-6 sm:pt-8 sm:pb-8 sm:h-[380px]`}`
    : "bg-[var(--surface)]";

  return (
    <figure className="my-1">
      <div
        className={`relative rounded-lg overflow-hidden ${containerClass} ${src ? "cursor-zoom-in" : ""} transition-opacity img-hover`}
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
          <div className="aspect-[16/10] flex items-center justify-center text-[rgba(0,0,0,.5)] text-sm">
            {alt}
          </div>
        )}
        <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
      </div>
      {caption && (
        <figcaption className="text-[12px] text-[rgba(0,0,0,.5)] mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── New Components ──────────────────────────────────────────────────

export function Stats({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-4"
          style={{ boxShadow: "var(--shadow-raised)" }}
        >
          <div className="text-[20px] font-[500] tracking-[-0.01em] mb-1 tabular-nums text-[rgba(0,0,0,.85)]">
            {stat.value}
          </div>
          <div className="text-[13px] leading-[1.45] text-[rgba(0,0,0,.5)]">
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
    <blockquote className="my-4 pl-5 py-1" style={{ borderLeft: "1.5px solid rgba(0,0,0,.08)" }}>
      <p className="text-[14px] font-[450] leading-[1.6] italic text-[rgba(0,0,0,.65)]">
        &ldquo;{children}&rdquo;
      </p>
      <cite className="block mt-2 text-[12px] font-[450] text-[rgba(0,0,0,.3)] not-italic">
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
      className="my-4 -mx-6 overflow-x-auto scrollbar-hide"
      role="region"
      aria-label="Image carousel"
      tabIndex={0}
    >
      <div className="flex gap-4 px-6" style={{ width: "max-content" }}>
        {images.map((img, i) => (
          <div
            key={i}
            className="relative w-[320px] sm:w-[400px] flex-shrink-0 rounded-lg overflow-hidden bg-[var(--surface)]"
          >
            <img src={img.src} alt={img.alt} loading="lazy" decoding="async" className="w-full block" />
            <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
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
  flush,
}: {
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  flush?: boolean;
}) {
  return (
    <figure className="my-1">
      <div className={`relative flex justify-center rounded-lg ${flush ? "" : "px-6 py-8 bg-[var(--surface)]"}`}>
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
        <span className="absolute inset-0 rounded-lg pointer-events-none" style={{ boxShadow: "var(--shadow-flush)" }} />
      </div>
      {caption && (
        <figcaption className="text-[12px] text-[rgba(0,0,0,.5)] mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Highlight({
  children,
  color = "yellow",
}: {
  children: React.ReactNode;
  color?: "blue" | "yellow" | "green" | "purple" | "pink";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<"hidden" | "animate" | "shown">("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("shown");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        // If user hasn't scrolled yet, they just landed on this page —
        // show highlights that are already visible without animation.
        if (window.scrollY < 50) {
          setState("shown");
        } else {
          setState("animate");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const lineCount = ref.current?.getClientRects().length ?? 1;
  const totalMs = 800 + Math.max(0, lineCount - 1) * 400;

  return (
    <span
      ref={ref}
      className={`highlight highlight-${color}`}
      style={
        state === "hidden"
          ? { backgroundSize: "0% 100%" }
          : state === "animate"
            ? { animation: `highlight-wipe ${totalMs}ms var(--ease-out-quint) forwards` }
            : undefined
      }
    >
      {children}
    </span>
  );
}

export function PulseDot({ color = "#4a9eff" }: { color?: string }) {
  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot-anim { animation: none; }
        }
      `}</style>
      <span
        className="pulse-dot-anim"
        style={{
          display: "inline-block",
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: color,
          animation: "pulse-dot 2s ease-in-out infinite",
          verticalAlign: "middle",
        }}
        aria-hidden="true"
      />
    </>
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
    <div className="py-5 border-t border-[var(--border)] first:border-t sm:[&:nth-child(2)]:border-t">
      <div className="text-[13px] font-[550] text-[rgba(0,0,0,.85)]">{name}</div>
      <div className="text-[12px] text-[rgba(0,0,0,.4)] mb-1.5">{role}</div>
      <p className="text-[13px] leading-[1.5] text-[rgba(0,0,0,.65)]">{children}</p>
    </div>
  );
}

/* ── Pill Tabs ── */

export function PillTabs({
  tabs,
}: {
  tabs: { id: string; label: string; content: React.ReactNode }[];
}) {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isKeyboard = useRef(false);

  useEffect(() => {
    const btn = btnRefs.current[active];
    const ind = indicatorRef.current;
    const container = containerRef.current;
    if (!btn || !ind || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const x = bRect.left - cRect.left;
    if (isKeyboard.current) {
      ind.style.transition = "none";
      isKeyboard.current = false;
    } else {
      ind.style.transition = "transform 250ms var(--ease-in-out-quart), width 250ms var(--ease-in-out-quart)";
    }
    ind.style.width = `${bRect.width}px`;
    ind.style.transform = `translateX(${x}px)`;
  }, [active]);

  return (
    <div style={{ marginTop: ".5rem" }}>
      <style>{`
        .pill-tab { position: relative; z-index: 1; padding: .375rem .875rem; border-radius: 9999px; border: none; cursor: pointer; font-size: .8125rem; font-weight: 500; font-family: inherit; letter-spacing: -.005rem; background: transparent; color: rgba(0,0,0,.5); transition: color 150ms ease, transform 100ms ease; white-space: nowrap; }
        .pill-tab-active { color: #fff; }
        .pill-tab:active { transform: scale(0.97); }
        .pill-tab-panel { display: flex; flex-direction: column; gap: .875rem; transition: opacity 150ms var(--ease-out-cubic), filter 150ms var(--ease-out-cubic); }
        @media (max-width: 480px) {
          .pill-tab { padding: .375rem .5rem; font-size: .75rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pill-tab-panel { transition: none; }
          .pill-tab-indicator { transition: none !important; }
        }
      `}</style>
      <div
        ref={containerRef}
        onMouseLeave={() => { const h = hoverRef.current; if (h) h.style.opacity = "0"; }}
        style={{
          display: "inline-flex",
          gap: ".25rem",
          padding: ".25rem",
          borderRadius: 9999,
          backgroundColor: "var(--surface-hover)",
          position: "relative",
        }}
      >
        <div
          ref={hoverRef}
          style={{
            position: "absolute",
            top: ".25rem",
            left: 0,
            height: "calc(100% - .5rem)",
            borderRadius: 9999,
            backgroundColor: "rgba(0,0,0,.05)",
            willChange: "transform",
            opacity: 0,
            transition: "transform 200ms var(--ease-out-quart), width 200ms var(--ease-out-quart), opacity 150ms ease",
            pointerEvents: "none",
          }}
        />
        <div
          ref={indicatorRef}
          className="pill-tab-indicator"
          style={{
            position: "absolute",
            top: ".25rem",
            left: 0,
            height: "calc(100% - .5rem)",
            borderRadius: 9999,
            backgroundColor: "var(--accent-pill)",
            willChange: "transform",
          }}
        />
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            onClick={() => setActive(i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") isKeyboard.current = true; }}
            onMouseEnter={() => {
              if (i === active) return;
              const btn = btnRefs.current[i];
              const ctr = containerRef.current;
              const h = hoverRef.current;
              if (!btn || !ctr || !h) return;
              const cRect = ctr.getBoundingClientRect();
              const bRect = btn.getBoundingClientRect();
              h.style.width = `${bRect.width}px`;
              h.style.transform = `translateX(${bRect.left - cRect.left}px)`;
              h.style.opacity = "1";
            }}
            onMouseLeave={() => { const h = hoverRef.current; if (h) h.style.opacity = "0"; }}
            className={`pill-tab ${active === i ? "pill-tab-active" : ""}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "1.25rem", position: "relative" }}>
        {tabs.map((t, i) => (
          <div
            key={t.id}
            className="pill-tab-panel"
            style={{
              opacity: active === i ? 1 : 0,
              filter: active === i ? "blur(0)" : "blur(4px)",
              position: active === i ? "relative" : "absolute",
              top: 0,
              left: 0,
              right: 0,
              pointerEvents: active === i ? "auto" : "none",
            }}
          >
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
