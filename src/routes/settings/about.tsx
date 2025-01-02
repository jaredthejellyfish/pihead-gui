import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Info,
  Radio,
  HardDrive,
  Wifi,
  Bluetooth,
  Shield,
  FileText,
  ChevronRight,
  AlertTriangle,
  Car,
  type LucideIcon,
  Cpu,
} from "lucide-react";
import { useMutateProfile } from "@/hooks/useMutateProfile";
import { defaultEQProfile } from "@/data/eq-profiles";
import type { AppData } from "@/types";

const InfoRow = ({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  onClick?: () => void;
}) => (
  <button
    type="button"
    className={`flex items-center justify-between py-3 w-full ${
      onClick ? "cursor-pointer hover:bg-white/5" : ""
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <span className="text-gray-400">{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-white">{value}</span>
      {onClick && <ChevronRight className="w-4 h-4 text-gray-400" />}
    </div>
  </button>
);



export default function AboutPage() {
  const [diagRunning, setDiagRunning] = useState(false);
  const { mutateProfile } = useMutateProfile();
  const [appData, setAppData] = useState<AppData>({
    appVersion: "",
    diskStorage: {
      free: 0,
      total: 0,
      used: 0,
    },
    deviceName: "",
    macAddresses: {
      wifi: null,
      bluetooth: null,
    },
  });


  const runDiagnostics = () => {
    setDiagRunning(true);
    setTimeout(() => setDiagRunning(false), 3000);
  };

  const getAppData = useCallback(async () => {
    const version = await window.electron.getAppVersion();
    const diskStorage = await window.electron.getDiskStorage();
    const macAddresses = await window.electron.getMacAddresses();
    const deviceName = await window.electron.getDeviceName();
    setAppData({
      appVersion: version,
      diskStorage,
      deviceName,
      macAddresses,
    });
  }, []);

  useEffect(() => {
    getAppData();
  }, [getAppData]);

  async function resetAllSettings() {
    await mutateProfile({
      // display settings
      brightness: 75,
      autoBrightness: true,
      autoNightMode: true,
      screenTimeout: 10,
      reverseCamera: true,
      glareReduction: true,
      standbyDisplay: true,

      // general settings
      notifications: true,

      // sound settings
      eqBands: defaultEQProfile,
      balance: { x: 0, y: 0 },
      loudness: true,
      surround: true,
      dynamicEQ: false,
      roadNoiseCompensation: true,
    });
  }

  return (
    <div className="h-full bg-black text-white overflow-scroll ">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-black pointer-events-none dark:opacity-0 h-full transition-opacity duration-300" />

      <div className="relative h-full p-8">
        <Header
          title="About"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* System Info */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                  <Car className="w-10 h-10 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    Vehicle Head Unit
                  </h3>
                  <p className="text-gray-400">Model VHU-2024</p>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                <InfoRow
                  icon={Radio}
                  label="Software Version"
                  value={appData.appVersion}
                />
                <InfoRow
                  icon={Cpu}
                  label="Device Name"
                  value={appData.deviceName}
                />
                <InfoRow
                  icon={HardDrive}
                  label="Storage"
                  value={`${appData.diskStorage.total}GB (${appData.diskStorage.free}GB free)`}
                />
                <InfoRow
                  icon={Wifi}
                  label="Wi-Fi MAC Address"
                  value={appData.macAddresses.wifi || "N/A"}
                />
                <InfoRow
                  icon={Bluetooth}
                  label="Bluetooth Address"
                  value={appData.macAddresses.bluetooth || "N/A"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Diagnostics */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                System Health
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {diagRunning ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Shield className="w-5 h-5 text-green-400" />
                    )}
                    <span className="text-gray-400">
                      {diagRunning
                        ? "Running diagnostics..."
                        : "System functioning normally"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="bg-white/5 hover:bg-white/10 text-white hover:text-white"
                    onClick={runDiagnostics}
                    disabled={diagRunning}
                  >
                    Run Diagnostics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal & Compliance */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Legal & Compliance
              </h3>
              <div className="space-y-1 divide-y divide-white/10">
                <InfoRow
                  icon={FileText}
                  label="Open Source Licenses"
                  value="View"
                  onClick={() => {}}
                />
                <InfoRow
                  icon={Shield}
                  label="Privacy Policy"
                  value="View"
                  onClick={() => {}}
                />
                <InfoRow
                  icon={Info}
                  label="Terms of Service"
                  value="View"
                  onClick={() => {}}
                />
                <InfoRow
                  icon={Shield}
                  label="Regulatory"
                  value="View"
                  onClick={() => {}}
                />
              </div>
            </CardContent>
          </Card>

          {/* Reset Options */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">
                Reset Options
              </h3>
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between bg-white/5 hover:bg-white/10 text-white hover:text-white"
                  onClick={resetAllSettings}
                >
                  Reset All Settings
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-gray-400 space-y-1">
            <p>© 2024 Vehicle Systems Inc. All rights reserved.</p>
            <p>Patents: pat.pending/123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}
