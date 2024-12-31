import { useState, useEffect } from "react";

interface UseMasterVolumeReturn {
  masterVolume: number;
  isMasterMuted: boolean;
  setMasterVolume: (newVolume: number) => Promise<void>;
  toggleMasterMute: () => Promise<void>;
}

export function useMasterVolume(isOpen: boolean): UseMasterVolumeReturn {
  const [masterVolume, setMasterVolumeState] = useState<number>(80);
  const [isMasterMuted, setIsMasterMuted] = useState(false);

  useEffect(() => {
    const syncSystemVolume = async () => {
      try {
        const systemVolume = await window.electron.getVolume();
        const isMuted = await window.electron.getMuted();
        setMasterVolumeState(systemVolume);
        setIsMasterMuted(isMuted);
      } catch (error) {
        console.error("Failed to sync system volume:", error);
      }
    };

    if (isOpen) {
      syncSystemVolume();
    }
  }, [isOpen]);

  const setMasterVolume = async (newVolume: number) => {
    // Optimistically update the state
    setMasterVolumeState(newVolume);

    try {
      if (Math.floor(newVolume) === 0) {
        await window.electron.mute();
        setIsMasterMuted(true);
      } else {
        await window.electron.setVolume(newVolume);
        setIsMasterMuted(false);
      }
    } catch (error) {
      // Revert to previous state if the system call fails
      setMasterVolumeState(masterVolume);
      console.error("Failed to set system volume:", error);
    }
  };

  const toggleMasterMute = async () => {
    try {
      const newMutedState = !isMasterMuted;
      await window.electron.setMuted(newMutedState);
      setIsMasterMuted(newMutedState);

      // If unmuting, restore the previous volume
      if (!newMutedState) {
        await setMasterVolume(masterVolume < 5 ? 5 : masterVolume);
      }
    } catch (error) {
      console.error("Failed to toggle mute:", error);
    }
  };

  return {
    masterVolume,
    isMasterMuted,
    setMasterVolume,
    toggleMasterMute,
  };
}
