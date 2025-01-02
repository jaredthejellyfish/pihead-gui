"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  ping: () => electron.ipcRenderer.invoke("ping"),
  // Profile management
  getProfiles: () => electron.ipcRenderer.invoke("get-profiles"),
  addProfile: (profile) => electron.ipcRenderer.invoke("add-profile", profile),
  updateProfile: (profile) => electron.ipcRenderer.invoke("update-profile", profile),
  deleteProfile: (id) => electron.ipcRenderer.invoke("delete-profile", id),
  setActiveProfile: (id) => electron.ipcRenderer.invoke("set-active-profile", id),
  getVolume: () => electron.ipcRenderer.invoke("get-volume"),
  setVolume: (volume) => electron.ipcRenderer.invoke("set-volume", volume),
  mute: () => electron.ipcRenderer.invoke("mute"),
  unmute: () => electron.ipcRenderer.invoke("unmute"),
  getMuted: () => electron.ipcRenderer.invoke("get-muted"),
  setMuted: (muted) => electron.ipcRenderer.invoke("set-muted", muted),
  getActiveProfile: () => electron.ipcRenderer.invoke("get-active-profile"),
  getAppVersion: () => electron.ipcRenderer.invoke("get-app-version"),
  getDiskStorage: () => electron.ipcRenderer.invoke("get-disk-storage"),
  getMacAddresses: () => electron.ipcRenderer.invoke("get-mac-addresses")
});
