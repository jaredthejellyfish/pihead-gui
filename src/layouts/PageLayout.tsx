import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const themes = {
  dark: "from-black to-black",
  purple: "from-indigo-900/30 via-purple-900/20 to-black",
  blue: "from-indigo-600/30 via-indigo-900/20 to-black",
  green: "from-green-600/30 via-green-900/20 to-black",
  orange: "from-orange-700/30 via-orange-900/20 to-black",
};

function PageLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <div
      className={cn(
        "transition-colors duration-700 w-full min-h-screen bg-black flex flex-col bg-gradient-to-br",
        themes[theme.theme as keyof typeof themes],
      )}
    >
      {children}
    </div>
  );
}

export default PageLayout;
