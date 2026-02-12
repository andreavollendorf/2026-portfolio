"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { studyConfig } from "./work-dropdown";

interface CaseStudyLink {
  slug: string;
  title: string;
  description: string;
}

export default function MobileMenu({
  caseStudies,
}: {
  caseStudies: CaseStudyLink[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setMounted(true), []);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Ref-driven asymmetric animation — enter: 200ms, exit: 150ms (faster, opacity-only)
  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    clearTimeout(exitTimer.current);
    const ease = "cubic-bezier(0.165,0.84,0.44,1)";

    if (open) {
      overlay.style.transition = `opacity 200ms ${ease}`;
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";

      content.style.transition = `opacity 200ms ${ease}, transform 200ms ${ease}`;
      content.style.opacity = "1";
      content.style.transform = "translateY(0)";
    } else {
      overlay.style.transition = `opacity 150ms ${ease}`;
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";

      content.style.transition = `opacity 150ms ${ease}`;
      content.style.opacity = "0";
      exitTimer.current = setTimeout(() => {
        content.style.transition = "none";
        content.style.transform = "translateY(-12px)";
      }, 150);
    }

    return () => clearTimeout(exitTimer.current);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  return (
    <>
      {/* Single animated button — lives in the nav, always above the overlay
          because the overlay z-index (49) is below the nav z-index (50). */}
      <button
        ref={buttonRef}
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative flex items-center justify-center w-10 h-10 -mr-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
      >
        <span
          className="absolute w-[18px] h-[2px] rounded-full bg-[var(--foreground)] transition-transform duration-200"
          style={{
            transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)",
            transform: open
              ? "translateY(0) rotate(45deg)"
              : "translateY(-4px) rotate(0deg)",
          }}
        />
        <span
          className="absolute w-[18px] h-[2px] rounded-full bg-[var(--foreground)] transition-transform duration-200"
          style={{
            transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)",
            transform: open
              ? "translateY(0) rotate(-45deg)"
              : "translateY(4px) rotate(0deg)",
          }}
        />
      </button>

      {/* Overlay portaled to body — z-index 49, one below nav (50).
          The nav paints above it so the hamburger/X button stays tappable.
          The overlay only needs to cover page content, not the nav. */}
      {mounted && createPortal(
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0"
          style={{
            zIndex: "var(--z-overlay)",
            opacity: 0,
            pointerEvents: "none",
            background: "var(--background)",
          }}
        >
          <div
            ref={contentRef}
            className="px-6 pt-20"
            style={{
              opacity: 0,
              transform: "translateY(-12px)",
            }}
          >
            <Link
              href="/about"
              onClick={close}
              className="block text-[18px] font-medium text-[var(--foreground)] px-4 py-3 -mx-4 mb-4 rounded-xl active:bg-[var(--surface)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none"
            >
              About
            </Link>

            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] mb-4 font-normal font-mono">
                Case Studies
              </p>

              <div className="flex flex-col gap-1">
                {caseStudies.map((study) => {
                  const config = studyConfig[study.slug];
                  return (
                    <Link
                      key={study.slug}
                      href={`/case-study/${study.slug}`}
                      onClick={close}
                      className="group flex items-center gap-4 rounded-xl px-4 py-4 -mx-4 active:bg-[var(--surface)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--foreground)] outline-none"
                    >
                      <div className="w-14 h-14 rounded-xl bg-white border border-[var(--border)] flex-shrink-0 flex items-center justify-center">
                        {config && <config.Icon colored />}
                      </div>
                      <div>
                        <span className="block text-[18px] font-medium text-[var(--foreground)]">
                          {study.title}
                        </span>
                        <span className="block text-[14px] text-[var(--muted)] mt-0.5">
                          {study.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
