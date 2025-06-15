'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

  // Set default station (S ward) on first load
  useEffect(() => {
    fetch('/api/proxy-stations')
      .then(res => res.json())
      .then((data: Station[]) => {
        const sWard = data.find(station => station.name.toLowerCase().includes('s ward'));
        if (sWard) {
          // Ensure station_id is present
          setSelectedStation({ ...sWard, station_id: sWard.station_id ?? sWard.id });
        }
      });
  }, []);

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
