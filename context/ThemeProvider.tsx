"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeName =
  | "vscode-dark"
  | "monokai"
  | "monokai-dimmed"
  | "dracula"
  | "solarized-dark"
  | "github-light";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: ThemeName[];
};

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME: ThemeName = "vscode-dark";

const THEMES: ThemeName[] = [
  "vscode-dark",
  "monokai",
  "monokai-dimmed",
  "dracula",
  "solarized-dark",
  "github-light",
];

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isTheme(value: string): value is ThemeName {
  return THEMES.includes(value as ThemeName);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === "undefined") return DEFAULT_THEME;
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme && isTheme(savedTheme) ? savedTheme : DEFAULT_THEME;
  });
  const applyTheme = useCallback((value: ThemeName) => {
    document.documentElement.setAttribute("data-theme", value);
    localStorage.setItem(THEME_STORAGE_KEY, value);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [applyTheme, theme]);

  const setTheme = useCallback(
    (value: ThemeName) => {
      setThemeState(value);
      applyTheme(value);
    },
    [applyTheme],
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: THEMES,
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
