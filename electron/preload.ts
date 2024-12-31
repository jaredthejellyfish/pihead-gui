import { contextBridge, ipcRenderer } from 'electron'
import { Profile } from "../src/types";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  ping: () => ipcRenderer.invoke("ping"),
  // Profile management
  getProfiles: () => ipcRenderer.invoke("get-profiles"),
  addProfile: (profile: Profile) => ipcRenderer.invoke("add-profile", profile),
  updateProfile: (profile: Profile) => ipcRenderer.invoke("update-profile", profile),
  deleteProfile: (id: number) => ipcRenderer.invoke("delete-profile", id),
  setActiveProfile: (id: number) => ipcRenderer.invoke("set-active-profile", id),
  getVolume: () => ipcRenderer.invoke("get-volume"),
  setVolume: (volume: number) => ipcRenderer.invoke("set-volume", volume),
  mute: () => ipcRenderer.invoke("mute"),
  unmute: () => ipcRenderer.invoke("unmute"),
  getMuted: () => ipcRenderer.invoke("get-muted"),  
  setMuted: (muted: boolean) => ipcRenderer.invoke("set-muted", muted),
  getActiveProfile: () => ipcRenderer.invoke("get-active-profile"),
});
