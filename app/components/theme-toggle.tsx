"use client";

import { useEffect, useCallback, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";

// External store for theme — backed by sessionStorage
const themeListeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => { themeListeners.delete(callback); };
}

function getThemeSnapshot(): Theme {
  try {
    return (sessionStorage.getItem("theme") as Theme) || "system";
  } catch {
    return "system";
  }
}

function getThemeServerSnapshot(): Theme {
  return "system";
}

// Mounted detection — false on server, true on client
const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;

    // Disable transitions during theme switch to prevent flash
    root.classList.add("no-transitions");

    if (newTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", newTheme === "dark");
    }

    // Re-enable transitions after paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("no-transitions");
      });
    });
  }, []);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  const selectTheme = useCallback((newTheme: Theme) => {
    if (newTheme === "system") {
      sessionStorage.removeItem("theme");
    } else {
      sessionStorage.setItem("theme", newTheme);
    }
    applyTheme(newTheme);
    themeListeners.forEach(cb => cb());
  }, [applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme, applyTheme]);

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
      className="flex items-center h-8 p-1 rounded-lg bg-[var(--surface)] shadow-[0_0_0_1px_var(--border)]"
      role="radiogroup"
      aria-label="Theme selector"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => selectTheme(option.value)}
          className={`
            relative flex items-center justify-center w-8 h-6 rounded-md transition-[background-color,color,box-shadow] duration-150 before:absolute before:inset-[-10px] before:content-['']
            ${theme === option.value
              ? "bg-[var(--background)] text-[var(--foreground)] shadow-sm"
              : "text-[var(--muted)] link-hover"
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
