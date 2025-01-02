import {
  ChevronRight,
  Volume2,
  Sun,
  Moon,
  Wifi,
  Bluetooth,
  Bell,
  RefreshCw,
  Info,
  Trash,
  Edit,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import QuickSettingsSection from "@/components/Settings/QuickSettingsSection";
import SettingSection from "@/components/Settings/SettingSection";
import SettingRow from "@/components/Settings/SettingRow";
import Header from "@/components/Header";
import { useTheme } from "@/contexts/theme-provider";
import { useEffect, useState } from "react";
import { useMutateProfile } from "@/hooks/useMutateProfile";
import { useActiveProfile } from "@/contexts/active-profile-provider";
import { DEFAULT_DISPLAY_SETTINGS, DEFAULT_GENERAL_SETTINGS } from "@/constants/defaults";

export default function SettingsScreen() {
  const { theme, setTheme, lastTheme } = useTheme();
  const { mutateProfile } = useMutateProfile();
  const { activeProfile } = useActiveProfile();

  const [settings, setSettings] = useState({
    notifications: activeProfile?.notifications ?? DEFAULT_GENERAL_SETTINGS.notifications,
    brightness: activeProfile?.brightness ?? DEFAULT_DISPLAY_SETTINGS.brightness,
  });

  useEffect(() => {
    mutateProfile(settings);
  }, [settings, mutateProfile]);

  const updateSettings = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="h-full text-white ">
      <div className="relative h-full p-8 mx-auto">
        {/* Header */}
        <Header
          title="Settings"
          backHref="/profiles"
          settingsHref="/"
          showSettings={false}
        />

        <div className="space-y-6 mx-auto pb-7">
          {/* Quick Settings */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <QuickSettingsSection
                  icon={Wifi}
                  title="Wi-Fi"
                  iconColor="blue"
                  href="/settings/wifi"
                />
                <QuickSettingsSection
                  icon={Bluetooth}
                  title="Bluetooth"
                  iconColor="purple"
                  href="/settings/bluetooth"
                />
                <QuickSettingsSection
                  icon={Sun}
                  title="Display"
                  iconColor="indigo"
                  href="/settings/display"
                />
                <QuickSettingsSection
                  icon={Volume2}
                  title="Sound"
                  iconColor="green"
                  href="/settings/sound"
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <SettingSection title="Profile">
            <SettingRow icon={Bell} title="Notifications">
              <Switch
                name="notifications"
                defaultChecked={settings.notifications}
                onCheckedChange={(value) =>
                  updateSettings("notifications", value)
                }
              />
            </SettingRow>

            <SettingRow
              icon={Edit}
              title="Edit Profile"
              href="/settings/profile/edit"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
          </SettingSection>

          {/* Display Settings */}
          <SettingSection title="Display">
            <SettingRow icon={Sun} title="Brightness">
              <div className="w-32">
                <Slider
                  max={100}
                  step={1}
                  onValueChange={(value) =>
                    updateSettings("brightness", value[0])
                  }
                  value={[settings.brightness]}
                />
              </div>
            </SettingRow>
            <SettingRow icon={Moon} title="Dark Mode">
              <Switch
                defaultChecked={theme === "dark"}
                onCheckedChange={(value) =>
                  setTheme(value ? "dark" : lastTheme)
                }
              />
            </SettingRow>
          </SettingSection>

          {/* System Settings */}
          <SettingSection title="System">
            <SettingRow
              icon={RefreshCw}
              title="Software Update"
              href="/settings/update"
            >
              <span className="text-gray-400 mr-2">Version 2.1.0</span>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
            <SettingRow icon={Info} title="About" href="/settings/about">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
          </SettingSection>

          <SettingSection title="Delete Profile">
            <SettingRow
              icon={Trash}
              title="Delete Profile"
              href="/settings/profile/delete"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
          </SettingSection>
        </div>
      </div>
    </div>
  );
}
