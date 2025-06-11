'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Station {
  id: number;
  station_id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

interface StationContextType {
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export const StationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  return (
    <StationContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </StationContext.Provider>
  );
};

export const useStation = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStation must be used within a StationProvider');
  }
  return context;
};
