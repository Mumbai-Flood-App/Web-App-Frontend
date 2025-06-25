import React, { useEffect, useState, ReactElement } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { WaterLevelStation } from '../../contexts/WaterLevelStationContext';
import { fetchWaterLevelData } from '../../utils/WaterLevelApis';

interface DataPoint {
  time: number;
  parameter_values: {
    us_mb: number;
  };
}

interface Props {
  station: WaterLevelStation | null;
}

export default function WaterLevelTimeSeriesChart({ station }: Props): ReactElement | null {
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!station) {
      setData([]);
      return;
    }
    setLoading(true);
    fetchWaterLevelData(station.id)
      .then((result) => {
        setData(result.data || []);
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  }, [station]);

  // Format time for X axis
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  // Only keep the last 5 hours (12 points per hour, 5 min interval)
  const lastFiveHours = data.slice(-60);
  const getTickValues = (data: DataPoint[]) => {
    if (!data || data.length === 0) return [];
    const maxTicks = 5;
    const dataLength = data.length;
    if (dataLength <= maxTicks) {
      return data.map(d => d.time);
    }
    const step = Math.floor(dataLength / (maxTicks - 1));
    const ticks = [];
    for (let i = 0; i < dataLength; i += step) {
      ticks.push(data[i].time);
      if (ticks.length >= maxTicks - 1) break;
    }
    if (ticks[ticks.length - 1] !== data[dataLength - 1].time) {
      ticks.push(data[dataLength - 1].time);
    }
    return ticks;
  };
  const tickValues = getTickValues(lastFiveHours);

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value?: number | string }[]; label?: number | string }): React.ReactNode => {
    if (active && Array.isArray(payload) && payload.length && label) {
      const date = new Date(Number(label) * 1000);
      const formattedDate = date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
      });
      const formattedTime = date.toLocaleTimeString('en-IN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      });
      const value = typeof payload[0] === 'object' && payload[0] !== null && 'value' in payload[0]
        ? (payload[0] as { value?: number | string }).value
        : undefined;
      let displayValue = '';
      if (typeof value === 'number') displayValue = value.toFixed(2);
      else if (typeof value === 'string') displayValue = value;
      return (
        <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-gray-300 text-sm font-bold">{formattedDate}</p>
          <p className="text-gray-300 text-sm font-bold">{formattedTime}</p>
          <p className="text-blue-400 text-sm font-bold">
            <span className="font-bold">Water Level:</span> {displayValue} cm
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
          <span className="text-sm font-bold">Loading water level data...</span>
        </div>
      </div>
    );
  }

  if (!station || !data || data.length === 0) {
    return (
      <div className="w-full h-full bg-black rounded-lg flex items-center justify-center">
        <span className="text-sm font-bold text-gray-500">Select Station</span>
      </div>
    );
  }

  const maxLevel = Math.max(...lastFiveHours.map(d => d.parameter_values.us_mb));
  const yDomainMax = Math.ceil(maxLevel / 5) * 5 || 5;

  return (
    <div className="w-full h-full bg-black rounded-lg p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={lastFiveHours} margin={{ top: 10, right: 15, left: -10, bottom: 2 }}>
          <defs>
            <linearGradient id="waterLevelGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f8cff" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f8cff" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
          <XAxis
            dataKey="time"
            ticks={tickValues}
            tickFormatter={formatTime}
            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 'bold' }}
            axisLine={{ stroke: '#4b5563', strokeWidth: 2 }}
            tickLine={false}
            interval={0}
          />
          <YAxis
            label={{ 
              value: 'Water Level (cm)', 
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
          <Tooltip content={(props: { active?: boolean; payload?: { value?: number | string }[]; label?: number | string }): React.ReactNode => {
            const { active, payload, label } = props;
            if (active && Array.isArray(payload) && payload.length) {
              return <CustomTooltip active={active} payload={payload} label={label} />;
            }
            return null;
          }} />
          <Area 
            type="monotone" 
            dataKey="parameter_values.us_mb" 
            stroke="#4f8cff" 
            strokeWidth={2}
            fill="url(#waterLevelGradient)"
            dot={false}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 