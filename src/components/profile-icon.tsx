import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Profile } from "@/types";
import { cn } from "@/lib/utils";
import type { Theme } from "@/contexts/theme-provider";

function ProfileIcon() {
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  useEffect(() => {
    window.electron.getActiveProfile().then((profile) => {
      setActiveProfile(profile);
    });
  }, []);

  const themeColors = {
    blue: "from-blue-500 to-blue-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
    dark: "from-neutral-500 to-neutral-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <Link
      to="/profiles"
      className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-3 py-1.5"
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center",
          themeColors[activeProfile?.theme as Theme]
        )}
      >
        <User className="w-5 h-5" />
      </div>
      <span className="text-sm font-medium">
        {activeProfile?.name ?? "Guest"}
      </span>
    </Link>
  );
}

export default ProfileIcon;
