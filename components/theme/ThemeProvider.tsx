"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "vscode-dark" | "monokai" | "monokai-dimmed" | "dracula" | "solarized-dark" | "github-light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: readonly Theme[];
}

const AVAILABLE_THEMES = [
  "vscode-dark",
  "monokai",
  "monokai-dimmed",
  "dracula",
  "solarized-dark",
  "github-light",
] as const;

const THEME_LABELS: Record<Theme, string> = {
  "vscode-dark": "VS Code Dark",
  "monokai": "Monokai",
  "monokai-dimmed": "Monokai Dimmed",
  "dracula": "Dracula",
  "solarized-dark": "Solarized Dark",
  "github-light": "GitHub Light",
};

const DEFAULT_THEME: Theme = "vscode-dark";
const STORAGE_KEY = "app-theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }

    const storedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return storedTheme && AVAILABLE_THEMES.includes(storedTheme) ? storedTheme : DEFAULT_THEME;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Update theme
  const setTheme = (newTheme: Theme) => {
    if (!AVAILABLE_THEMES.includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Using default.`);
      return;
    }

    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    setTheme,
    availableThemes: AVAILABLE_THEMES,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}

export function getThemeLabel(theme: Theme): string {
  return THEME_LABELS[theme] || theme;
}

export type { Theme };
