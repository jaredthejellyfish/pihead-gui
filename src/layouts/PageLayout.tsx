import { useTheme } from "@/contexts/theme-provider";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const themes = {
  dark: "",
  purple: "bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black",
  blue: "bg-gradient-to-br from-blue-600/30 via-blue-900/20 to-black",
  green: "bg-gradient-to-br from-green-600/30 via-green-900/20 to-black",
  orange: "bg-gradient-to-br from-orange-700/30 via-orange-900/20 to-black",
};

function PageLayout({ children }: Props) {
  const theme = useTheme();

  return (
    <div
      className={cn(
        "transition-opacity duration-300 w-full min-h-screen bg-black flex flex-col",
        themes[theme.theme as keyof typeof themes],
      )}
    >
      {children}
    </div>
  );
}

export default PageLayout;
