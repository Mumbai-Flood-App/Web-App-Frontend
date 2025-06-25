'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import WaterLevelStationSelector from './WaterLevelStationSelector';
import { useWaterLevelStation } from '../../contexts/WaterLevelStationContext';
import WaterLevelAverages from './WaterLevelAverages';
import { fetchSensorList } from '../../utils/WaterLevelApis';
import WaterLevelTimeSeriesChart from './WaterLevelTimeSeriesChart';

export default function WaterLevelPlotContainer({ sidebarOpen = true, mobile = false }: { sidebarOpen?: boolean; mobile?: boolean }) {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const { selectedStation, setSelectedStation } = useWaterLevelStation();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const istDate = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentDate(istDate);
      setCurrentTime(istTime);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set default station on mount if not already selected
    if (!selectedStation) {
      fetchSensorList().then((stations) => {
        console.log('Available stations:', stations.map((s: { id: number; name: string }) => ({ id: s.id, name: s.name })));
        // Try to find the default station, or use the first available station
        const defaultStation = stations.find((s: { name: string }) => s.name === "BMC's 8 MLD plant behind L&T") || stations[0];
        if (defaultStation) {
          console.log('Setting default station:', defaultStation.name);
          setSelectedStation(defaultStation);
        }
      }).catch(error => {
        console.error('Error fetching sensor list:', error);
      });
    }
  }, [selectedStation, setSelectedStation]);

  const marginLeft = sidebarOpen ? "lg:ml-[248px]" : "lg:ml-[90px]";

  if (mobile) {
    return (
      <div className="relative w-full h-auto bg-black/80 backdrop-blur-[25px] rounded-t-2xl text-white text-[14px] p-0 pt-6">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Image src="/icons/water-level-open-white.svg" alt="Water Level Icon" width={38} height={36} />
          <span className="text-[22px] font-bold">Water Level</span>
        </div>
        <div className="mb-3 px-4">
          <WaterLevelStationSelector selected={selectedStation} onChange={setSelectedStation} />
        </div>
        <div className="mb-4 flex gap-2 items-center text-gray-100 text-sm px-4">
          <span className="font-medium">{currentDate}</span>
          <span className="ml-2 font-medium">{currentTime}</span>
        </div>
        <div className="mb-6 px-4">
          <div className="text-sm font-semibold mb-3 text-left text-white">
            Average Water Level
          </div>
          <WaterLevelAverages station={selectedStation} />
        </div>
        <div className="mb-6 px-4">
          <div className="text-sm font-semibold mb-3 text-left text-white">
            Water Level Over Time
          </div>
          <div className="w-full h-[220px] flex items-center justify-center bg-black rounded-lg">
            <WaterLevelTimeSeriesChart station={selectedStation} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed
        top-[56px] sm:top-[60px] md:top-[70px] lg:top-[80px]
        left-0 z-10
        w-[98vw] sm:w-[340px] md:w-[360px] lg:w-[445px]
        h-auto sm:h-[400px] md:h-[440px] lg:h-[640px]
        bg-black/80 backdrop-blur-[25px] rounded-lg text-white text-[14px]
        shadow-xl
        transition-all duration-0 ease-in-out ${marginLeft} left-0
        max-w-full
      `}
      style={{ zIndex: 10 }}
    >
      <div className="absolute top-[18px] left-[18px] flex items-center gap-2">
        <Image src="/icons/water-level-open-white.svg" alt="Water Level Icon" width={38} height={36} />
        <span className="text-[22px] font-bold">Water Level</span>
      </div>

      <div className="absolute top-[70px] left-[18px] w-[180px] h-[28px]">
        <WaterLevelStationSelector selected={selectedStation} onChange={setSelectedStation} />
      </div>
    
      <div className="absolute top-[70px] left-[260px] w-[155px] h-[30px] bg-gray-900/90 border border-gray-600 rounded-lg flex items-center px-2 text-gray-100 text-sm">
        <span className="font-medium">{currentDate}</span>
        <span className="ml-2 font-medium">{currentTime}</span>
      </div>

      {/* Average Water Level Section */}
      <div className="absolute top-[140px] left-[18px] w-[400px]">
        <div className="text-sm font-semibold mb-3 text-left text-white">
          Average Water Level
        </div>
        <WaterLevelAverages station={selectedStation} />
      </div>

      <div className="absolute top-[280px] left-[18px] w-[400px]">
        <div className="text-sm font-semibold mb-3 text-left text-white">
          Water Level Over Time
        </div>
        <div className="w-full h-[220px] flex items-center justify-center bg-black rounded-lg">
          <WaterLevelTimeSeriesChart station={selectedStation} />
        </div>
      </div>
    </div>
  );
}
