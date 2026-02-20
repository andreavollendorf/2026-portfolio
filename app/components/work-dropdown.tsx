"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useDialKit } from "dialkit";

export interface CaseStudyPreview {
  slug: string;
  title: string;
  description: string;
}

function ServesIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="6" r="6" className={colored ? "fill-[#C2E5FF]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#C2E5FF]"} />
      <path d="M18 24c0-.788-.155-1.568-.456-2.296A6 6 0 0 0 12 18a6 6 0 0 0-5.544 3.704A5.97 5.97 0 0 0 6 24h12Z" className={colored ? "fill-[#C2E5FF]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#C2E5FF]"} />
      <path d="M23 24a11 11 0 0 0-22 0h5.5a5.5 5.5 0 0 1 11 0H23Z" className={colored ? "fill-[#0090FF]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#0090FF]"} />
    </svg>
  );
}

function TasksIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g clipPath="url(#tasks-clip)">
        <path d="M6 18h6c0 3.314-2.686 6-6 6s-6-2.686-6-6 2.686-6 6-6v6Zm12-6c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6h6V12Zm-6-6c0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6 3.314 0 6-2.686 6-6ZM6 0c3.314 0 6 2.686 6 6H6v6c-3.314 0-6-2.686-6-6s2.686-6 6-6Zm12 0c3.314 0 6 2.686 6 6s-2.686 6-6 6V6h-6c0-3.314 2.686-6 6-6Z" className={colored ? "fill-[#FFD19A]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#FFD19A]"} />
        <path d="M12 6c0 3.314 2.686 6 6 6-3.314 0-6 2.686-6 6 0-3.314-2.686-6-6-6 3.314 0 6-2.686 6-6Z" className={colored ? "fill-[#F76B15]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#F76B15]"} />
      </g>
      <defs>
        <clipPath id="tasks-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

function UserwiseIcon({ colored = false }: { colored?: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g clipPath="url(#userwise-clip)">
        <path d="M3.51472 3.48556C1.83649 5.16379 0.693599 7.30199 0.230577 9.62976C-0.232446 11.9575 0.00519422 14.3703 0.913446 16.563C1.8217 18.7558 3.35977 20.6299 5.33316 21.9485C7.30655 23.2671 9.62662 23.9708 12 23.9708C14.3734 23.9708 16.6935 23.2671 18.6668 21.9485C20.6402 20.6299 22.1783 18.7558 23.0866 16.563C23.9948 14.3703 24.2324 11.9575 23.7694 9.62976C23.3064 7.30199 22.1635 5.16379 20.4853 3.48556L13.6971 10.2738C14.0327 10.6094 14.2613 11.0371 14.3539 11.5026C14.4465 11.9682 14.399 12.4507 14.2173 12.8893C14.0357 13.3278 13.728 13.7027 13.3334 13.9664C12.9387 14.2301 12.4747 14.3708 12 14.3708C11.5253 14.3708 11.0613 14.2301 10.6666 13.9664C10.272 13.7027 9.96434 13.3278 9.78269 12.8893C9.60104 12.4507 9.55351 11.9682 9.64612 11.5026C9.73872 11.0371 9.9673 10.6094 10.3029 10.2738L3.51472 3.48556Z" className={colored ? "fill-[#EAD5F9]" : "fill-[#E1E3E8] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#EAD5F9]"} />
        <path d="M3.51472 3.48556C1.83649 5.16379 0.693599 7.30199 0.230577 9.62976C-0.232446 11.9575 0.00519422 14.3703 0.913446 16.563C1.8217 18.7558 3.35977 20.6299 5.33316 21.9485C7.30655 23.2671 9.62662 23.9708 12 23.9708C14.3734 23.9708 16.6935 23.2671 18.6668 21.9485C20.6402 20.6299 22.1783 18.7558 23.0866 16.563C23.9948 14.3703 24.2324 11.9575 23.7694 9.62976C23.3064 7.30199 22.1635 5.16379 20.4853 3.48556L17.0912 6.87967C18.0981 7.88661 18.7838 9.16953 19.0617 10.5662C19.3395 11.9629 19.1969 13.4105 18.6519 14.7262C18.107 16.0418 17.1841 17.1663 16.0001 17.9574C14.8161 18.7486 13.424 19.1708 12 19.1708C10.576 19.1708 9.18393 18.7486 7.99989 17.9574C6.81586 17.1663 5.89302 16.0418 5.34807 14.7262C4.80312 13.4105 4.66053 11.9629 4.93835 10.5662C5.21616 9.16953 5.90189 7.88661 6.90883 6.87967L3.51472 3.48556Z" className={colored ? "fill-[#8E4EC6]" : "fill-[#8790A1] transition-[fill] duration-150 [@media(hover:hover)]:group-hover:fill-[#8E4EC6]"} />
      </g>
      <defs>
        <clipPath id="userwise-clip"><rect width="24" height="24" fill="white" /></clipPath>
      </defs>
    </svg>
  );
}

export const studyConfig: Record<string, { Icon: React.FC<{ colored?: boolean }> }> = {
  "proof-serves": { Icon: ServesIcon },
  "proof-ops": { Icon: TasksIcon },
  "userwise": { Icon: UserwiseIcon },
};

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Icon Hover Micro-interactions
 *
 * Each icon has a unique motion triggered on menu-item hover.
 *
 *  Serves   float — lifts y: -offsetY, then settles back
 *  Tasks    spin  — rotates to +rotation°, then settles back
 *  Userwise pulse — scales to hoverScale, then settles back
 *
 * All share the same spring config and holdDuration:
 *
 *    rest   icon at identity transform
 *   hover   icon animates to target with spring
 *   +hold   holds at target for holdDuration ms
 *  settle   eases back to rest (spring)
 * ───────────────────────────────────────────────────────── */

/* Rest state — all icons return here */
const REST = { y: 0, rotate: 0, scale: 1 };

/* Per-icon animation targets (defaults, tunable via DialKit) */
const DEFAULTS = {
  holdDuration: 150,   // ms to hold at peak before settling
  spring: { type: "spring" as const, visualDuration: 0.3, bounce: 0.25 },
  serves:   { offsetY: 6 },      // px the icon floats up
  tasks:    { rotate: 14 },      // degrees the icon spins
  userwise: { scale: 1.15 },     // scale factor for pulse
};

// ease-out-quart — panel enter/exit
const EASE_OUT_QUART = "cubic-bezier(0.165,0.84,0.44,1)";

export default function WorkDropdown({
  caseStudies,
}: {
  caseStudies: CaseStudyPreview[];
}) {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [settled, setSettled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = useId();

  // DialKit — live controls for tuning each icon's hover animation
  const params = useDialKit("Icon Hover", {
    holdDuration: [DEFAULTS.holdDuration, 0, 500],
    spring: DEFAULTS.spring,
    serves: {
      offsetY: [DEFAULTS.serves.offsetY, 0, 20],
    },
    tasks: {
      rotate: [DEFAULTS.tasks.rotate, 0, 45],
    },
    userwise: {
      scale: [DEFAULTS.userwise.scale, 1, 1.5],
    },
  });

  // Resolve the active animate target for a given slug
  const getIconTarget = (slug: string) => {
    switch (slug) {
      case "proof-serves": return { ...REST, y: -params.serves.offsetY };
      case "proof-ops":    return { ...REST, rotate: params.tasks.rotate };
      case "userwise":     return { ...REST, scale: params.userwise.scale };
      default:             return REST;
    }
  };

  // Hold timer: after hovering, wait holdDuration then settle back
  useEffect(() => {
    clearTimeout(settleTimer.current);
    setSettled(false);

    if (hoveredIdx !== null) {
      settleTimer.current = setTimeout(() => {
        setSettled(true);
      }, params.holdDuration);
    }

    return () => clearTimeout(settleTimer.current);
  }, [hoveredIdx, params.holdDuration]);

  // Reset icon hover when dropdown closes
  useEffect(() => {
    if (!open) {
      setHoveredIdx(null);
      setSettled(false);
    }
  }, [open]);

  // Ref-driven panel animation — asymmetric enter/exit.
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
      panel.style.transition = `opacity 150ms ${EASE_OUT_QUART}`;
      panel.style.opacity = "0";
      panel.style.pointerEvents = "none";
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

  const keepAlive = useCallback(() => {
    clearTimeout(leaveTimer.current);
  }, []);

  const hideMenu = useCallback(() => {
    clearTimeout(leaveTimer.current);
    setOpen(false);
  }, []);

  const scheduleHide = useCallback(() => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(hideMenu, 100);
  }, [hideMenu]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(leaveTimer.current);
      clearTimeout(exitTimer.current);
      clearTimeout(settleTimer.current);
    };
  }, []);

  // Close on Escape
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

  // Close on click outside
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
          aria-hidden="true"
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
        className="absolute right-0 top-full mt-2 z-[var(--z-dropdown)] bg-[var(--background)] border border-[var(--border)] rounded-xl shadow-lg overflow-hidden w-[280px]"
        style={{
          opacity: 0,
          transform: "translateY(-8px)",
          pointerEvents: "none",
        }}
      >
        <div className="p-2">
          {caseStudies.map((study, i) => {
            const config = studyConfig[study.slug];
            const isActive = hoveredIdx === i && !settled;
            const animateProps = isActive
              ? getIconTarget(study.slug)
              : REST;

            return (
              <Link
                key={study.slug}
                href={`/case-study/${study.slug}`}
                role="menuitem"
                tabIndex={open ? 0 : -1}
                className="group flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-[var(--surface)] focus-visible:bg-[var(--surface)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none"
                onClick={hideMenu}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] flex-shrink-0 flex items-center justify-center">
                  <motion.div
                    animate={animateProps}
                    transition={params.spring}
                  >
                    {config && <config.Icon />}
                  </motion.div>
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
