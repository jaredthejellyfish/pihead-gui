import { createContext, useContext, useEffect, useState } from "react";
import { useActiveProfile } from "./active-profile-provider";

export type Theme = "blue" | "purple" | "green" | "orange" | "dark";

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
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [lastTheme, setLastTheme] = useState<Theme>(defaultTheme);
  const { activeProfile } = useActiveProfile();

  // Update theme when active profile changes
  useEffect(() => {
    if (activeProfile?.theme) {
      setTheme(activeProfile.theme);
      setLastTheme(activeProfile.theme);
    } else {
      setTheme(defaultTheme);
      setLastTheme(defaultTheme);
    }
  }, [activeProfile, defaultTheme]);

  // Apply theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
