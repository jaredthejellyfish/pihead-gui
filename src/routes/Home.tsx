import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  Fuel,
  Volume2,
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
import Carplay from "@/assets/carplay.svg";
import IsOnline from "@/components/is-online";
import ProfileIcon from "@/components/profile-icon";

function QuickAccessCard({
  icon: Icon,
  title,
  value,
  subtext,
  image,
  gradient,
}: {
  icon?: LucideIcon;
  title: string;
  value: string;
  subtext: string;
  image?: string;
  gradient: string;
}) {
  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden hover:bg-white/10 transition-all duration-300  max-h-[120px] w-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          {image && (
            <img src={image} alt={title} className="w-12 h-12 rounded-xl" />
          )}
          {!image && Icon && (
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
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
              <Cloud className="w-8 h-8 text-indigo-400" />
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
  // @ts-expect-error -- not implemented
  const [currentSong, setCurrentSong] = useState({
    title: "Starlight",
    artist: "Muse",
    album: "Black Holes and Revelations",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volumeControlOpen, setVolumeControlOpen] = useState(false);

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
    <div className="text-white overflow-auto  relative h-screen">
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
              className="w-6 h-6 text-indigo-400"
              role="button"
              onClick={() => setVolumeControlOpen(true)}
            />
            <Link to="/settings/wifi">
              <IsOnline />
            </Link>
            <span className="text-xl">72°F</span>
            <ProfileIcon />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - Left Column */}
          <div className="col-span-8 space-y-6">
            {/* Now Playing Section */}
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
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
                        className="w-14 h-14 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-colors"
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
                image={Carplay}
                title="Carplay"
                value="Not Connected"
                subtext="Connect to Carplay"
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
