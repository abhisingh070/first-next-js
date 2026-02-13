"use client";

import { useEffect, useRef, useState } from "react";

import { type ThemeName, useTheme } from "@/context/ThemeProvider";

const THEME_LABELS: Record<ThemeName, string> = {
  "vscode-dark": "VS Code Dark+",
  monokai: "Monokai",
  "monokai-dimmed": "Monokai Dimmed",
  dracula: "Dracula",
  "solarized-dark": "Solarized Dark",
  "github-light": "GitHub Light",
};

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary hover:bg-card"
        aria-label="Change theme"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path
            d="M12 3a9 9 0 1 0 9 9c0-.55-.45-1-1-1h-3.2a2.8 2.8 0 0 1 0-5.6H20c.55 0 1-.45 1-1A9 9 0 0 0 12 3Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8" cy="11" r="1" fill="currentColor" />
          <circle cx="10" cy="7" r="1" fill="currentColor" />
          <circle cx="13" cy="7" r="1" fill="currentColor" />
        </svg>
        <span className="hidden sm:inline">Theme</span>
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border border-border bg-card p-1 shadow-lg">
          {themes.map((themeName) => {
            const active = themeName === theme;
            return (
              <button
                key={themeName}
                type="button"
                onClick={() => {
                  setTheme(themeName);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition ${
                  active
                    ? "bg-primary text-accent-foreground"
                    : "text-text-primary hover:bg-bg-secondary"
                }`}
              >
                <span>{THEME_LABELS[themeName]}</span>
                {active ? <span>●</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
