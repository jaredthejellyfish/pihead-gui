import {
  ChevronRight,
  Volume2,
  Sun,
  Moon,
  Wifi,
  Bluetooth,
  Bell,
  Music,
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
import Header from "@/components/Header";2
import { useTheme } from "@/contexts/theme-provider";

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-full bg-black text-white aspect-maybevideo">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none dark:hidden h-full" />
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
              <Switch />
            </SettingRow>

            <SettingRow
              icon={Music}
              title="Music Services"
              href="/settings/music-services"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
            <SettingRow icon={Edit} title="Edit Profile" href="/profiles/edit">
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </SettingRow>
          </SettingSection>

          {/* Display Settings */}
          <SettingSection title="Display">
            <SettingRow icon={Sun} title="Brightness">
              <div className="w-32">
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </SettingRow>
            <SettingRow icon={Moon} title="Dark Mode">
              <Switch
                defaultChecked={theme === "dark"}
                onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
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
