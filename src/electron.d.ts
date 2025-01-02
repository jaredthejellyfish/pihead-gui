/* eslint-disable */
/* @typescript-eslint-disable */

import type { Profile, DiskStorage } from "./types";

export interface IElectronAPI {
  ipcRenderer: {
    on(channel: string, func: (...args: any[]) => void): void;
    off(channel: string, func: (...args: any[]) => void): void;
    send(channel: string, ...args: any[]): void;
    invoke(channel: string, ...args: any[]): Promise<any>;
  };
  ping: () => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
    electron: {
      ping: () => Promise<string>;
      // Profile management
      getProfiles: () => Promise<Profile[]>;
      addProfile: (profile: Profile) => Promise<Profile>;
      updateProfile: (profile: Profile) => Promise<Profile | null>;
      deleteProfile: (id: string) => Promise<boolean>;
      setActiveProfile: (id?: string) => Promise<Profile | null>;
      getVolume: () => Promise<number>;
      setVolume: (volume: number) => Promise<void>;
      mute: () => Promise<void>;
      unmute: () => Promise<void>;
      getMuted: () => Promise<boolean>;
      setMuted: (muted: boolean) => Promise<void>;
      getActiveProfile: () => Promise<Profile | null>;
      getAppVersion: () => Promise<string>;
      getDiskStorage: () => Promise<DiskStorage>;
      getMacAddresses: () => Promise<{ wifi: string | null; bluetooth: string | null }>;
    };
  }
}
