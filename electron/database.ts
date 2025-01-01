import { app } from "electron";
import fs from "node:fs";
import path from "node:path";
import type { Profile } from "../src/types";

const appDataPath = app.getPath("userData");
const dbPath = path.join(appDataPath, "profiles.json");

// Initialize database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ profiles: [] }));
}

// Read profiles from database
export const getProfiles = (): Profile[] => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(data).profiles;
  } catch (error) {
    console.error("Error reading profiles:", error);
    return [];
  }
};

export const getActiveProfile = (): Profile | undefined => {
  try {
    const profiles = getProfiles();
    const active = profiles.find((p) => p.isActive);

    return active;
  } catch {
    console.error();
  }
};

// Save profiles to database
export const saveProfiles = (profiles: Profile[]): void => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify({ profiles }, null, 2));
  } catch (error) {
    console.error("Error saving profiles:", error);
  }
};

// Add a new profile
export const addProfile = (profile: Profile): Profile => {
  const profiles = getProfiles();
  const newProfile = {
    ...profile,
    id: Date.now(), // Simple way to generate unique IDs
    isActive: false,
  };
  profiles.push(newProfile);
  saveProfiles(profiles);
  return newProfile;
};

// Update a profile
export const updateProfile = (profile: Profile): Profile | null => {
  const profiles = getProfiles();
  const index = profiles.findIndex((p) => p.id === profile.id);
  if (index === -1) return null;

  profiles[index] = profile;
  saveProfiles(profiles);
  return profile;
};

// Delete a profile
export const deleteProfile = (id: number): boolean => {
  const profiles = getProfiles();
  const filteredProfiles = profiles.filter((p) => p.id !== id);
  if (filteredProfiles.length === profiles.length) return false;

  saveProfiles(filteredProfiles);
  return true;
};

// Set active profile
export const setActiveProfile = (id: number): Profile | null => {
  const profiles = getProfiles();
  const updatedProfiles = profiles.map((profile) => ({
    ...profile,
    isActive: profile.id === id,
  }));

  saveProfiles(updatedProfiles);
  return updatedProfiles.find((p) => p.id === id) || null;
};
