"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WorkDropdown from "./work-dropdown";
import ContactDropdown from "./contact-dropdown";
import MobileMenu from "./mobile-menu";
import { caseStudies } from "../data/case-studies";

export default function NavBar({
  showBack,
  scrollTitle,
}: {
  showBack?: boolean;
  scrollTitle?: string;
} = {}) {
  const [visible, setVisible] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide/show on scroll
      if (y < 60) setVisible(true);
      else if (y < lastScrollY.current) setVisible(true);
      else if (y > lastScrollY.current + 5) setVisible(false);
      lastScrollY.current = y;

      // Show title after scrolling past hero
      if (scrollTitle) setShowTitle(y > 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTitle]);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 backdrop-blur-md transition-transform duration-300 will-change-transform ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        zIndex: "var(--z-nav)",
        transitionTimingFunction: "var(--ease-out-quart)",
        backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
      }}
    >
      <div className="flex items-center justify-between py-5 px-6 lg:px-20 mx-auto">
        {/* Left: logo or back link */}
        {showBack ? (
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] text-[rgba(0,0,0,.55)] link-hover press-scale touch-hitbox transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5.5 4L1.5 8M1.5 8L5.5 12M1.5 8H10C11.3807 8 12.5 6.88071 12.5 5.5V5.5C12.5 4.11929 11.3807 3 10 3H8.5" stroke="currentColor"/>
            </svg>
            <span>Home</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="text-[14px] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm"
            style={{ fontFamily: "var(--font-mackinac), Georgia, serif", fontWeight: 500, letterSpacing: "-.01em" }}
          >
            Andrea Vollendorf
          </Link>
        )}

        {/* Center: scroll title (optional) */}
        {scrollTitle && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll to top"
            className={`hidden sm:block absolute left-1/2 -translate-x-1/2 text-[12px] font-[550] transition-[opacity,transform] duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none rounded-sm ${
              showTitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
            style={{ transitionTimingFunction: "var(--ease-out-quart)" }}
          >
            {scrollTitle.replace(/\.$/, "")}
          </button>
        )}

        {/* Right: nav items */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/about"
            className="text-[12px] font-[450] text-[rgba(0,0,0,.55)] link-hover hover:bg-[var(--surface)] transition-colors h-8 px-3 flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] outline-none"
          >
            About
          </Link>
          <WorkDropdown caseStudies={caseStudies} />
          <ContactDropdown />
        </div>
        {/* Mobile */}
        <div className="sm:hidden">
          <MobileMenu caseStudies={caseStudies} />
        </div>
      </div>
    </nav>
  );
}
