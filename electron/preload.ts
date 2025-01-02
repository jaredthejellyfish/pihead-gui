import { contextBridge, ipcRenderer } from "electron";
import type { Profile } from "@/types";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  ping: () => ipcRenderer.invoke("ping"),
  // Profile management
  getProfiles: () => ipcRenderer.invoke("get-profiles"),
  addProfile: (profile: Profile) => ipcRenderer.invoke("add-profile", profile),
  updateProfile: (profile: Profile) =>
    ipcRenderer.invoke("update-profile", profile),
  deleteProfile: (id: string) => ipcRenderer.invoke("delete-profile", id),
  setActiveProfile: (id?: string) =>
    ipcRenderer.invoke("set-active-profile", id),
  getVolume: () => ipcRenderer.invoke("get-volume"),
  setVolume: (volume: number) => ipcRenderer.invoke("set-volume", volume),
  mute: () => ipcRenderer.invoke("mute"),
  unmute: () => ipcRenderer.invoke("unmute"),
  getMuted: () => ipcRenderer.invoke("get-muted"),
  setMuted: (muted: boolean) => ipcRenderer.invoke("set-muted", muted),
  getActiveProfile: () => ipcRenderer.invoke("get-active-profile"),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  getDiskStorage: () => ipcRenderer.invoke("get-disk-storage"),
  getMacAddresses: () => ipcRenderer.invoke("get-mac-addresses"),
  getDeviceName: () => ipcRenderer.invoke("get-device-name"),
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
  performUpdate: () => ipcRenderer.invoke("perform-update"),
});
