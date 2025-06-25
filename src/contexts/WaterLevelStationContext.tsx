'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for a water level station (customized for both APIs)
export interface WaterLevelStation {
  id: number;
  station_id?: number; // optional, for MumbaiFlood API
  name: string;
  latitude: number;
  longitude: number;
  address?: string; // optional, for Aurassure API
}

interface WaterLevelStationContextType {
  selectedStation: WaterLevelStation | null;
  setSelectedStation: (station: WaterLevelStation | null) => void;
}

const WaterLevelStationContext = createContext<WaterLevelStationContextType | undefined>(undefined);

export const WaterLevelStationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStation, setSelectedStation] = useState<WaterLevelStation | null>(null);

  return (
    <WaterLevelStationContext.Provider value={{ selectedStation, setSelectedStation }}>
      {children}
    </WaterLevelStationContext.Provider>
  );
};

export const useWaterLevelStation = () => {
  const context = useContext(WaterLevelStationContext);
  if (context === undefined) {
    throw new Error('useWaterLevelStation must be used within a WaterLevelStationProvider');
  }
  return context;
}; 