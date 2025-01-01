export interface EQProfile {
  id: string;
  name: string;
  description: string;
  bands: {
    [frequency: string]: number; // frequency in Hz, value in dB
  };
}

export const eqProfiles: EQProfile[] = [
  {
    id: "flat",
    name: "Flat",
    description: "Neutral frequency response with no adjustments",
    bands: {
      "60": 0,
      "170": 0,
      "310": 0,
      "600": 0,
      "1000": 0,
      "3000": 0,
      "6000": 0,
      "12000": 0,
      "14000": 0,
      "16000": 0,
    },
  },
  {
    id: "bass-boost",
    name: "Bass Boost",
    description: "Enhanced low frequencies for more punch",
    bands: {
      "60": 6,
      "170": 4,
      "310": 2,
      "600": 0,
      "1000": 0,
      "3000": 0,
      "6000": 0,
      "12000": 0,
      "14000": 0,
      "16000": 0,
    },
  },
  {
    id: "vocal-boost",
    name: "Vocal Boost",
    description: "Enhanced mid frequencies for clearer vocals",
    bands: {
      "60": 0,
      "170": 0,
      "310": 2,
      "600": 3,
      "1000": 4,
      "3000": 3,
      "6000": 1,
      "12000": 0,
      "14000": 0,
      "16000": 0,
    },
  },
];
