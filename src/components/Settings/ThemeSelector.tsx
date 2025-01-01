import { Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SettingRow from "./SettingRow";
import { useTheme } from "@/contexts/theme-provider";

type Theme = "blue" | "purple" | "green" | "orange" | "dark";

const ThemeSelection = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: "Purple",
      value: "purple",
      gradient: "from-purple-500/80 to-purple-900",
    },
    {
      name: "Blue",
      value: "blue",
      gradient: "from-blue-500/80 to-blue-900",
    },
    {
      name: "Green",
      value: "green",
      gradient: "from-green-500/80 to-green-900",
    },
    {
      name: "Orange",
      value: "orange",
      gradient: "from-orange-500/80 to-orange-900",
    },
    {
      name: "Dark",
      value: "dark",
      gradient: "from-gray-700/80 to-gray-900",
    },
  ];

  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-6">
        <SettingRow
          icon={Sun}
          title="Theme"
          subtitle="Choose your preferred color theme"
        >
          <div className="flex flex-wrap gap-4 justify-end">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                type="button"
                onClick={() => setTheme(themeOption.value as Theme)}
                className={cn(
                  "group relative flex flex-col items-center justify-center",
                  "w-12 h-12 rounded-xl transition-all duration-300",
                  "bg-gradient-to-br",
                  themeOption.gradient,
                  theme === themeOption.value
                    ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                    : "hover:ring-1 hover:ring-white/50",
                )}
                title={themeOption.name}
              >
                <span className="absolute -bottom-5 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {themeOption.name}
                </span>
              </button>
            ))}
          </div>
        </SettingRow>
      </CardContent>
    </Card>
  );
};

export default ThemeSelection;
