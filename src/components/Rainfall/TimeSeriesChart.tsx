'use client';
import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchQuarterlyAWSData } from '../../utils/RainfallApis';

interface ObservedDataPoint {
  timestamp: string;
  rainfall: number;
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

export default function TimeSeriesChart({ selectedStation }: Props) {
  const [data, setData] = useState<ObservedDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedStation) {
      setData([]);
      return;
    }
  
    setLoading(true);
    setError(null);
    
    fetchQuarterlyAWSData(selectedStation.station_id)
    .then((response: ObservedDataPoint[]) => {
      setData(response);
      setLoading(false);
    })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedStation]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  // Generate exactly 6 evenly spaced tick values from the data for hourly data
  const getTickValues = (data: ObservedDataPoint[]) => {
    if (!data || data.length === 0) return [];
    
    const dataLength = data.length;
    if (dataLength <= 6) {
      return data.map(d => d.timestamp);
    }
    
    // Generate 6 evenly spaced indices for hourly data
    const step = Math.floor(dataLength / 5);
    const indices = [
      0,
      step,
      step * 2, 
      step * 3,
      step * 4,
      dataLength - 1
    ];
    
    return indices.map(index => data[index].timestamp);
  };

  const CustomTooltip = ({ active, payload, label }: { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active?: boolean; payload?: any[]; label?: string;
  }) => {
    if (active && payload && payload.length && label) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
      });
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      });
      
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm font-bold">{formattedDate}</p>
          <p className="text-gray-300 text-sm font-bold">{formattedTime}</p>
          <p className="text-green-400 text-sm font-bold">
            <span className="font-bold">Rainfall:</span> {payload[0].value?.toFixed(2)}mm
          </p>
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
          <span className="text-sm font-bold">Loading rainfall data...</span>
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

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <span className="text-sm font-bold text-gray-500">Select Station</span>
      </div>
    );
  }

  const maxRainfall = Math.max(...data.map(d => d.rainfall));
  const yDomainMax = Math.ceil(maxRainfall / 5) * 5 || 5;
  const tickValues = getTickValues(data);

  return (
    <div className="w-full h-full bg-black rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 15, left: -10, bottom: 2 }}>
          <defs>
            <linearGradient id="rainfallGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="timestamp"
            ticks={tickValues}
            tickFormatter={formatTime}
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }}
            axisLine={{ stroke: '#4b5563', strokeWidth: 2 }}
            tickLine={false}
            interval={0}
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
          <Area 
            type="monotone" 
            dataKey="rainfall" 
            stroke="#10b981" 
            strokeWidth={2}
            fill="url(#rainfallGradient)"
            dot={false}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}