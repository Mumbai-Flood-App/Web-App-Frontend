'use client';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Cell } from 'recharts';
import { fetchStationData } from '../../utils/RainfallApis';

interface DailyDataPoint {
  date: string;
  observed: number;
  predicted: number;
  isForecasted: boolean;
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

export default function DailyForecastChart({ selectedStation }: Props) {
  const [dailyData, setDailyData] = useState<DailyDataPoint[]>([]);
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

  useEffect(() => {
    if (!selectedStation) {
      setDailyData([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    fetchStationData(selectedStation.station_id)
      .then((response: { daily_data: DailyDataPoint[] }) => {
        console.log('Daily forecast response:', response);
        const dailyApiData = response.daily_data || [];
        
        // Replicate the exact logic from your React code
        const combinedData = dailyApiData.map((item: DailyDataPoint, index: number) => {
          const dateLabel = formatDateToIST(item.date);
          const observed = index < dailyApiData.length - 3 ? item.observed : 0; // Show observed for all but the last three
          const predicted = index < dailyApiData.length - 3 ? 0 : item.predicted; // Show predicted bar for the last three entries only
          const isForecasted = index >= dailyApiData.length - 3;

          return {
            date: dateLabel,
            observed: observed,
            predicted: predicted,
            predictedStar: index < dailyApiData.length - 3 ? item.predicted : 0, // Stars for past predicted
            isForecasted: isForecasted,
            originalDate: item.date
          };
        });
        
        // Set separator at the first forecasted day (last 3 days start)
        const separatorIdx = dailyApiData.length - 3;
        setSeparatorDate(combinedData[separatorIdx]?.date || '');
        setDailyData(combinedData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedStation]);

  const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: any[]; label: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white text-sm font-bold">{label}</p>
          {data.isForecasted ? (
            <p className="text-blue-400 text-sm font-bold">
              <span className="font-bold">Predicted:</span> {data.predicted?.toFixed(2)}mm
            </p>
          ) : (
            <>
              {data.observed > 0 && (
                <p className="text-gray-300 text-sm font-bold">
                  <span className="font-bold">Observed:</span> {data.observed?.toFixed(2)}mm
                </p>
              )}
              {data.predictedStar > 0 && (
                <p className="text-blue-400 text-sm font-bold">
                  <span className="font-bold">Predicted:</span> {data.predictedStar?.toFixed(2)}mm
                </p>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

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
    ...dailyData.map(d => Math.max(d.observed || 0, d.predicted || 0))
  );
  const yDomainMax = Math.max(Math.ceil(maxValue / 50) * 50, 300);

  return (
    <div className="w-full h-full bg-black rounded-lg p-2 relative">
      {/* Past Data and Forecasted labels - Fixed positioning like React code */}
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

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          
          {/* Vertical separator line at the exact separator date */}
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
            ticks={[0, 50, 100, 150, 200, 250, 300]}
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }}
            axisLine={{ stroke: '#4b5563', strokeWidth: 2 }}
            tickLine={false}
          />
          
          <Tooltip content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return <CustomTooltip active={active} payload={payload} label={label} />;
            }
            return null;
          }} />
          
          {/* Observed data bars (past days) */}
          <Bar dataKey="observed" name="Observed" radius={[2, 2, 0, 0]}>
            {dailyData.map((entry, idx) => (
              <Cell key={`observed-${idx}`} fill="#ADADC9" />
            ))}
          </Bar>
          
          {/* Predicted data bars (future 3 days) with color coding */}
          <Bar dataKey="predicted" name="Predicted" radius={[2, 2, 0, 0]}>
            {dailyData.map((entry, idx) => (
              <Cell 
                key={`predicted-${idx}`} 
                fill={entry.isForecasted ? getColor(entry.predicted) : 'transparent'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
