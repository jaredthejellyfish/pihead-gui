import { createContext, useContext, useEffect, useState } from "react";

type Theme = "blue" | "purple" | "green" | "orange" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  lastTheme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "purple",
  lastTheme: "purple",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "purple",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );
  const [lastTheme, setLastTheme] = useState<Theme>(
    () => (localStorage.getItem(`${storageKey}-last`) as Theme) || defaultTheme,
  );

  // Apply theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Persist theme selections
  useEffect(() => {
    localStorage.setItem(storageKey, theme);
    localStorage.setItem(`${storageKey}-last`, lastTheme);
  }, [theme, lastTheme, storageKey]);

  const value = {
    theme,
    lastTheme,
    setTheme: (newTheme: Theme) => {
      setLastTheme(theme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
