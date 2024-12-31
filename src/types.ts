export type Profile = {
  id?: number;
  name: string;
  theme: "blue" | "purple" | "green" | "orange";
  isActive: boolean;
  lastTrip?: string;
  musicPreference?: string;
}; 