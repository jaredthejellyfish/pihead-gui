/* eslint-disable */

import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import contextMenu from "electron-context-menu";
import "./database";
import {
  addProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  setActiveProfile,
  getActiveProfile,
} from "./database";
import { Profile } from "../src/types";
import loudness from "loudness";

// @ts-expect-error - Electron doesn't support ES modules
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │

process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

// Add this before creating the browser window
contextMenu({
  showInspectElement: true,
  showSearchWithGoogle: true,
  showCopyImage: true,
  showCopyImageAddress: true,
  showSaveImageAs: true,
});

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false, // Security best practice
      contextIsolation: true, // Security best practice
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Add these IPC handlers after createWindow definition
ipcMain.handle("ping", () => {
  console.log("Received ping from renderer");
  return "pong";
});

// IPC Handlers
ipcMain.handle("get-profiles", () => {
  return getProfiles();
});

ipcMain.handle("get-volume", async () => {
  return await loudness.getVolume(); // Returns current volume as a percentage
});

ipcMain.handle("set-volume", async (_, volume: number) => {
  await loudness.setVolume(volume); // Sets volume (0-100)
});

ipcMain.handle("mute", async () => {
  await loudness.setMuted(true); // Mutes the system
});

ipcMain.handle("unmute", async () => {
  await loudness.setMuted(false); // Unmutes the system
});

ipcMain.handle("add-profile", (_, profile: Profile) => {
  return addProfile(profile);
});

ipcMain.handle("update-profile", (_, profile: Profile) => {
  return updateProfile(profile);
});

ipcMain.handle("delete-profile", (_, id: number) => {
  return deleteProfile(id);
});

ipcMain.handle("set-active-profile", (_, id: number) => {
  return setActiveProfile(id);
});

ipcMain.handle("get-active-profile", () => {
  return getActiveProfile();
});

ipcMain.handle("get-muted", async () => {
  return await loudness.getMuted();
});

ipcMain.handle("set-muted", async (_, muted: boolean) => {
  await loudness.setMuted(muted);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
