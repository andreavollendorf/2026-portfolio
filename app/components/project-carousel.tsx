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
}

interface CarouselCard {
  projectSlug: string;
  projectTitle: string;
  projectDescription: string;
  image: CoverImage;
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
      });
    }
  }
  return cards;
}

function wrapPosition(pos: number, segmentWidth: number) {
  let p = pos % segmentWidth;
  if (p < 0) p += segmentWidth;
  return p;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const stoppedRef = useRef(false);

  // Drag state
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const didDragRef = useRef(false);

  // Filter the projects based on activeFilter
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.slug === activeFilter);

  const cards = flattenToCards(filtered);

  // Adaptive duplication: ensure enough copies to fill viewport
  const copies = Math.max(2, Math.ceil(12 / cards.length));
  const items: CarouselCard[] = [];
  for (let i = 0; i < copies; i++) {
    items.push(...cards);
  }

  const applyTransform = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const segmentWidth = el.scrollWidth / copies;
    posRef.current = wrapPosition(posRef.current, segmentWidth);
    el.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
  }, [copies]);

  const visibleRef = useRef(false);

  const animate = useCallback(() => {
    if (stoppedRef.current || !visibleRef.current) return;

    posRef.current += 0.55;
    applyTransform();
    rafRef.current = requestAnimationFrame(animate);
  }, [applyTransform]);

  // Reset position when filter changes
  useEffect(() => {
    posRef.current = 0;
    applyTransform();
  }, [activeFilter, applyTransform]);

  // Start/stop animation based on viewport visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !stoppedRef.current) {
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
  }, [animate]);

  const stopForever = useCallback(() => {
    if (stoppedRef.current) return;
    stoppedRef.current = true;
    cancelAnimationFrame(rafRef.current);
  }, []);

  // Wheel / trackpad — both axes move carousel, preventDefault on all
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;

      e.preventDefault();
      posRef.current += delta;
      applyTransform();
      stopForever();
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [applyTransform, stopForever]);

  // Click-hold-drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      draggingRef.current = true;
      didDragRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = posRef.current;
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
        posRef.current = dragStartPosRef.current + dx;
        applyTransform();
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
  }, [applyTransform, stopForever]);

  // Block click navigation if user was dragging
  const handleClick = (e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work"
      onMouseEnter={stopForever}
      style={{
        opacity: transitioning ? 0 : 1,
        transition: "opacity 150ms ease",
      }}
    >
      <div
        ref={trackRef}
        className="flex items-start"
        style={{ width: "max-content", willChange: "transform" }}
      >
        {items.map((card, i) => (
          <Link
            key={`${card.projectSlug}-${card.image.src}-${i}`}
            href={`/case-study/${card.projectSlug}`}
            aria-label={`${card.projectTitle} — ${card.projectDescription}`}
            className="mr-5 shrink-0 group focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
            onFocus={stopForever}
            onClick={handleClick}
            draggable={false}
          >
            {/* Card — fixed height, 40px padding, image dictates width */}
            <div className="h-[360px] sm:h-[480px] rounded-xl bg-[var(--surface)] overflow-hidden p-[40px] flex items-center justify-center">
              <img
                src={card.image.src}
                alt={card.image.alt || `${card.projectTitle} — ${card.projectDescription}`}
                loading={i < cards.length ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className={`h-full w-auto ${card.image.srcDark ? "light-only" : ""}`}
              />
              {card.image.srcDark && (
                <img
                  src={card.image.srcDark}
                  alt={card.image.alt || `${card.projectTitle} — ${card.projectDescription}`}
                  loading={i < cards.length ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="h-full w-auto dark-only"
                />
              )}
            </div>

            {/* Label — clipped by overflow-hidden, slides down from top of container */}
            <div className="h-[36px] overflow-hidden">
              <div className="translate-y-[-100%] group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-200 ease-[var(--ease-out-quart)] pt-3 flex items-baseline justify-between">
                <span className="text-[13px] font-medium text-[var(--foreground)]">
                  {card.projectTitle}
                </span>
                <span className="text-[11px] text-[var(--muted)]">
                  {card.projectDescription}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
