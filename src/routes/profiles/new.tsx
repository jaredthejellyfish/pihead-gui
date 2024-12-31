import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { User, Users, Plus, Check, ChevronsRight, Music } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewProfilePage() {
  const [name, setName] = useState("");
  const [profileType, setProfileType] = useState<"driver" | "passenger" | null>(
    null
  );
  const [theme, setTheme] = useState<"blue" | "purple" | "green" | "orange">(
    "blue"
  );
  const [musicPreference, setMusicPreference] = useState("");
  const navigate = useNavigate();

  const handleCreateProfile = async () => {
    try {
      const newProfile = await window.electron.addProfile({
        name,
        theme,
        isActive: false,
        musicPreference,
        lastTrip: "No trips yet",
      });

      if (newProfile) {
        navigate("/profiles");
      }
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const isValid = name.trim().length >= 2 && profileType !== null;

  return (
    <div className="h-screen bg-black text-white overflow-scroll aspect-maybevideo">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none dark:opacity-0 h-full transition-opacity duration-300" />

      <div className="relative h-full p-8">
        <Header
          title="New Profile"
          backHref="/profiles"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="max-w-xl mx-auto space-y-6">
          {/* Profile Name */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <label className="block text-sm text-gray-400 mb-2" htmlFor="name">
                Profile Name
              </label>
              <Input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/5 border-0 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                maxLength={20}
              />
              <p className="text-xs text-gray-500 mt-2">
                This name will be displayed on the main screen
              </p>
            </CardContent>
          </Card>

          {/* Profile Type */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <label className="block text-sm text-gray-400 mb-4">
                Profile Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="ghost"
                  className={`h-24 relative text-neutral-300 hover:text-neutral-300 ${
                    profileType === "driver"
                      ? "bg-blue-500/20 ring-2 ring-blue-500"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setProfileType("driver")}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <User className="w-8 h-8" />
                    <span>Driver</span>
                  </div>
                  {profileType === "driver" && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-400" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className={`h-24 relative text-neutral-300 hover:text-neutral-300 ${
                    profileType === "passenger"
                      ? "bg-blue-500/20 ring-2 ring-blue-500"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                  onClick={() => setProfileType("passenger")}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Users className="w-8 h-8" />
                    <span>Passenger</span>
                  </div>
                  {profileType === "passenger" && (
                    <Check className="absolute top-2 right-2 w-4 h-4 text-blue-400" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <label className="block text-sm text-gray-400 mb-2">
                Theme Color
              </label>
              <Select
                value={theme}
                onValueChange={(
                  value: "blue" | "purple" | "green" | "orange"
                ) => setTheme(value)}
              >
                <SelectTrigger className="bg-white/5 border-0 text-white">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Music Preference */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <label className="block text-sm text-gray-400 mb-2">
                Music Preference
              </label>
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your music preference"
                  value={musicPreference}
                  onChange={(e) => setMusicPreference(e.target.value)}
                  className="bg-white/5 border-0 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                What kind of music do you prefer while traveling?
              </p>
            </CardContent>
          </Card>

          {/* Create Button */}
          <div className="flex justify-end space-x-3">
            <Link to="/profiles">
              <Button
                variant="ghost"
                className="bg-white/5 hover:bg-white/10 hover:text-neutral-300"
              >
                Cancel
              </Button>
            </Link>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white space-x-2"
              disabled={!isValid}
              onClick={handleCreateProfile}
            >
              <Plus className="w-4 h-4" />
              <span>Create Profile</span>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            You can customize profile preferences after creation
          </p>
        </div>
      </div>
    </div>
  );
}
