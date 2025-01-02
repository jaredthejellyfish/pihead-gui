import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import {
  RefreshCw,
  Download,
  Check,
  Clock,
  Info,
  AlertTriangle,
  Cpu,
  HardDrive,
  Radio,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import type { AppData, UpdateData } from "@/types";

const SystemInfoRow = ({
  icon: Icon,
  label,
  value,
  status = "normal",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  status?: "normal" | "warning" | "error";
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "warning":
        return "text-yellow-400";
      case "error":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
          <Icon className={`w-5 h-5 ${getStatusColor()}`} />
        </div>
        <span className="text-gray-400">{label}</span>
      </div>
      <span className="text-white">{value}</span>
    </div>
  );
};

const UpdateCard = ({
  title,
  version,
  size,
  date,

  progress,
  notes,
}: {
  title: string;
  version: string;
  size: string;
  date: string;

  progress?: number;
  notes: string[];
}) => {
  const getStatusDetails = () => {
    switch (status) {
      case "available":
        return {
          icon: Download,
          text: "Available to download",
          color: "text-indigo-400",
          bgColor: "bg-indigo-500/20",
        };
      case "downloading":
        return {
          icon: RefreshCw,
          text: "Downloading...",
          color: "text-purple-400",
          bgColor: "bg-purple-500/20",
        };
      case "ready":
        return {
          icon: Clock,
          text: "Ready to install",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
        };
      case "installed":
        return {
          icon: Check,
          text: "Installed",
          color: "text-green-400",
          bgColor: "bg-green-500/20",
        };
      case "failed":
        return {
          icon: AlertTriangle,
          text: "Installation failed",
          color: "text-red-400",
          bgColor: "bg-red-500/20",
        };
      default:
        return {
          icon: Info,
          text: "Unknown",
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
        };
    }
  };

  const details = getStatusDetails();
  const StatusIcon = details.icon;

  return (
    <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <p className="text-sm text-gray-400">Version {version}</p>
            </div>
            <div
              className={`px-3 py-1.5 rounded-full ${details.bgColor} flex items-center space-x-2`}
            >
              <StatusIcon
                className={`w-4 h-4 ${details.color} ${
                  status === "downloading" ? "animate-spin" : ""
                }`}
              />
              <span className={`text-sm ${details.color}`}>{details.text}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{size}</span>
            <span>•</span>
            <span>{date}</span>
          </div>

          {status === "downloading" && progress !== undefined && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Downloading...</span>
                <span className="text-gray-400">{progress}%</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white">What's New:</h4>
            <ul className="space-y-1">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-400 flex items-start space-x-2"
                >
                  <span>•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SoftwareUpdatePage() {
  const [checkingUpdates, setCheckingUpdates] = useState(false);
  const [appData, setAppData] = useState<Partial<AppData>>({
    appVersion: "",
    deviceName: "",
    diskStorage: {
      total: 0,
      used: 0,
      free: 0,
    },
  });

  const [updateData, setUpdateData] = useState<Partial<UpdateData>>({
    updateAvailable: false,
    version: "",
    changelog: "",
    date: "",
    size: "",
    title: "",
    status: "",
    progress: 0,
    notes: [],
  });

  const getAppData = useCallback(async () => {
    const version = await window.electron.getAppVersion();
    const diskStorage = await window.electron.getDiskStorage();
    const deviceName = await window.electron.getDeviceName();
    setAppData({
      appVersion: version,
      diskStorage,
      deviceName,
    });
  }, []);

  const checkForUpdates = async () => {
    setCheckingUpdates(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const result = await window.electron.checkForUpdates();
    setUpdateData(result);
    setCheckingUpdates(false);
  };

  useEffect(() => {
    getAppData();
  }, [getAppData]);

  return (
    <div className="h-full text-white overflow-scroll ">
      <div className="relative h-full p-8">
        <Header
          title="Software Update"
          backHref="/settings"
          settingsHref="/settings"
          showSettings={false}
        />

        <div className="space-y-6 pb-6">
          {/* System Status */}
          <Card className="bg-white/5 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  System Information
                </h3>
                <Button
                  variant="ghost"
                  className="bg-white/5 hover:bg-white/10 text-white"
                  onClick={async () => await checkForUpdates()}
                  disabled={checkingUpdates}
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${
                      checkingUpdates ? "animate-spin" : ""
                    }`}
                  />
                  Check for Updates
                </Button>
              </div>
              <div className="divide-y divide-white/10">
                <SystemInfoRow
                  icon={Radio}
                  label="Current Version"
                  value={appData.appVersion ?? ""}
                />
                <SystemInfoRow
                  icon={Cpu}
                  label="System Type"
                  value={appData.deviceName ?? "N/A"}
                />
                <SystemInfoRow
                  icon={HardDrive}
                  label="Storage Available"
                  value={`${appData.diskStorage?.free} GB`}
                  status="warning"
                />
              </div>
            </CardContent>
          </Card>

          {updateData.updateAvailable && (
            <UpdateCard
              title={updateData.title ?? "System Update"}
              version={updateData.version ?? "2.2.0"}
              size={updateData.size ?? "842 MB"}
              date={updateData.date ?? "March 30, 2024"}
              notes={updateData.notes ?? []}
            />
          )}

          {/* Warning Card */}
          <Card className="bg-orange-500/20 border-0 backdrop-blur-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <AlertCircle className="w-6 h-6 text-orange-400" />
                <div>
                  <p className="text-orange-200 font-medium">
                    Important Update Notice
                  </p>
                  <p className="text-sm text-orange-200/80 mt-1">
                    Vehicle must be in park with the engine running during
                    software updates. Updates typically take 1-2 minutes to
                    complete.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
