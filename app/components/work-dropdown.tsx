"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import Link from "next/link";

export interface CaseStudyPreview {
  slug: string;
  title: string;
  description: string;
}

// ease-out-quart — user-initiated enter/exit
const EASE_OUT_QUART = "cubic-bezier(0.165,0.84,0.44,1)";

export default function WorkDropdown({
  caseStudies,
}: {
  caseStudies: CaseStudyPreview[];
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = useId();

  // Ref-driven panel animation — asymmetric enter/exit.
  // Enter: opacity + translateY, 200ms.
  // Exit: opacity only, 150ms (faster, no competing movement).
  // After exit: snap translateY back to start position for next entrance.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    clearTimeout(exitTimer.current);

    if (open) {
      panel.style.transition = `opacity 200ms ${EASE_OUT_QUART}, transform 200ms ${EASE_OUT_QUART}`;
      panel.style.opacity = "1";
      panel.style.transform = "translateY(0)";
      panel.style.pointerEvents = "auto";
    } else {
      // Exit: fade only — clean disappearance without the upward jump
      panel.style.transition = `opacity 150ms ${EASE_OUT_QUART}`;
      panel.style.opacity = "0";
      panel.style.pointerEvents = "none";
      // After fade completes, snap translateY to start position (no transition)
      exitTimer.current = setTimeout(() => {
        panel.style.transition = "none";
        panel.style.transform = "translateY(-8px)";
      }, 150);
    }

    return () => clearTimeout(exitTimer.current);
  }, [open]);

  const showMenu = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setOpen(true);
  }, []);

  // Keep menu alive without resetting activeIndex (for gap crossing)
  const keepAlive = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  const hideMenu = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setOpen(false);
  }, []);

  // Small delay on leave to bridge the mt-2 gap
  const scheduleHide = useCallback(() => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(hideMenu, 100);
  }, [hideMenu]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimer.current);
      clearTimeout(exitTimer.current);
    };
  }, []);

  // Close on Escape — return focus to trigger
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        hideMenu();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, hideMenu]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;

    const handleScroll = () => hideMenu();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open, hideMenu]);

  // Close on click outside (touch fallback)
  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !triggerRef.current?.closest("[data-dropdown-wrapper]")?.contains(target)
      ) {
        hideMenu();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, hideMenu]);

  const handleMouseEnter = useCallback(() => {
    if (open) {
      // Already open — just cancel any pending close, don't reset activeIndex
      keepAlive();
    } else {
      showMenu();
    }
  }, [open, keepAlive, showMenu]);

  return (
    <div
      className="relative"
      data-dropdown-wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={scheduleHide}
    >
      <button
        ref={triggerRef}
        onClick={() => (open ? hideMenu() : showMenu())}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        className="text-[13px] font-medium text-[var(--muted)] link-hover transition-colors h-8 px-2 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
      >
        Case Studies
      </button>

      {/* Panel: always rendered, ref-driven transitions.
          Enter: opacity + transform, 200ms. Exit: opacity only, 150ms. */}
      <div
        ref={panelRef}
        id={panelId}
        role="menu"
        aria-hidden={!open}
        className="absolute right-0 top-full mt-2 z-[var(--z-nav)] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden w-[280px]"
        style={{
          opacity: 0,
          transform: "translateY(-8px)",
          pointerEvents: "none",
        }}
      >
        <div className="p-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-study/${study.slug}`}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none"
              onClick={hideMenu}
            >
              <div className="w-12 h-12 rounded-lg bg-[var(--surface)] flex-shrink-0" />
              <div>
                <span className="block text-[14px] font-medium text-[var(--foreground)]">
                  {study.title}
                </span>
                <span className="block text-[12px] text-[var(--muted)] mt-0.5">
                  {study.description}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
