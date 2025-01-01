import { useState } from "react";
import {
  Sun,
  Moon,
  Eye,
  Power,
  AlertTriangle,
  ParkingSquare,
  Camera,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import SettingRow from "@/components/Settings/SettingRow";
import ThemeSelection from "@/components/Settings/ThemeSelector";

export default function DisplaySettingsPage() {
  const [brightness, setBrightness] = useState([75]);
  const [autoBrightness, setAutoBrightness] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [autoNightMode, setAutoNightMode] = useState(true);
  const [screenTimeout, setScreenTimeout] = useState([5]); // minutes when parked
  const [reverseCamera, setReverseCamera] = useState(true);
  const [glareReduction, setGlareReduction] = useState(true);
  const [theme, setTheme] = useState("purple");

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="Display"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* Brightness Controls */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <SettingRow
                icon={Eye}
                title="Auto-Brightness"
                subtitle="Adjust based on ambient light sensor"
              >
                <Switch
                  checked={autoBrightness}
                  onCheckedChange={setAutoBrightness}
                />
              </SettingRow>

              {!autoBrightness && (
                <SettingRow
                  icon={Sun}
                  title="Brightness"
                  subtitle="Manual brightness control"
                >
                  <div className="w-48">
                    <Slider
                      value={brightness}
                      onValueChange={setBrightness}
                      max={100}
                      step={1}
                    />
                  </div>
                  <span className="w-12 text-right text-gray-400">
                    {brightness}%
                  </span>
                </SettingRow>
              )}
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <ThemeSelection />

          {/* Day/Night Mode */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <SettingRow
                icon={Moon}
                title="Auto Night Mode"
                subtitle="Switch automatically based on time and location"
              >
                <Switch
                  checked={autoNightMode}
                  onCheckedChange={setAutoNightMode}
                />
              </SettingRow>

              {!autoNightMode && (
                <SettingRow
                  icon={Lightbulb}
                  title="Night Mode"
                  subtitle="Reduce brightness for night driving"
                >
                  <Switch checked={nightMode} onCheckedChange={setNightMode} />
                </SettingRow>
              )}

              <SettingRow
                icon={AlertTriangle}
                title="Glare Reduction"
                subtitle="Reduce screen glare during bright conditions"
              >
                <Switch
                  checked={glareReduction}
                  onCheckedChange={setGlareReduction}
                />
              </SettingRow>
            </CardContent>
          </Card>

          {/* Vehicle-Specific Display Settings */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <SettingRow
                icon={ParkingSquare}
                title="Screen Timeout When Parked"
                subtitle="Turn off display after inactivity while parked"
              >
                <div className="w-48">
                  <Slider
                    value={screenTimeout}
                    onValueChange={setScreenTimeout}
                    min={1}
                    max={30}
                    step={1}
                  />
                </div>
                <span className="w-16 text-right text-gray-400">
                  {screenTimeout}m
                </span>
              </SettingRow>

              <SettingRow
                icon={Camera}
                title="Reverse Camera"
                subtitle="Auto-switch to camera when in reverse"
              >
                <Switch
                  checked={reverseCamera}
                  onCheckedChange={setReverseCamera}
                />
              </SettingRow>

              <SettingRow
                icon={Power}
                title="Standby Display"
                subtitle="Show basic info while car is off"
              >
                <Select>
                  <SelectTrigger className="bg-white/10 border-0 rounded-lg text-white px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent
                    className="bg-gray-900/95 border-gray-800 text-white"
                    side="top"
                  >
                    <SelectItem
                      value="off"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Off
                    </SelectItem>
                    <SelectItem
                      value="clock"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Clock Only
                    </SelectItem>
                    <SelectItem
                      value="minimal"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Clock + Temperature
                    </SelectItem>
                    <SelectItem
                      value="full"
                      className="focus:bg-white/10 focus:text-white"
                    >
                      Full Info
                    </SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
