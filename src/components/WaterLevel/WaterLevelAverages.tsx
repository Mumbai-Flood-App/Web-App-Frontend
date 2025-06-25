import { useEffect, useState } from 'react';
import type { WaterLevelStation } from '../../contexts/WaterLevelStationContext';
import { fetchWaterLevelData } from '../../utils/WaterLevelApis';

interface Props {
  station: WaterLevelStation | null;
}

interface Averages {
  avg5min: number | null;
  avg15min: number | null;
  avg12hr: number | null;
  avg24hr: number | null;
}

interface DataEntry {
  time: number;
  parameter_values: {
    us_mb: number;
  };
}

const intervals = [
  { label: 'Last 5 mins', key: 'avg5min', seconds: 5 * 60 },
  { label: 'Last 15 mins', key: 'avg15min', seconds: 15 * 60 },
  { label: 'Last 12 hrs', key: 'avg12hr', seconds: 12 * 60 * 60 },
  { label: 'Last 24 hrs', key: 'avg24hr', seconds: 24 * 60 * 60 },
] as const;

export default function WaterLevelAverages({ station }: Props) {
  const [averages, setAverages] = useState<Averages>({ 
    avg5min: null, 
    avg15min: null, 
    avg12hr: null, 
    avg24hr: null 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!station) {
      console.log('WaterLevelAverages: No station selected');
      return;
    }
    console.log('WaterLevelAverages: Fetching data for station:', station.name, 'ID:', station.id);
    setLoading(true);
    fetchWaterLevelData(station.id)
      .then((data) => {
        console.log('Fetched API data:', data);
        // Clean and process data
        const cleanedData = (data.data || []).map((entry: DataEntry) => ({
          ...entry,
          parameter_values: {
            ...entry.parameter_values,
            us_mb:
              parseInt(entry.parameter_values.us_mb.toString()) > 300
                ? 0
                : parseInt(entry.parameter_values.us_mb.toString()),
          },
        }));
        console.log('Cleaned data:', cleanedData);
        if (cleanedData.length > 0) {
          console.log('First 5 cleaned entries:', cleanedData.slice(0, 5).map((e: DataEntry) => ({ time: e.time, us_mb: e.parameter_values.us_mb })));
        }
        // Remove spikes
        for (let i = 1; i < cleanedData.length; i++) {
          const timeDiff = (cleanedData[i].time - cleanedData[i - 1].time) / 60; // in minutes
          const waterLevelDiff = cleanedData[i].parameter_values.us_mb - cleanedData[i - 1].parameter_values.us_mb;
          const slope = waterLevelDiff / timeDiff;
          if (Math.abs(slope) > 25) {
            cleanedData[i].parameter_values.us_mb = cleanedData[i - 1].parameter_values.us_mb;
          }
        }
        const now = Date.now() / 1000;
        const calculateAverage = (interval: number) => {
          const filtered = cleanedData.filter((entry: DataEntry) => now - entry.time <= interval);
          const sum = filtered.reduce((acc: number, val: DataEntry) => acc + val.parameter_values.us_mb, 0);
          return filtered.length > 0 ? sum / filtered.length : null;
        };
        setAverages({
          avg5min: calculateAverage(5 * 60),
          avg15min: calculateAverage(15 * 60),
          avg12hr: calculateAverage(12 * 60 * 60),
          avg24hr: calculateAverage(24 * 60 * 60),
        });
        setLoading(false);
      })
      .catch(() => {
        setAverages({ avg5min: null, avg15min: null, avg12hr: null, avg24hr: null });
        setLoading(false);
      });
  }, [station]);

  // Always show the grid, even if no station or no data
  return (
    <div className="w-full grid grid-cols-4 gap-3">
      {intervals.map((interval) => (
        <div
          key={interval.key}
          className="flex flex-col items-center justify-center bg-black/70 backdrop-blur-[10px] rounded-lg shadow-md border border-gray-700 p-2 min-w-[70px] min-h-[60px] transition-all duration-150 hover:shadow-lg hover:bg-black/80"
        >
          <div className="text-lg font-bold text-white mb-0.5">
            {loading ? (
              <span className="text-base text-gray-400">...</span>
            ) :
              averages[interval.key as keyof typeof averages] == null || isNaN(Number(averages[interval.key as keyof typeof averages]))
                ? <span className="text-base text-gray-400">NIL</span>
                : <>{Number(averages[interval.key as keyof typeof averages]).toFixed(0)} <span className="text-xs font-normal text-blue-300">cm</span></>
            }
          </div>
          <div className="text-[10px] text-gray-300 font-medium text-center leading-tight">{interval.label}</div>
        </div>
      ))}
    </div>
  );
} 