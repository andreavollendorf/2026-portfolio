"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export interface CoverImage {
  src: string;
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
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const pausedRef = useRef(false);
  const stoppedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const didDragRef = useRef(false);

  const cursorPosRef = useRef<HTMLDivElement>(null);
  const cursorFadeRef = useRef<HTMLDivElement>(null);

  const onCardMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const container = outerRef.current;
    if (!pos || !container) return;
    const rect = container.getBoundingClientRect();
    pos.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
  }, []);

  const onCardMouseEnter = useCallback((e: React.MouseEvent) => {
    const pos = cursorPosRef.current;
    const fade = cursorFadeRef.current;
    const container = outerRef.current;
    if (!pos || !fade || !container) return;
    const rect = container.getBoundingClientRect();
    pos.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
    fade.style.transition = "none";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
    fade.offsetHeight;
    fade.style.transition =
      "opacity 250ms cubic-bezier(0.19,1,0.22,1), transform 250ms cubic-bezier(0.19,1,0.22,1)";
    fade.style.opacity = "1";
    fade.style.transform = "scale(1)";
  }, []);

  const onCardMouseLeave = useCallback(() => {
    const fade = cursorFadeRef.current;
    if (!fade) return;
    fade.style.transition =
      "opacity 150ms cubic-bezier(0.165,0.84,0.44,1), transform 150ms cubic-bezier(0.165,0.84,0.44,1)";
    fade.style.opacity = "0";
    fade.style.transform = "scale(0.1)";
  }, []);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.slug === activeFilter);

  const cards = flattenToCards(filtered);
  const cardCount = cards.length;

  const applyOffset = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const lw = loopWidthRef.current;
    if (lw > 0) {
      // Keep offset in [0, lw) — seamless because content repeats every lw
      offsetRef.current = ((offsetRef.current % lw) + lw) % lw;
    }
    // Shift by -lw so set B is the baseline; sets A and C act as buffers
    track.style.transform = `translateX(${-(offsetRef.current + lw)}px)`;
  }, []);

  // Measure the exact loop point: offsetLeft of the first card in the second set
  useEffect(() => {
    const track = trackRef.current;
    if (!track || cardCount === 0) return;

    const measure = () => {
      const secondSetStart = track.children[cardCount] as HTMLElement;
      if (secondSetStart) {
        loopWidthRef.current = secondSetStart.offsetLeft;
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [cardCount]);

  // Reset on filter change
  useEffect(() => {
    offsetRef.current = 0;
    applyOffset();
  }, [activeFilter, applyOffset]);

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current;
    const outer = outerRef.current;
    if (!track || !outer) return;

    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;

    const animate = () => {
      if (stoppedRef.current || pausedRef.current || !visible) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      offsetRef.current += 0.55;
      applyOffset();
      rafRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          rafRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 },
    );

    observer.observe(outer);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [applyOffset]);

  // Wheel handler
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      stoppedRef.current = true;
      offsetRef.current += delta;
      applyOffset();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [applyOffset]);

  // Drag handler
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      draggingRef.current = true;
      didDragRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartOffsetRef.current = offsetRef.current;
      pointerId = e.pointerId;
      stoppedRef.current = true;
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
        offsetRef.current = dragStartOffsetRef.current + dx;
        applyOffset();
      }
    };

    const onPointerUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      if (didDragRef.current && pointerId !== -1) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
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
  }, [applyOffset]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
    }
  }, []);

  return (
    <div
      ref={outerRef}
      className="overflow-hidden scrollbar-hide select-none relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{
        opacity: transitioning ? 0 : 1,
        transition: "opacity 150ms ease",
      }}
    >
      {/* Custom cursor */}
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
            transition:
              "opacity 150ms cubic-bezier(0.165,0.84,0.44,1), transform 150ms cubic-bezier(0.165,0.84,0.44,1)",
          }}
        >
          <span className="block -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--foreground)] text-[var(--background)] text-[12px] font-medium px-4 py-2 whitespace-nowrap shadow-lg">
            View Case Study
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex items-start gap-5"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {[...cards, ...cards, ...cards].map((card, i) => {
          const imageContent = (
            <div className="h-[360px] sm:h-[480px] rounded-xl bg-[var(--surface)] overflow-hidden p-[40px] flex items-center justify-center">
              <img
                src={card.image.src}
                alt={
                  card.image.alt ||
                  `${card.projectTitle} — ${card.projectDescription}`
                }
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="h-full w-auto"
              />
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
                className="shrink-0 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none cursor-pointer [@supports(cursor:none)]:cursor-none"
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
              className="shrink-0 group"
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
