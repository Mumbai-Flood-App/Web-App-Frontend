'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import { fetchStationData } from '../../utils/RainfallApis';

interface DailyDataPoint {
  date: string;
  observed: number;
  predicted: number;
  is_forecasted: boolean;
  originalDate?: string;
}

interface ProcessedDataPoint {
  date: string;
  observed: number;
  predicted: number;
  pastPredicted: number;
  isForecasted: boolean;
  originalDate?: string;
}

interface Station {
  id: number;
  station_id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

interface Props {
  selectedStation: Station | null;
}

interface PayloadItem {
  payload?: {
    isForecasted: boolean;
    predicted: number;
    observed: number;
    pastPredicted: number;
    date: string;
  };
}

export default function DailyForecastChart({ selectedStation }: Props) {
  const [dailyData, setDailyData] = useState<ProcessedDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [separatorDate, setSeparatorDate] = useState<string>('');

  const getColor = (rainfall: number): string => {
    if (rainfall > 204.5) return '#FF0000';
    if (rainfall > 115.5) return '#FFA500';
    if (rainfall > 64.4) return '#FFFF00';
    if (rainfall > 15.5) return '#87CEEB';
    if (rainfall > 0) return '#90EE90';
    return '#D4D4D4';
  };

  const formatDateToIST = (dateString: string): string => {
    // Treat the YYYY-MM-DD string as UTC midnight to prevent timezone shifts during parsing.
    const utcDate = new Date(`${dateString}T00:00:00Z`);
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      timeZone: 'Asia/Kolkata' // Display the date as it would appear in India.
    };
    return utcDate.toLocaleDateString('en-IN', options);
  };

  // Custom Legend Component
  const CustomLegend = () => {
    return (
      <div className="flex justify-center items-center space-x-6 mt-2 text-xs text-gray-300">
        {/* <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
          <span>Observed</span>
        </div> */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white border border-gray-400 rounded-sm"></div>
          <span>Past Predicted</span>
        </div>
      </div>
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: PayloadItem[]; label?: string }) => {
    if (!active || !payload || !payload.length || !payload[0].payload) {
      return null;
    }
  
    const data = payload[0].payload;
    // Determine color for predicted
    const predictedColor = data.predicted > 0 ? getColor(data.predicted) : "#FFFFFF";
  
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg p-3 shadow-lg">
        <p className="text-white text-sm font-bold">{label}</p>
        {(data.isForecasted || data.predicted > 0) ? (
          <p className="text-sm font-bold" style={{ color: predictedColor }}>
            <span className="font-bold">Predicted:</span> {data.predicted?.toFixed(2)}mm
          </p>
        ) : (
          <>
            {data.pastPredicted > 0 && (
              <p className="text-sm font-bold" style={{ color: predictedColor }}>
                <span className="font-bold">Predicted:</span> {data.pastPredicted?.toFixed(2)}mm
              </p>
            )}
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    if (!selectedStation) {
      setDailyData([]);
      return;
    }

    setLoading(true);
    setError(null);

    fetchStationData(selectedStation.station_id)
      .then((response: { daily_data: DailyDataPoint[] }) => {
        const apiData = response.daily_data || [];
        if (apiData.length === 0) {
          setDailyData([]);
          setLoading(false);
          return;
        }

        // Sort by date ascending
        apiData.sort((a, b) => a.date.localeCompare(b.date));

        // Always show the last 5 days in the data
        const lastFive = apiData.slice(-5);

        const processedData: ProcessedDataPoint[] = lastFive.map(item => {
          // These variables are only used here to determine the state of each bar.
          const latestDate = lastFive[lastFive.length - 1].date;
          const currentDayObj = [...lastFive].reverse().find(d => !d.is_forecasted);
          const currentDay = currentDayObj ? currentDayObj.date : latestDate;

          const isPastPredicted = !item.is_forecasted;
          const isForecasted = item.is_forecasted;
        
          return {
            date: formatDateToIST(item.date),
            observed: 0,
            predicted: isForecasted ? item.predicted : 0,
            pastPredicted: isPastPredicted ? item.predicted : 0,
            isForecasted: isForecasted,
            originalDate: item.date,
          };
        });
        
        // Separator before the first forecasted bar
        const firstForecasted = processedData.find(d => d.isForecasted);
        const separatorDateLabel = firstForecasted?.date;
        setSeparatorDate(separatorDateLabel || '');

        setDailyData(processedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedStation]);

  if (loading) {
    return (
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-bold">Loading forecast data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <span className="text-sm font-bold text-red-400">Error: {error}</span>
      </div>
    );
  }

  if (!dailyData || dailyData.length === 0) {
    return (
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <span className="text-sm font-bold text-gray-500">Select Station</span>
      </div>
    );
  }

  const maxValue = Math.max(
    ...dailyData.map(d => Math.max(d.observed || 0, d.predicted || 0, d.pastPredicted || 0))
  );

  // Helper to get a nice round step for Y axis
  function getNiceStep(max: number) {
    if (max <= 10) return 2;
    if (max <= 50) return 10;
    if (max <= 100) return 20;
    if (max <= 200) return 50;
    if (max <= 500) return 100;
    if (max <= 1000) return 200;
    return Math.pow(10, Math.floor(Math.log10(max)));
  }

  const yDomainMax = maxValue > 0 ? Math.ceil(maxValue * 1.1) : 10;
  const step = getNiceStep(yDomainMax);
  const getTicks = () => {
    const ticks = [];
    for (let i = 0; i <= yDomainMax; i += step) {
      ticks.push(i);
    }
    if (ticks[ticks.length - 1] < yDomainMax) ticks.push(yDomainMax);
    return ticks;
  };

  return (
    <div className="w-full h-full bg-black rounded-lg p-2 relative">
      <div className="absolute top-1 left-0 right-0 flex justify-between items-center text-xs text-white z-10">
        <div className="flex items-center ml-20">
          <span>Past Data</span>
          <span className="ml-1">←</span>
        </div>
        <div className="flex items-center mr-6">
          <span className="mr-1">→</span>
          <span>Forecasted</span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="92%">
        <BarChart data={dailyData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          
          {separatorDate && (
            <ReferenceLine 
              x={separatorDate}
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }}
            axisLine={{ stroke: '#4b5563', strokeWidth: 2 }}
            tickLine={false}
          />
          <YAxis
            label={{ 
              value: 'Rainfall (mm)', 
              angle: -90, 
              position: 'insideLeft',
              dx: 18,
              style: { textAnchor: 'middle', fill: '#9ca3af', fontSize: '12px', fontWeight: 'bold' } 
            }}
            domain={[0, yDomainMax]}
            ticks={getTicks()} // Fixed typo from 'get kneel'
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }}
            axisLine={{ stroke: '#4b5563', strokeWidth: 2 }}
            tickLine={false}
            tickFormatter={v => v.toLocaleString('en-IN')}
          />
          
          <Tooltip content={CustomTooltip} cursor={false} />
          
          {/* Past Predicted bars - White without border */}
          <Bar 
            dataKey="pastPredicted" 
            stackId="past" 
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {dailyData.map((entry, idx) => (
              <Cell key={`past-predicted-${idx}`} fill={entry.pastPredicted > 0 ? '#FFFFFF' : 'transparent'} />
            ))}
          </Bar>
          
          {/* Observed bars - Gray, stacked with past predicted for side-by-side effect */}
          {/* <Bar 
            dataKey="observed" 
            stackId="observed" 
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {dailyData.map((entry, idx) => (
              <Cell key={`observed-${idx}`} fill="#ADADC9" />
            ))}
          </Bar> */}
          
          {/* Future Predicted bars - Colored, separate stack */}
          <Bar 
            dataKey="predicted" 
            stackId="future" 
            radius={[2, 2, 0, 0]}
            isAnimationActive={false}
          >
            {dailyData.map((entry, idx) => (
              <Cell key={`predicted-${idx}`} fill={entry.predicted > 0 ? getColor(entry.predicted) : 'transparent'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      {/* Custom Legend */}
      <CustomLegend />
    </div>
  );
}