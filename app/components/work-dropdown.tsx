"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import Link from "next/link";

export interface CaseStudyPreview {
  slug: string;
  title: string;
  description: string;
}

function ServesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="-translate-y-px">
      <g clipPath="url(#serves-clip)">
        <circle cx="11.653" cy="5.633" r="5.633" className="fill-[#E1E3E8] transition-[fill] duration-150 group-hover:fill-[#C2E5FF]" />
        <path d="M18.265 24c0-.804-.158-1.6-.466-2.343a6.143 6.143 0 0 0-5.656-3.779 6.143 6.143 0 0 0-6.122 5.779v.343h12.244Z" className="fill-[#E1E3E8] transition-[fill] duration-150 group-hover:fill-[#C2E5FF]" />
        <path d="M23.061 24a11.02 11.02 0 0 0-22.04 0h5.51a5.51 5.51 0 0 1 11.02 0h5.51Z" className="fill-[#8790A1] transition-[fill] duration-150 group-hover:fill-[#0090FF]" />
      </g>
      <defs>
        <clipPath id="serves-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function TasksIcon() {
  return (
    <svg width="28" height="28" viewBox="-0.5 -0.5 25 25" fill="none" aria-hidden="true">
      <g clipPath="url(#tasks-clip)">
        <path d="M6 18h6c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6v6Zm12-6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6h6V12Zm-6-6c0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6 3.314 0 6-2.686 6-6ZM6 0c3.314 0 6 2.686 6 6H6v6c-3.314 0-6-2.686-6-6s2.686-6 6-6Zm12 0c3.314 0 6 2.686 6 6s-2.686 6-6 6V6h-6c0-3.314 2.686-6 6-6Z" className="fill-[#E1E3E8] transition-[fill] duration-150 group-hover:fill-[#FFD19A]" />
        <path d="M12 6c0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6 3.314 0 6-2.686 6-6Z" className="fill-[#8790A1] transition-[fill] duration-150 group-hover:fill-[#F76B15]" />
      </g>
      <defs>
        <clipPath id="tasks-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

const studyConfig: Record<string, { icon: React.ReactNode }> = {
  "proof-serves": { icon: <ServesIcon /> },
  "proof-ops": { icon: <TasksIcon /> },
};

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
        className="text-[13px] font-medium text-[var(--muted)] link-hover transition-colors h-8 px-2 flex items-center gap-1 rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
      >
        Case Studies
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M2.5 4L5 6.5L7.5 4" />
        </svg>
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
          {caseStudies.map((study) => {
            const config = studyConfig[study.slug];
            return (
            <Link
              key={study.slug}
              href={`/case-study/${study.slug}`}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              className="group flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none"
              onClick={hideMenu}
            >
              <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] flex-shrink-0 flex items-center justify-center">
                {config?.icon}
              </div>
              <div>
                <span className="block text-[14px] font-medium text-[var(--foreground)]">
                  {study.title}
                </span>
                <span className="block text-[12px] text-[var(--muted)] mt-px">
                  {study.description}
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
