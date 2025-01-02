import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Wifi,
  WifiOff,
  Lock,
  Signal,
  Plus,
  RefreshCw,
  Check,
  WifiHigh,
  WifiLow,
  WifiZero,
  Share2,
} from "lucide-react";

const NetworkCard = ({
  network,
  isConnected,
  signalStrength,
  isSecured,
  onClick,
}: {
  network: string;
  isConnected: boolean;
  signalStrength: number;
  isSecured: boolean;
  onClick: () => void;
}) => {
  const getSignalIcon = () => {
    const className = "w-5 h-5 text-white";
    if (signalStrength > 80) return <Wifi className={className} />;
    if (signalStrength > 60) return <WifiHigh className={className} />;
    if (signalStrength > 40) return <WifiLow className={className} />;
    return <WifiZero className={className} />;
  };

  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden hover:bg-white/10 transition-all duration-300 cursor-pointer">
      <CardContent className="p-4" onClick={onClick}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-white font-medium">{network}</p>
              <p className="text-sm text-gray-400">
                {isConnected ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isConnected && <Check className="w-5 h-5 text-green-400" />}
            {isSecured && <Lock className="w-4 h-4 text-gray-400" />}
            {getSignalIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function WiFiSettingsPage() {
  const [isWifiEnabled, setIsWifiEnabled] = useState(true);
  const [isAPMode, setIsAPMode] = useState(false);
  const [networks, setNetworks] = useState([
    {
      id: 1,
      name: "Home Network",
      isConnected: true,
      signalStrength: 90,
      isSecured: true,
    },
    {
      id: 2,
      name: "Guest Network",
      isConnected: false,
      signalStrength: 75,
      isSecured: true,
    },
    {
      id: 3,
      name: "Vehicle Hotspot",
      isConnected: false,
      signalStrength: 85,
      isSecured: true,
    },
    {
      id: 4,
      name: "Public WiFi",
      isConnected: false,
      signalStrength: 45,
      isSecured: false,
    },
    {
      id: 5,
      name: "Neighbor Network",
      isConnected: false,
      signalStrength: 30,
      isSecured: true,
    },
  ]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const toggleAPMode = () => {
    setIsAPMode(!isAPMode);
    if (!isAPMode) {
      setIsWifiEnabled(false); // Disable normal WiFi when enabling AP mode
    }
  };

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="WiFi"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* WiFi Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${
                        isWifiEnabled ? "bg-indigo-500/20" : "bg-gray-500/20"
                      } flex items-center justify-center`}
                    >
                      {isWifiEnabled ? (
                        <Wifi className="w-6 h-6 text-indigo-400" />
                      ) : (
                        <WifiOff className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">WiFi</h3>
                      <p className="text-sm text-gray-400">
                        {isWifiEnabled ? "Connected to network" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isWifiEnabled}
                    onCheckedChange={(checked) => {
                      setIsWifiEnabled(checked);
                      if (checked) setIsAPMode(false);
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* AP Mode Toggle */}
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl ${
                        isAPMode ? "bg-purple-500/20" : "bg-gray-500/20"
                      } flex items-center justify-center`}
                    >
                      <Share2
                        className={`w-6 h-6 ${
                          isAPMode ? "text-purple-400" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        Access Point
                      </h3>
                      <p className="text-sm text-gray-400">
                        {isAPMode ? "Broadcasting as 'Vehicle-AP'" : "Disabled"}
                      </p>
                    </div>
                  </div>
                  <Switch checked={isAPMode} onCheckedChange={toggleAPMode} />
                </div>
              </CardContent>
            </Card>
          </div>

          {isWifiEnabled && !isAPMode && (
            <>
              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="bg-white/5 hover:bg-white/10 hover:text-white/80"
                  onClick={handleScan}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${
                      isScanning ? "animate-spin" : ""
                    }`}
                  />
                  {isScanning ? "Scanning..." : "Scan"}
                </Button>
                <Button
                  variant="ghost"
                  className="bg-white/5 hover:bg-white/10 hover:text-white/80"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Network
                </Button>
              </div>

              {/* Available Networks */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400 px-1">
                  Available Networks
                </h3>
                <div className="space-y-2">
                  {networks.map((network) => (
                    <NetworkCard
                      key={network.id}
                      network={network.name}
                      isConnected={network.isConnected}
                      signalStrength={network.signalStrength}
                      isSecured={network.isSecured}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {isAPMode && (
            <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Access Point Settings
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Network Name (SSID)</p>
                    <p className="text-white">Vehicle-AP</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Password</p>
                    <p className="text-white font-mono">vehicle123</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Connected Devices</p>
                    <p className="text-white">0 devices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
