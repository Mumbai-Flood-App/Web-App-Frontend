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

  const formatDateToIST = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'short', 
      timeZone: 'Asia/Kolkata' 
    };
    return new Date(date).toLocaleDateString('en-IN', options);
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
        const dailyApiData = response.daily_data || [];
        
        // Get current date in IST
        const istDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const today = istDate.getDate();
        const currentMonth = istDate.getMonth();
        const currentYear = istDate.getFullYear();
        
        // Create a map to store unique data points by date
        const dataMap = new Map<string, DailyDataPoint>();
        
        // Process and deduplicate data
        dailyApiData.forEach(item => {
          if (!dataMap.has(item.date) || item.is_forecasted) {
            dataMap.set(item.date, item);
          }
        });

        // Convert map back to array and sort by date
        const uniqueData = Array.from(dataMap.values())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Get the display range (2 days before today to 2 days after today)
        const displayData = uniqueData.filter(item => {
          const dayDiff = Math.floor((new Date(item.date).getTime() - istDate.getTime()) / (1000 * 60 * 60 * 24));
          return dayDiff >= -2 && dayDiff <= 2;
        });

        // Map for chart rendering
        const processedData: ProcessedDataPoint[] = displayData.map(item => {
          // Explicitly check if the date is before today
          const isPastDate = new Date(item.date).getTime() < new Date(currentYear, currentMonth, today).getTime();

          return {
            date: formatDateToIST(item.date),
            observed: 0,
            predicted: isPastDate ? 0 : item.predicted,
            pastPredicted: isPastDate ? item.predicted : 0,
            isForecasted: !isPastDate,
            originalDate: item.date
          };
        });

        // Set separator to today (it will appear right before today's bar)
        const todayStr = new Date(currentYear, currentMonth, today).toISOString().slice(0, 10);
        setSeparatorDate(processedData.find(item => item.originalDate === todayStr)?.date || '');

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