import type { Theme } from "./contexts/theme-provider";

export type Profile = {
  id?: string;
  name: string;
  theme: Theme;
  isActive: boolean;
  lastTrip?: string;

  // display settings
  brightness: number;
  autoBrightness: boolean;
  autoNightMode: boolean;
  screenTimeout: number;
  reverseCamera: boolean;
  glareReduction: boolean;
  standbyDisplay: boolean;

  // general settings
  notifications: boolean;

  // sound settings
  eqBands: Bands;
  balance: { x: number; y: number };
  loudness: boolean;
  surround: boolean;
  dynamicEQ: boolean;
  roadNoiseCompensation: boolean;
};

export type DiskStorage = {
  free: number;
  total: number;
  used: number;
};

export type Bands =   {
  id: string,
  name: string,
  description: string,
  bands: {
    "60": number,
    "170": number,
    "310": number,
    "600": number,
    "1000": number,
    "3000": number,
    "6000": number,
    "12000": number,
    "14000": number,
    "16000": number,
  },
}