import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import ProfileCard from "@/components/Profiles/ProfileCard";
import type { Profile } from "@/types";

export default function ProfilesScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfile, setActiveProfile] = useState<number | null>(null);

  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const fetchedProfiles = await window.electron.getProfiles();
        setProfiles(fetchedProfiles);
        // Set active profile if one exists
        const active = fetchedProfiles.find((p) => p.isActive);
        if (active?.id) {
          setActiveProfile(active.id);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileClick = async (id: number) => {
    try {
      const updatedProfile = await window.electron.setActiveProfile(id);
      if (updatedProfile) {
        // Refresh profiles to get updated active states
        const updatedProfiles = await window.electron.getProfiles();
        setProfiles(updatedProfiles);
        setActiveProfile(id);
      }
    } catch (error) {
      console.error("Error activating profile:", error);
    }
  };

  return (
    <div className="text-white overflow-scroll  h-screen">
      <div className="relative h-full p-8">
        {/* Header */}
        <Header
          title="Profiles"
          backHref="/"
          settingsHref="/settings"
          showSettings={profiles.length > 0}
        />

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              name={profile.name}
              theme={profile.theme}
              lastTrip={profile.lastTrip || "No trips yet"}
              onClick={() => profile.id && handleProfileClick(profile.id)}
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
