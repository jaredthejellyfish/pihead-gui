import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  Bluetooth,
  BluetoothOff,
  Smartphone,
  Headphones,
  Watch,
  Keyboard,
  RefreshCw,
  Plus,
} from "lucide-react";

type DeviceType = "audio" | "phone" | "wearable" | "peripheral" | "other";

interface BluetoothDevice {
  id: string;
  name: string;
  type: DeviceType;
  connected: boolean;
  paired: boolean;
  batteryLevel?: number;
  signalStrength: number;
}

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case "audio":
      return Headphones;
    case "phone":
      return Smartphone;
    case "wearable":
      return Watch;
    case "peripheral":
      return Keyboard;
    default:
      return Bluetooth;
  }
};

const DeviceCard = ({
  device,
  onConnect,
  onDisconnect,
  onForget,
}: {
  device: BluetoothDevice;
  onConnect: () => void;
  onDisconnect: () => void;
  onForget: () => void;
}) => {
  const Icon = getDeviceIcon(device.type);

  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-medium">{device.name}</p>
              <p className="text-sm text-gray-400">
                {device.connected
                  ? "Connected"
                  : device.paired
                    ? "Paired"
                    : "Not paired"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {device.batteryLevel && (
              <span className="text-sm text-gray-400 mr-2">
                {device.batteryLevel}%
              </span>
            )}
            {device.paired ? (
              <>
                {device.connected ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 hover:text-white/80 text-white"
                    onClick={onDisconnect}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-white/5 hover:bg-white/10 hover:text-white/80 text-white"
                    onClick={onConnect}
                  >
                    Connect
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/5 hover:bg-white/10 hover:text-white/80 text-white"
                  onClick={onForget}
                >
                  Forget
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/5 hover:bg-white/10 hover:text-white/80 text-white"
                onClick={onConnect}
              >
                Pair
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function BluetoothSettingsPage() {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([
    {
      id: "1",
      name: "AirPods Pro",
      type: "audio",
      connected: true,
      paired: true,
      batteryLevel: 85,
      signalStrength: 90,
    },
    {
      id: "2",
      name: "iPhone 14 Pro",
      type: "phone",
      connected: false,
      paired: true,
      signalStrength: 75,
    },
    {
      id: "3",
      name: "Apple Watch",
      type: "wearable",
      connected: true,
      paired: true,
      batteryLevel: 65,
      signalStrength: 85,
    },
    {
      id: "4",
      name: "Magic Keyboard",
      type: "peripheral",
      connected: false,
      paired: true,
      batteryLevel: 45,
      signalStrength: 80,
    },
  ]);

  // @ts-expect-error -- not implemented
  const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([
    {
      id: "5",
      name: "JBL Flip 6",
      type: "audio",
      connected: false,
      paired: false,
      signalStrength: 70,
    },
    {
      id: "6",
      name: "Sony WH-1000XM4",
      type: "audio",
      connected: false,
      paired: false,
      signalStrength: 65,
    },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const handleConnect = (deviceId: string) => {
    setDevices(
      devices.map((d) =>
        d.id === deviceId
          ? { ...d, connected: true }
          : { ...d, connected: false },
      ),
    );
  };

  const handleDisconnect = (deviceId: string) => {
    setDevices(
      devices.map((d) => (d.id === deviceId ? { ...d, connected: false } : d)),
    );
  };

  const handleForget = (deviceId: string) => {
    setDevices(devices.filter((d) => d.id !== deviceId));
  };

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="Bluetooth"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* Bluetooth Toggle */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-xl ${
                      isBluetoothEnabled ? "bg-purple-500/20" : "bg-gray-500/20"
                    } flex items-center justify-center`}
                  >
                    {isBluetoothEnabled ? (
                      <Bluetooth className="w-6 h-6 text-purple-400" />
                    ) : (
                      <BluetoothOff className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Bluetooth
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isBluetoothEnabled
                        ? `${
                            devices.filter((d) => d.connected).length
                          } devices connected`
                        : "Disabled"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={isBluetoothEnabled}
                  onCheckedChange={setIsBluetoothEnabled}
                />
              </div>
            </CardContent>
          </Card>

          {isBluetoothEnabled && (
            <>
              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="bg-white/5 hover:bg-white/10"
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
                  className="bg-white/5 hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </div>

              {/* Connected & Paired Devices */}
              {devices.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-400 px-1">
                    My Devices
                  </h3>
                  <div className="space-y-2">
                    {devices.map((device) => (
                      <DeviceCard
                        key={device.id}
                        device={device}
                        onConnect={() => handleConnect(device.id)}
                        onDisconnect={() => handleDisconnect(device.id)}
                        onForget={() => handleForget(device.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Available Devices */}
              {availableDevices.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-400 px-1">
                    Available Devices
                  </h3>
                  <div className="space-y-2">
                    {availableDevices.map((device) => (
                      <DeviceCard
                        key={device.id}
                        device={device}
                        onConnect={() => {}}
                        onDisconnect={() => {}}
                        onForget={() => {}}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
