"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export interface CoverImage {
  src: string;
  srcDark?: string;
  alt?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  company: string;
  year: string;
  coverDate?: string;
  coverImages: CoverImage[];
  hasCaseStudy?: boolean;
}

interface CarouselCard {
  projectSlug: string;
  projectTitle: string;
  projectDescription: string;
  image: CoverImage;
  hasCaseStudy: boolean;
}

function flattenToCards(projects: Project[]): CarouselCard[] {
  const cards: CarouselCard[] = [];
  for (const p of projects) {
    for (const img of p.coverImages) {
      cards.push({
        projectSlug: p.slug,
        projectTitle: p.title,
        projectDescription: p.description,
        image: img,
        hasCaseStudy: !!p.hasCaseStudy,
      });
    }
  }
  return cards;
}

export default function ProjectCarousel({
  projects,
  activeFilter = "all",
  transitioning = false,
}: {
  projects: Project[];
  activeFilter?: string;
  transitioning?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const stoppedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const didDragRef = useRef(false);

  // Custom cursor — entirely ref-driven, no state re-renders.
  // Split into two layers: outer for position (no transition, instant),
  // inner for appearance (opacity + scale, transitioned via ease-out-quart).
  const cursorPosRef = useRef<HTMLDivElement>(null);
  const cursorFadeRef = useRef<HTMLDivElement>(null);

  const onCardMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const container = scrollRef.current;
    if (!pos || !container) return;
    const rect = container.getBoundingClientRect();
    // Account for scrollLeft so cursor tracks correctly on scrolled cards
    pos.style.transform = `translate(${e.clientX - rect.left + container.scrollLeft}px, ${e.clientY - rect.top}px)`;
  }, []);

  const onCardMouseEnter = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const fade = cursorFadeRef.current;
    const container = scrollRef.current;
    if (!pos || !fade || !container) return;
    const rect = container.getBoundingClientRect();
    pos.style.transform = `translate(${e.clientX - rect.left + container.scrollLeft}px, ${e.clientY - rect.top}px)`;
    // Dot→pill: snap to tiny dot instantly, then ease-out-expo into full size
    fade.style.transition = "none";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
    fade.offsetHeight; // force reflow
    fade.style.transition = "opacity 250ms cubic-bezier(0.19,1,0.22,1), transform 250ms cubic-bezier(0.19,1,0.22,1)";
    fade.style.opacity = "1";
    fade.style.transform = "scale(1)";
  }, []);

  const onCardMouseLeave = useCallback(() => {
    const fade = cursorFadeRef.current;
    if (!fade) return;
    // Exit faster than entrance — ease-out-quart, 150ms
    fade.style.transition = "opacity 150ms cubic-bezier(0.165,0.84,0.44,1), transform 150ms cubic-bezier(0.165,0.84,0.44,1)";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
  }, []);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.slug === activeFilter);

  const cards = flattenToCards(filtered);

  const stopForever = useCallback(() => {
    if (stoppedRef.current) return;
    stoppedRef.current = true;
    cancelAnimationFrame(rafRef.current);
  }, []);

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeFilter]);

  // Desktop: auto-scroll until interaction, pause when off-screen
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;

    const animate = () => {
      if (stoppedRef.current || !visible) return;

      // Stop at the end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        stoppedRef.current = true;
        return;
      }

      el.scrollLeft += 0.55;
      rafRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !stoppedRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Desktop: vertical wheel → horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (window.matchMedia("(hover: none)").matches) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      el.scrollLeft += delta;
      stopForever();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [stopForever]);

  // Desktop: click-hold-drag
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    if (window.matchMedia("(hover: none)").matches) return;

    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      draggingRef.current = true;
      didDragRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartScrollRef.current = el.scrollLeft;
      pointerId = e.pointerId;
      stopForever();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const dx = dragStartXRef.current - e.clientX;
      if (!didDragRef.current && Math.abs(dx) > 5) {
        didDragRef.current = true;
        el.setPointerCapture(pointerId);
        el.style.cursor = "grabbing";
      }
      if (didDragRef.current) {
        el.scrollLeft = dragStartScrollRef.current + dx;
      }
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (didDragRef.current && pointerId !== -1) {
        try { el.releasePointerCapture(pointerId); } catch {}
      }
      el.style.cursor = "";
      pointerId = -1;
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  // Block click navigation if user was dragging
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide select-none relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={stopForever}
      style={{
        opacity: transitioning ? 0 : 1,
        transition: "opacity 150ms ease",
      }}
    >
      {/* Custom cursor — outer: instant position, inner: fade+scale */}
      <div
        ref={cursorPosRef}
        aria-hidden
        className="absolute top-0 left-0 z-50 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          ref={cursorFadeRef}
          style={{
            opacity: 0,
            transform: "scale(0.1)",
            transition: "opacity 150ms cubic-bezier(0.165,0.84,0.44,1), transform 150ms cubic-bezier(0.165,0.84,0.44,1)",
          }}
        >
          <span
            className="block -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[12px] font-medium px-4 py-2 whitespace-nowrap shadow-lg"
          >
            View Case Study
          </span>
        </div>
      </div>

      <div
        className="flex items-start"
        style={{
          width: "max-content",
          paddingLeft: "max(1.5rem, calc((100vw - 1200px) / 2 + 1.5rem))",
          paddingRight: "1.5rem",
        }}
      >
        {cards.map((card, i) => {
          const imageContent = (
            <div className="h-[360px] sm:h-[480px] rounded-xl bg-[var(--surface)] overflow-hidden p-[40px] flex items-center justify-center">
              <img
                src={card.image.src}
                alt={card.image.alt || `${card.projectTitle} — ${card.projectDescription}`}
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className={`h-full w-auto ${card.image.srcDark ? "light-only" : ""}`}
              />
              {card.image.srcDark && (
                <img
                  src={card.image.srcDark}
                  alt={card.image.alt || `${card.projectTitle} — ${card.projectDescription}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="h-full w-auto dark-only"
                />
              )}
            </div>
          );

          const label = (
            <div className="h-[36px] overflow-hidden">
              <div className="translate-y-[-100%] group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-200 ease-[var(--ease-out-quart)] pt-3 flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-[var(--foreground)]">
                  {card.projectTitle}
                </span>
                {card.hasCaseStudy ? (
                  <span className="text-[11px] text-[var(--muted)]">
                    View case study →
                  </span>
                ) : null}
              </div>
            </div>
          );

          if (card.hasCaseStudy) {
            return (
              <Link
                key={`${card.projectSlug}-${card.image.src}-${i}`}
                href={`/case-study/${card.projectSlug}`}
                aria-label={`${card.projectTitle} — ${card.projectDescription}`}
                className="mr-5 last:mr-0 shrink-0 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none cursor-none"
                onClick={handleClick}
                onMouseMove={onCardMouseMove}
                onMouseEnter={onCardMouseEnter}
                onMouseLeave={onCardMouseLeave}
                draggable={false}
              >
                {imageContent}
                {label}
              </Link>
            );
          }

          return (
            <div
              key={`${card.projectSlug}-${card.image.src}-${i}`}
              className="mr-5 last:mr-0 shrink-0 group"
              aria-label={`${card.projectTitle} — ${card.projectDescription}`}
              draggable={false}
            >
              {imageContent}
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
