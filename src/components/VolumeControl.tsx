import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX, Volume1, LucideIcon } from "lucide-react";
import { useMasterVolume } from "@/hooks/useMasterVolume";

interface VolumeControlProps {
  isOpen: boolean;
  onClose: () => void;
  anchorPosition?: { top: number; right: number };
}

const VolumeSlider = ({
  icon: Icon,
  label,
  value,
  onChange,
  onMute,
  isMuted,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onMute: () => void;
  isMuted: boolean;
}) => (
  <div className="flex items-center space-x-4 py-3 px-6">
    <button
      className="w-12 h-12 p-0 flex items-center justify-center"
      onClick={onMute}
    >
      <Icon className="w-10 h-10 text-gray-400" />
    </button>
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-5">
        <span className=" text-gray-400 text-2xl">{label}</span>
        <span className=" text-gray-400 text-2xl">
          {isMuted ? "Muted" : `${value}%`}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([value]) => onChange(value)}
        max={100}
        step={1}
        className={isMuted ? "opacity-50" : ""}
      
      />
    </div>
  </div>
);

export default function VolumeControl({
  isOpen,
  onClose,
  anchorPosition = { top: 64, right: 16 },
}: VolumeControlProps) {
  const { masterVolume, isMasterMuted, setMasterVolume, toggleMasterMute } =
    useMasterVolume(isOpen);

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getMasterVolumeIcon = () => {
    if (isMasterMuted) return VolumeX;
    if (masterVolume > 50) return Volume2;
    return Volume1;
  };

  const MasterIcon = getMasterVolumeIcon();

  return (
    <div
      className="z-50 flex absolute top-0 right-0 left-0 bottom-0 items-center justify-center backdrop-blur-sm bg-black/10"
      onClick={handleClickOutside}
    >
      <Card
        className="bg-black/80 border-0 backdrop-blur-xl overflow-hidden max-w-4xl w-full h-32"
        style={{
          top: anchorPosition.top,
          right: anchorPosition.right,
        }}
      >
        <CardContent className="p-4 space-y-4">
          {/* Master Volume */}
          <VolumeSlider
            icon={MasterIcon}
            label="Master Volume"
            value={masterVolume}
            onChange={setMasterVolume}
            onMute={toggleMasterMute}
            isMuted={isMasterMuted}
          />
        </CardContent>
      </Card>
    </div>
  );
}
