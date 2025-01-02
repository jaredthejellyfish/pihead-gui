

import { Car } from "lucide-react";

import { User } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Theme } from "@/contexts/theme-provider";


function ProfileCard({
  name,
  isActive,
  theme,
  lastTrip,
  onClick,
}: {
  name: string;
  isActive: boolean;
  theme: Theme;
  lastTrip: string;
  onClick: () => void;
}) {
  const gradientMap = {
    blue: "from-indigo-500 to-indigo-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    dark: "from-black to-black/50"
  };

  return (
    <Card
      className={`bg-white/5 border-0 backdrop-blur-lg overflow-hidden cursor-pointer transition-all duration-300 ${
        isActive ? "ring-2 ring-indigo-500 bg-white/10" : "hover:bg-white/10"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientMap[theme]} flex items-center justify-center`}
          >
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">{name}</h3>
              {isActive && (
                <span className="text-sm text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Car className="w-4 h-4" />
                <span className="text-sm">{lastTrip}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
