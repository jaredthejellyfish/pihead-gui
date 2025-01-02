import { useCallback } from "react";
import type { Profile } from "../types";
import { useActiveProfile } from "../contexts/active-profile-provider";

export function useMutateProfile() {
  const { activeProfile, refetch } = useActiveProfile();

  const mutateProfile = useCallback(async (profileData: Partial<Profile>) => {
    try {
      let existingProfile: Profile | null = null;

      // If we're updating the active profile and no ID is provided
      if (!profileData.id && activeProfile) {
        existingProfile = activeProfile;
      } 
      // If we have an ID, find the profile
      else if (profileData.id) {
        const profiles = await window.electron.getProfiles();
        existingProfile = profiles.find((p) => p.id === profileData.id) || null;
      }

      if (existingProfile) {
        // Merge the existing profile with the new data
        const updatedProfile = {
          ...existingProfile,
          ...profileData,
        };
        
        // Update the profile in the database
        const result = await window.electron.updateProfile(updatedProfile);
        
        // If we updated the active profile, refetch it
        if (updatedProfile.id === activeProfile?.id) {
          refetch();
        }
        
        return result;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  }, [activeProfile, refetch]);

  return { mutateProfile };
}
