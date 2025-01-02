import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {};

function IsOnline({}: Props) {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // Update online status when the network status changes
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Add event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // Empty dependency array since we only want to set up listeners once
  return isOnline ? (
    <Wifi className="text-indigo-400" />
  ) : (
    <WifiOff className="text-indigo-400 opacity-65" />
  );
}

export default IsOnline;
