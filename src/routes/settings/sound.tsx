import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Settings, Car } from "lucide-react";
import { eqProfiles } from "@/data/eq-profiles";
import { cn } from "@/lib/utils";

const BalanceControl = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const calculatePosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate position relative to center
    let x = ((clientX - centerX) / (rect.width / 2)) * 100;
    let y = ((clientY - centerY) / (rect.height / 2)) * 100;

    // Clamp values between -100 and 100
    x = Math.max(-100, Math.min(100, x));
    y = Math.max(-100, Math.min(100, y));

    // Round to nearest 5
    x = Math.round(x / 5) * 5;
    y = Math.round(y / 5) * 5;

    setPosition({ x, y });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    containerRef.current?.setPointerCapture(e.pointerId);
    calculatePosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    calculatePosition(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  // Reset position on double click
  const handleDoubleClick = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[200px] h-[200px] mx-auto my-4 touch-none select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={handleDoubleClick}
    >
      {/* Main grid background */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
        {/* Center car icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Car className="w-8 h-8 text-white/40" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0">
          {/* Vertical lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10" />

          {/* Horizontal lines */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-white/10" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-white/10" />
        </div>

        {/* Corner indicators */}
        <div className="absolute top-2 left-2 text-[10px] font-medium text-white/40">
          FL
        </div>
        <div className="absolute top-2 right-2 text-[10px] font-medium text-white/40">
          FR
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] font-medium text-white/40">
          RL
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-medium text-white/40">
          RR
        </div>
      </div>

      {/* Control point */}
      <div
        className={cn(
          "absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 transition-transform",
          "bg-gradient-to-br from-blue-400 to-blue-500",
          "rounded-full shadow-lg shadow-blue-500/20",
          "border border-white/20",
          "cursor-grab active:cursor-grabbing",
          "transform hover:scale-110 active:scale-95",
        )}
        style={{
          left: `${50 + (position.x / 100) * 50}%`,
          top: `${50 + (position.y / 100) * 50}%`,
        }}
      />

      {/* Labels */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/60">
        Front
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium text-white/60">
        Rear
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 text-sm font-medium text-white/60">
        Left
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 text-sm font-medium text-white/60">
        Right
      </div>
    </div>
  );
};

const EqualizerBand = ({
  frequency,
  value,
  onChange,
}: {
  frequency: string;
  value: number[];
  onChange: (value: number[]) => void;
}) => (
  <div className="flex flex-col items-center space-y-2 flex-1">
    <div className="relative h-48 flex items-center">
      {/* Track line */}
      <div className="absolute left-1/2 w-[1px] h-full bg-white/20 -translate-x-[0.5px]" />

      <Slider
        value={value}
        onValueChange={onChange}
        max={12}
        min={-12}
        step={1}
        orientation="vertical"
        className="h-full relative z-10"
      />
    </div>
    <div className="flex flex-col items-center text-center">
      <span className="text-gray-400 text-xs">{frequency}</span>
      <span className="text-gray-500 text-xs">
        {value[0] > 0 ? "+" : ""}
        {value[0]}dB
      </span>
    </div>
  </div>
);

export default function SoundSettingsPage() {
  const [enhancementToggles, setEnhancementToggles] = useState({
    loudness: true,
    surround: false,
    dynamicEQ: true,
    roadNoiseCompensation: true,
  });

  const [eqProfile, setEqProfile] = useState<string>("");

  const [eqBands, setEqBands] = useState({
    "60Hz": [0],
    "170Hz": [0],
    "310Hz": [0],
    "600Hz": [0],
    "1k": [0],
    "3k": [0],
    "6k": [0],
    "12k": [0],
    "14k": [0],
    "16k": [0],
  });

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="Sound"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* Balance/Fade */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Speaker Balance
              </h3>
              <BalanceControl />
            </CardContent>
          </Card>

          {/* Equalizer */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Equalizer</h3>
                <select
                  value={eqProfile}
                  onChange={(e) => {
                    setEqProfile(e.target.value);
                    const selectedProfile = eqProfiles.find(
                      (p) => p.id === e.target.value,
                    );
                    if (selectedProfile) {
                      const newBands = Object.fromEntries(
                        Object.entries(selectedProfile.bands).map(
                          ([freq, value]) => [
                            freq.includes("000")
                              ? `${parseInt(freq) / 1000}k`
                              : `${freq}Hz`,
                            [value],
                          ],
                        ),
                      ) as typeof eqBands;
                      setEqBands(newBands);
                    }
                  }}
                  className="bg-white/10 border-0 rounded-lg text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eqProfiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-end px-4">
                {Object.entries(eqBands).map(([freq, value]) => (
                  <EqualizerBand
                    key={freq}
                    frequency={freq}
                    value={value}
                    onChange={(v) => setEqBands({ ...eqBands, [freq]: v })}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sound Enhancement */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Sound Enhancement
              </h3>
              <div className="space-y-6">
                {Object.entries(enhancementToggles).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) =>
                          setEnhancementToggles({
                            ...enhancementToggles,
                            [key]: checked,
                          })
                        }
                      />
                      <div>
                        <p className="text-white">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-white/10"
                    >
                      <Settings className="w-4 h-4 text-white/80" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
