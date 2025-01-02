import { Theme } from "@/contexts/theme-provider";

export const DEFAULT_DISPLAY_SETTINGS = {
  brightness: 75,
  autoBrightness: true,
  autoNightMode: true,
  screenTimeout: 5,
  reverseCamera: true,
  glareReduction: true,
  standbyDisplay: true,
  theme: "purple" as Theme,
};

export const DEFAULT_GENERAL_SETTINGS = {
  brightness: 75,
  notifications: true,
};
