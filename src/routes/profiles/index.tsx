import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ProfileCard from "@/components/Profiles/ProfileCard";

type ThemeColor = "blue" | "purple" | "green" | "orange";

export default function ProfilesScreen() {
  const [profiles] = useState([
    {
      id: 1,
      name: "David",
      theme: "blue",
      isActive: true,
      lastTrip: "15.5 miles",
      musicPreference: "Rock",
    },
    {
      id: 2,
      name: "Sarah",
      theme: "purple",
      isActive: false,
      lastTrip: "8.2 miles",
      musicPreference: "Pop",
    },
    {
      id: 3,
      name: "Mike",
      theme: "green",
      isActive: false,
      lastTrip: "12.7 miles",
      musicPreference: "Jazz",
    },
  ]);

  const [activeProfile, setActiveProfile] = useState(1);

  return (
    <div className="h-full bg-black text-white overflow-scroll aspect-video">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none" />

      <div className="relative h-full p-8">
        {/* Header */}
        <Header
          title="Profiles"
          backHref="/"
          settingsHref="/settings"
          showSettings
        />

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              theme={profile.theme as ThemeColor}
              lastTrip={profile.lastTrip}
              musicPreference={profile.musicPreference}
              onClick={() => setActiveProfile(profile.id)}
              isActive={profile.id === activeProfile}
            />
          ))}

          {/* Add Profile Card */}
          <Link to="/profiles/new">
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300 flex items-center justify-center h-[110px]">
              <CardContent className="flex items-center justify-center flex-col gap-2 p-0">
                <Plus className="w-8 h-8 text-gray-400" />
              <span className="text-gray-400">Add New Profile</span>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
