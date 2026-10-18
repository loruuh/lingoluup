"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "lime" | "ocean" | "sunset" | "neon" | "black";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  themeName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeNames: Record<Theme, string> = {
  lime: "Limón",
  ocean: "Ozean",
  sunset: "Sunset",
  neon: "Neon",
  black: "Noche",
};

const validThemes = new Set<Theme>(["lime", "ocean", "sunset", "neon", "black"]);

// Browser-/Statusleiste im Noche-Modus schwarz statt rot färben
function applyThemeColor(theme: string) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "black" ? "#000000" : "#DC143C");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("lime");

  // Load theme from localStorage on mount
  useEffect(() => {
    let savedTheme = localStorage.getItem("theme") as string | null;

    // Migrate old "blue" to "ocean"
    if (savedTheme === "blue") {
      savedTheme = "ocean";
      localStorage.setItem("theme", "ocean");
    }

    if (savedTheme && validThemes.has(savedTheme as Theme)) {
      setTheme(savedTheme as Theme);
      document.documentElement.setAttribute("data-theme", savedTheme);
      applyThemeColor(savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "lime");
    }
  }, []);

  // Update theme - rotate through lime → ocean → sunset → neon → black → lime
  const toggleTheme = () => {
    const themeOrder: Theme[] = ["lime", "ocean", "sunset", "neon", "black"];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    const newTheme = themeOrder[nextIndex];

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    applyThemeColor(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeName: themeNames[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
