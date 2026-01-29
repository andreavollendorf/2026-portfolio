"use client";

import { useState, useEffect } from "react";

type Theme = "system" | "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }
  };

  const selectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  if (!mounted) {
    return <div className="h-8 w-[140px]" />;
  }

  const options: { value: Theme; icon: React.ReactNode }[] = [
    {
      value: "system",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="12" height="9" rx="1" />
          <path d="M5 14h6" />
          <path d="M8 12v2" />
        </svg>
      ),
    },
    {
      value: "light",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="3" />
          <path d="M8 2v1.5M8 12.5v1.5M2 8h1.5M12.5 8h1.5M4 4l1 1M11 11l1 1M4 12l1-1M11 5l1-1" />
        </svg>
      ),
    },
    {
      value: "dark",
      icon: (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13.5 8.5a5.5 5.5 0 1 1-6-6 4.5 4.5 0 0 0 6 6z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex items-center h-8 p-1 rounded-lg bg-[var(--surface)] border border-[var(--border)]"
      role="radiogroup"
      aria-label="Theme selector"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => selectTheme(option.value)}
          className={`
            flex items-center justify-center w-8 h-6 rounded-md transition-all
            ${theme === option.value
              ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }
          `}
          role="radio"
          aria-checked={theme === option.value}
          aria-label={option.value}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
