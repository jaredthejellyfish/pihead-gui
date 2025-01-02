import { useEffect, useState } from "react";
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
import SettingRow from "@/components/Settings/SettingRow";
import ThemeSelection from "@/components/Settings/ThemeSelector";
import { useTheme } from "@/contexts/theme-provider";
import { useMutateProfile } from "@/hooks/useMutateProfile";
import { useActiveProfile } from "@/contexts/active-profile-provider";
import { DEFAULT_DISPLAY_SETTINGS } from "@/constants/defaults";

export default function DisplaySettingsPage() {
  const { mutateProfile } = useMutateProfile();
  const { activeProfile } = useActiveProfile();
  const { theme } = useTheme();

  const [settings, setSettings] = useState({
    brightness: activeProfile?.brightness ?? DEFAULT_DISPLAY_SETTINGS.brightness,
    autoBrightness: activeProfile?.autoBrightness ?? DEFAULT_DISPLAY_SETTINGS.autoBrightness,
    autoNightMode: activeProfile?.autoNightMode ?? DEFAULT_DISPLAY_SETTINGS.autoNightMode,
    screenTimeout: activeProfile?.screenTimeout ?? DEFAULT_DISPLAY_SETTINGS.screenTimeout,
    reverseCamera: activeProfile?.reverseCamera ?? DEFAULT_DISPLAY_SETTINGS.reverseCamera,
    glareReduction: activeProfile?.glareReduction ?? DEFAULT_DISPLAY_SETTINGS.glareReduction,
    standbyDisplay: activeProfile?.standbyDisplay ?? DEFAULT_DISPLAY_SETTINGS.standbyDisplay,
    theme: theme ?? DEFAULT_DISPLAY_SETTINGS.theme,
  });

  useEffect(() => {
    mutateProfile(settings);
  }, [settings]);

  const [standbyMode, setStandbyMode] = useState("minimal");

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

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
                  checked={settings.autoBrightness}
                  onCheckedChange={(value) =>
                    updateSetting("autoBrightness", value)
                  }
                />
              </SettingRow>

              {!settings.autoBrightness && (
                <SettingRow
                  icon={Sun}
                  title="Brightness"
                  subtitle="Manual brightness control"
                >
                  <div className="w-48">
                    <Slider
                      value={[settings.brightness]}
                      onValueChange={(value) =>
                        updateSetting("brightness", value[0])
                      }
                      max={100}
                      step={1}
                    />
                  </div>
                  <span className="w-12 text-right text-gray-400">
                    {settings.brightness}%
                  </span>
                </SettingRow>
              )}
            </CardContent>
          </Card>

          {/* Theme Selection */}
          <ThemeSelection
            onThemeChange={(theme) => {
              updateSetting("theme", theme);
            }}
          />

          {/* Day/Night Mode */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <SettingRow
                icon={Moon}
                title="Auto Night Mode"
                subtitle="Switch automatically based on time and location"
              >
                <Switch
                  checked={settings.autoNightMode}
                  onCheckedChange={(value) =>
                    updateSetting("autoNightMode", value)
                  }
                />
              </SettingRow>

              <SettingRow
                icon={AlertTriangle}
                title="Glare Reduction"
                subtitle="Reduce screen glare during bright conditions"
              >
                <Switch
                  checked={settings.glareReduction}
                  onCheckedChange={(value) =>
                    updateSetting("glareReduction", value)
                  }
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
                    value={[settings.screenTimeout]}
                    onValueChange={(value) =>
                      updateSetting("screenTimeout", value[0])
                    }
                    min={1}
                    max={30}
                    step={1}
                  />
                </div>
                <span className="w-16 text-right text-gray-400">
                  {settings.screenTimeout}m
                </span>
              </SettingRow>

              <SettingRow
                icon={Camera}
                title="Reverse Camera"
                subtitle="Auto-switch to camera when in reverse"
              >
                <Switch
                  checked={settings.reverseCamera}
                  onCheckedChange={(value) =>
                    updateSetting("reverseCamera", value)
                  }
                />
              </SettingRow>

              <SettingRow
                icon={Power}
                title="Standby Display"
                subtitle="Show basic info while car is off"
              >
                <Switch
                  checked={settings.standbyDisplay}
                  onCheckedChange={(value) =>
                    updateSetting("standbyDisplay", value)
                  }
                />
              </SettingRow>

              {settings.standbyDisplay && (
                <SettingRow
                  icon={Lightbulb}
                  title="Standby Mode"
                  subtitle="Choose what information to display"
                >
                  <Select value={standbyMode} onValueChange={setStandbyMode}>
                    <SelectTrigger className="bg-white/10 border-0 rounded-lg text-white px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent
                      className="bg-gray-900/95 border-gray-800 text-white"
                      side="top"
                    >
                      <SelectItem
                        value={"false"}
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
