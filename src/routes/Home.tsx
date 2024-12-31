import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  MapPin,
  Thermometer,
  Fuel,
  Volume2,
  User,
  Battery,
  Cloud,
  Wind,
  Sunrise,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import VolumeControl from "@/components/VolumeControl";
import { Profile } from "@/types";

function QuickAccessCard({
  icon: Icon,
  title,
  value,
  subtext,
  gradient,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  subtext: string;
  gradient: string;
}) {
  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden hover:bg-white/10 transition-all duration-300 aspect-maybevideo max-h-[120px] w-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-gray-400 font-medium">{title}</h3>
            <p className="text-2xl font-semibold text-white">{value}</p>
            <p className="text-sm text-gray-500">{subtext}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeatherWidget() {
  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-400 font-medium">Weather</h3>
            <div className="flex items-center space-x-2 mt-2">
              <Cloud className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-semibold text-white">72°F</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Partly Cloudy</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end space-x-4">
              <div className="text-center">
                <Wind className="w-5 h-5 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-500 mt-1">8mph</p>
              </div>
              <div className="text-center">
                <Sunrise className="w-5 h-5 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-500 mt-1">6:42 AM</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function VehicleStatusWidget() {
  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-6">
        <h3 className="text-gray-400 font-medium mb-4">Vehicle Status</h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <Battery className="w-5 h-5 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-500">Battery</p>
              <p className="text-white">12.6V</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="text-white">Due in 2k mi</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSong, setCurrentSong] = useState({
    title: "Starlight",
    artist: "Muse",
    album: "Black Holes and Revelations",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

  const [volumeControlOpen, setVolumeControlOpen] = useState(false);

  useEffect(() => {
    window.electron.getActiveProfile().then((profile) => {
      setActiveProfile(profile);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 100);
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => {};
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-black text-white overflow-auto aspect-maybevideo relative h-screen">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none dark:hidden" />

      <div className="relative h-full p-8">
        {/* Top Status Bar */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-6xl font-light tracking-tight">
              {currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h1>
            <p className="text-gray-400 mt-1">
              {currentTime.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-end items-center space-x-4">
            <Volume2
              className="w-6 h-6 text-blue-400"
              onClick={() => setVolumeControlOpen(true)}
            />
            <Thermometer className="w-6 h-6 text-blue-400" />
            <span className="text-xl">72°F</span>
            <Link
              to="/profiles"
              className="flex items-center space-x-2 bg-white/5 backdrop-blur-lg rounded-full px-3 py-1.5"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">
                {activeProfile?.name ?? "David"}
              </span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Now Playing Section */}
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Music className="w-12 h-12 text-white/90" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-3xl font-semibold mb-1 text-white">
                          {currentSong.title}
                        </h2>
                        <p className="text-gray-400 text-lg">
                          {currentSong.artist}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {currentSong.album}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xs text-gray-400">
                        {formatTime(Math.floor(progress * 3.6))}
                      </span>
                      <Slider
                        value={[progress]}
                        max={100}
                        step={1}
                        className="flex-grow"
                        onValueChange={(value) => setProgress(value[0])}
                      />
                      <span className="text-xs text-gray-400">3:36</span>
                    </div>
                    <div className="flex items-center justify-center space-x-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/10 text-gray-300"
                      >
                        <SkipBack className="w-6 h-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
                        onClick={togglePlay}
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8" />
                        ) : (
                          <Play className="w-8 h-8 ml-1" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-white/10 text-gray-300"
                      >
                        <SkipForward className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation and Fuel Cards */}
            <div className="grid grid-cols-2 gap-4">
              <QuickAccessCard
                icon={MapPin}
                title="Navigation"
                value="Home"
                subtext="15 min"
                gradient="from-green-500 to-emerald-700"
              />
              <QuickAccessCard
                icon={Fuel}
                title="Fuel Level"
                value="75%"
                subtext="280 miles range"
                gradient="from-orange-500 to-red-700"
              />
            </div>
          </div>

          {/* Right Column - Weather and Vehicle Status */}
          <div className="col-span-4 space-y-6">
            <WeatherWidget />
            <VehicleStatusWidget />
          </div>
        </div>
      </div>
      <VolumeControl
        isOpen={volumeControlOpen}
        onClose={() => setVolumeControlOpen(false)}
      />
    </div>
  );
}
