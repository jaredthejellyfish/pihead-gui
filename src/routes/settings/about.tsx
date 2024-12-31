import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Info,
  Radio,
  Cpu,
  HardDrive,
  Database,
  Wifi,
  Bluetooth,
  Shield,
  FileText,
  ChevronRight,
  AlertTriangle,
  Car,
  LucideIcon,
} from "lucide-react";

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
  <div 
    className={`flex items-center justify-between py-3 ${onClick ? 'cursor-pointer hover:bg-white/5' : ''}`}
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
  </div>
);

export default function AboutPage() {
  const [diagRunning, setDiagRunning] = useState(false);

  const runDiagnostics = () => {
    setDiagRunning(true);
    setTimeout(() => setDiagRunning(false), 3000);
  };

  return (
    <div className="h-full bg-black text-white overflow-scroll aspect-video">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black pointer-events-none" />

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
                <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <Car className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-white">Vehicle Head Unit</h3>
                  <p className="text-gray-400">Model VHU-2024</p>
                </div>
              </div>

              <div className="divide-y divide-white/10">
                <InfoRow
                  icon={Radio}
                  label="Software Version"
                  value="2.1.0 (Build 2024.03.15)"
                />
                <InfoRow
                  icon={Cpu}
                  label="Hardware Version"
                  value="Rev 3.0"
                />
                <InfoRow
                  icon={Car}
                  label="Vehicle Integration"
                  value="v1.2.3"
                />
                <InfoRow
                  icon={HardDrive}
                  label="Storage"
                  value="32GB (13.2GB free)"
                />
                <InfoRow
                  icon={Database}
                  label="Map Database"
                  value="2024.Q1"
                />
                <InfoRow
                  icon={Wifi}
                  label="Wi-Fi MAC Address"
                  value="00:1B:44:11:3A:B7"
                />
                <InfoRow
                  icon={Bluetooth}
                  label="Bluetooth Address"
                  value="00:1B:44:11:3A:B8"
                />
              </div>
            </CardContent>
          </Card>

          {/* Diagnostics */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {diagRunning ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Shield className="w-5 h-5 text-green-400" />
                    )}
                    <span className="text-gray-400">
                      {diagRunning ? "Running diagnostics..." : "System functioning normally"}
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
              <h3 className="text-lg font-medium text-white mb-4">Legal & Compliance</h3>
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
              <h3 className="text-lg font-medium text-white mb-4">Reset Options</h3>
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between bg-white/5 hover:bg-white/10 text-white hover:text-white"
                >
                  Reset All Settings
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-between bg-white/5 hover:bg-white/10 text-red-400 hover:text-red-300"
                >
                  Factory Reset
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