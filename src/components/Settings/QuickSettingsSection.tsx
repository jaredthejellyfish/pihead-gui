import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

function QuickSettingsSection({
  icon: Icon,
  title,
  iconColor = "indigo",
  href,
}: {
  icon: LucideIcon;
  title: string;
  iconColor?: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="flex flex-col items-center justify-center space-y-2 h-24 hover:bg-white/10 rounded-xl"
    >
      <div
        className={cn("w-10 h-10 rounded-xl flex items-center justify-center", {
          "bg-indigo-500/20 text-indigo-400": iconColor === "indigo",
          "bg-green-500/20 text-green-400": iconColor === "green",
          "bg-blue-500/20 text-blue-400": iconColor === "blue",
          "bg-purple-500/20 text-purple-400": iconColor === "purple",
          // Add other color variants you need
        })}
      >
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-sm text-gray-200">{title}</span>
    </Link>
  );
}

export default QuickSettingsSection;
