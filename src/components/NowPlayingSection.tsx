'use client';

import { useState, useEffect } from 'react';
import {
  Music,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface Song {
  title: string;
  artist: string;
  album: string;
  coverArt?: string;
}

export default function HorizontalNowPlayingCard() {
  const [currentSong, setCurrentSong] = useState<Song>({
    title: 'Starlight',
    artist: 'Muse',
    album: 'Black Holes and Revelations',
    coverArt: '/placeholder.svg?height=200&width=200',
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);

  const togglePlay = () => setIsPlaying(!isPlaying);

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 100);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-0 shadow-lg overflow-hidden w-full max-w-4xl mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden shadow-md">
            {currentSong.coverArt ? (
              <img
                src={currentSong.coverArt}
                alt={`${currentSong.title} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Music className="w-10 h-10 text-white/90" />
              </div>
            )}
          </div>
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-white truncate">
                  {currentSong.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-300 truncate">
                  {currentSong.artist}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-1 sm:mt-0">
                {currentSong.album}
              </p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  className="w-24"
                  onValueChange={(value) => setVolume(value[0])}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
