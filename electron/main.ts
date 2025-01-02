/* eslint-disable */

import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
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
import type { Profile, UpdateData } from "@/types";
import loudness from "loudness";
import os from "node:os";
import { exec } from "node:child_process";
import { autoUpdater } from "electron-updater";
import isDev from "electron-is-dev";

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
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
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
    title: "PiHead",
    width: 1280,
    height: 720,
    resizable: isDev,
    movable: isDev,
    closable: isDev,
    frame: isDev,
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

ipcMain.handle("delete-profile", (_, id: string) => {
  return deleteProfile(id);
});

ipcMain.handle("set-active-profile", (_, id: string) => {
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

ipcMain.handle("get-app-version", () => {
  return app.getVersion();
});

const getRootPath = () => {
  switch (process.platform) {
    case "win32":
      return "C:\\";
    case "darwin":
      return "/";
    default:
      return "/";
  }
};

ipcMain.handle("get-disk-storage", () => {
  try {
    const rootPath = getRootPath();
    const stats = fs.statfsSync(rootPath);

    // Convert bytes to GB and round to 1 decimal place
    const blockSize = stats.bsize;
    const totalBlocks = stats.blocks;
    const freeBlocks = stats.bfree;

    const totalGB =
      Math.round(((totalBlocks * blockSize) / 1024 / 1024 / 1024) * 10) / 10;
    const freeGB =
      Math.round(((freeBlocks * blockSize) / 1024 / 1024 / 1024) * 10) / 10;
    const usedGB = Math.round((totalGB - freeGB) * 10) / 10;

    return {
      free: freeGB,
      total: totalGB,
      used: usedGB,
    };
  } catch (error) {
    console.error("Error fetching disk space:", error);
    throw error;
  }
});

ipcMain.handle("get-mac-addresses", async () => {
  try {
    const interfaces = os.networkInterfaces();
    const macAddresses: { wifi: string | null; bluetooth: string | null } = {
      wifi: null,
      bluetooth: null,
    };

    for (const [ifaceName, ifaceDetails] of Object.entries(interfaces)) {
      if (!ifaceDetails) continue;

      for (const details of ifaceDetails) {
        if (!details.internal && details.mac !== "00:00:00:00:00:00") {
          const lowerIfaceName = ifaceName.toLowerCase();

          // Identify Wi-Fi interfaces
          if (
            lowerIfaceName.includes("wifi") || // Common Wi-Fi naming
            lowerIfaceName.includes("wlan") || // Linux
            lowerIfaceName.startsWith("en") // macOS (e.g., en0 for Wi-Fi)
          ) {
            macAddresses.wifi = details.mac;
          }

          // Identify Bluetooth interfaces
          if (
            lowerIfaceName.includes("bluetooth") || // Common Bluetooth naming
            lowerIfaceName.includes("bt") || // Linux/Mac naming
            lowerIfaceName.includes("pan") // Personal Area Network (used for Bluetooth on some systems)
          ) {
            macAddresses.bluetooth = details.mac;
          }
        }
      }
    }

    return macAddresses;
  } catch (error) {
    console.error("Error fetching MAC addresses:", error);
    throw error;
  }
});

ipcMain.handle("get-device-name", async () => {
  const platform = os.platform();

  return new Promise((resolve, reject) => {
    if (platform === "darwin") {
      // macOS: Use system_profiler to get the model
      exec(
        "system_profiler SPHardwareDataType | grep 'Model Identifier'",
        (error: Error | null, stdout: string) => {
          if (error) return reject(error);
          const match = stdout.match(/Model Identifier: (.+)/);
          resolve(match ? match[1].trim() : "Unknown Mac Model");
        }
      );
    } else if (platform === "linux") {
      // Linux: Check the model name
      exec(
        "cat /proc/device-tree/model 2>/dev/null || echo 'Unknown Linux Device'",
        (error: Error | null, stdout: string) => {
          if (error) return reject(error);
          resolve(stdout.trim());
        }
      );
    } else if (platform === "win32") {
      // Windows: Use WMIC to get the model
      exec(
        "wmic computersystem get model",
        (error: Error | null, stdout: string) => {
          if (error) return reject(error);
          const lines = stdout.trim().split("\n");
          resolve(lines[1]?.trim() || "Unknown Windows Device");
        }
      );
    } else {
      resolve("Unsupported Platform");
    }
  });
});

// title: string;
// version: string;
// size: string;
// date: string;
// status: "available" | "downloading" | "ready" | "installed" | "failed";
// progress?: number;
// notes: string[];

ipcMain.handle("check-for-updates", async () => {
  try {
    const result = await autoUpdater.checkForUpdates();
    const { version, releaseNotes, releaseDate, releaseName} = result?.updateInfo || {};
    
    // Convert releaseNotes to string array
    const notes = Array.isArray(releaseNotes) 
      ? releaseNotes.map(note => typeof note === 'string' ? note : note.note)
      : releaseNotes 
        ? [releaseNotes.toString()]
        : [];

    return {
      updateAvailable: !!version,
      version,
      changelog: releaseNotes || "No changelog available.",
      date: releaseDate || "No release date available.",
      size: "100MB",
      title: releaseName || "No release name available.",
      progress: 0,
      notes,
    } as UpdateData;
  } catch (error) {
    console.error("Error checking for updates:", error);
    return {
      updateAvailable: false,
      version: undefined,
      changelog: "Error checking for updates.",
    };
  }
});

ipcMain.handle("perform-update", () => {
  try {
    autoUpdater.quitAndInstall();
  } catch (error) {
    console.error("Error performing update:", error);
    return {
      success: false,
      error: "Error performing update.",
    };
  }
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
