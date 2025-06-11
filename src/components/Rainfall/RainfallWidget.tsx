'use client';
import React, { useEffect, useState } from 'react';
import { useStation } from '../../contexts/StationContext';
import { fetchStationData } from '../../utils/RainfallApis';

interface StationData {
  rainfall: number;
  station_id: number;
  name: string;
  latitude: number;
  longitude: number;
  // Add other properties as needed
}

export default function RainfallWidget() {
  const { selectedStation } = useStation();
  const [data, setData] = useState<StationData | null>(null);
  const [time, setTime] = useState('');

  // Time update - exactly like your old code
  useEffect(() => {
    const interval = setInterval(() => {
      const newtime = String(
        new Date().toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          timeZone: 'Asia/Kolkata',
        }) + ', ' + 
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata'
        })
      );
      setTime(newtime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch station data - exactly like your old code
  useEffect(() => {
    if (selectedStation) {
      fetchStationData(selectedStation.station_id)
        .then((data: StationData) => {
          console.log('Station data received:', data);
          setData(data);
        })
        .catch(error => console.error('Error fetching station data:', error));
    }
  }, [selectedStation]);

  if (!selectedStation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a station to view data
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Loading station data...
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-white">
          {selectedStation.name}
        </h4>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
      
      <div className="bg-gray-800 rounded p-2">
        <div className="text-xs text-gray-300">
          <div>Current Rainfall: {selectedStation.rainfall}mm</div>
          <div>Station ID: {selectedStation.station_id}</div>
          <div>Lat: {selectedStation.latitude.toFixed(4)}</div>
          <div>Lng: {selectedStation.longitude.toFixed(4)}</div>
        </div>
      </div>
    </div>
  );
}
