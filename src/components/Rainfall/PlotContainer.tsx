'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import StationSelector from "./StationSelector";
import TimeSeriesChart from "./TimeSeriesChart";
import DailyForecastChart from "./DailyForecastChart";

interface Station {
  id: number;
  station_id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

export default function PlotContainer({ mobile = false, sidebarOpen = true }: { mobile?: boolean; sidebarOpen?: boolean }) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Fetch stations and set S ward as default
  useEffect(() => {
    fetch('/api/proxy-stations')
      .then(res => res.json())
      .then((data: Station[]) => {
        const sWard = data.find(station => station.name.toLowerCase().includes('s ward'));
        if (sWard) setSelectedStation(sWard);
      });
  }, []);

  const handleStationChange = (station: Station) => {
    setSelectedStation(station);
  };

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

  const marginLeft = sidebarOpen ? "lg:ml-[248px]" : "lg:ml-[90px]";

  if (mobile) {
    return (
      <div className="relative w-full h-auto bg-black/80 backdrop-blur-[25px] rounded-t-2xl text-white text-[14px] p-0 pt-6">
        <div className="flex items-center gap-2 mb-4 px-4">
          <Image src="/icons/rainfall-open-white.svg" alt="Rainfall Icon" width={38} height={36} />
          <span className="text-[22px] font-bold">Rainfall</span>
        </div>
        <div className="mb-2 px-4">
          <StationSelector selected={selectedStation} onChange={handleStationChange} />
        </div>
        <div className="mb-2 flex gap-2 items-center text-gray-100 text-sm px-4">
          <span className="font-medium">{currentDate}</span>
          <span className="ml-2 font-medium">{currentTime}</span>
        </div>
        <div className="mb-4 px-4">
          <div className="text-sm font-semibold mb-2 text-left text-white">
            Observed Rainfall (Today)
            <span className="text-xs text-gray-400 font-normal"> - 15 min interval (MCGM)</span>
          </div>
          <div className="w-full h-[180px]">
            <TimeSeriesChart selectedStation={selectedStation} />
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="text-sm font-semibold mb-2 text-left text-white">
            Daily Rainfall Forecast
          </div>
          <div className="w-full h-[180px]">
            <DailyForecastChart selectedStation={selectedStation} />
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
        transition-all duration-0 ease-in-out ${marginLeft} left-0
        max-w-full
      `}
      style={{ zIndex: 10 }}
    >
      <div className="absolute top-[18px] left-[18px] flex items-center gap-2">
        <Image 
          src="/icons/rainfall-open-white.svg" 
          alt="Rainfall Icon" 
          width={38} 
          height={36} 
        />
        <span className="text-[22px] font-bold">Rainfall</span>
      </div>

      <div className="absolute top-[70px] left-[18px] w-[180px] h-[28px]">
        <StationSelector 
          selected={selectedStation} 
          onChange={handleStationChange} 
        />
      </div>
    
      <div className="absolute top-[70px] left-[260px] w-[155px] h-[30px] bg-gray-900/90 border border-gray-600 rounded-lg flex items-center px-2 text-gray-100 text-sm">
        <span className="font-medium">{currentDate}</span>
        <span className="ml-2 font-medium">{currentTime}</span>
      </div>

      
      <div className="absolute top-[120px] left-[18px] w-[400px]">
        <div className="text-sm font-semibold mb-2 text-left text-white">
            Observed Rainfall (Today)
            <span className="text-xs text-gray-400 font-normal"> - 15 min interval (MCGM)</span>
        </div>
      </div>

      
      <div className="absolute top-[147px] left-[18px] w-[400px] h-[220px]">
        <TimeSeriesChart selectedStation={selectedStation} />
      </div>


      <div className="absolute top-[380px] left-[18px] w-[400px]">
        <div className="text-sm font-semibold mb-2 text-left text-white">
            Daily Rainfall Forecast
        </div>
      </div>

      <div className="absolute top-[410px] left-[18px] w-[400px] h-[220px]">
        <DailyForecastChart selectedStation={selectedStation} />
      </div>

    </div>
  );
}
