import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from '../types';

interface ActiveProfileContextType {
  activeProfile: Profile | null;
  setActiveProfileById: (id: Profile["id"]) => Promise<void>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const ActiveProfileContext = createContext<ActiveProfileContextType | undefined>(undefined);

export function ActiveProfileProvider({ children }: { children: React.ReactNode }) {
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial active profile
  useEffect(() => {
    const fetchActiveProfile = async () => {
      try {
        const profile = await window.electron.getActiveProfile();
        setActiveProfile(profile || null);
      } catch (err) {
        setError('Failed to fetch active profile');
        console.error('Error fetching active profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveProfile();
  }, []);

  const setActiveProfileById = async (id: Profile["id"]) => {
    setLoading(true);
    setError(null);
    try {
      if (id === null) {
        setActiveProfile(null);
        return;
      }
      
      const updatedProfile = await window.electron.setActiveProfile(id);
      setActiveProfile(updatedProfile || null);
    } catch (err) {
      setError('Failed to set active profile');
      console.error('Error setting active profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
  setLoading(true);
  setError(null);
  const fetchActiveProfile = async () => {
    try {
      const profile = await window.electron.getActiveProfile();
      setActiveProfile(profile || null);
    } catch (err) {
      setError('Failed to refetch active profile');
      console.error('Error refetching active profile:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchActiveProfile();
  }

  return (
    <ActiveProfileContext.Provider 
      value={{ 
        activeProfile, 
        setActiveProfileById,
        loading,
        error,
        refetch
      }}
    >
      {children}
    </ActiveProfileContext.Provider>
  );
}

export function useActiveProfile() {
  const context = useContext(ActiveProfileContext);
  if (context === undefined) {
    throw new Error('useActiveProfile must be used within an ActiveProfileProvider');
  }
  return context;
} 