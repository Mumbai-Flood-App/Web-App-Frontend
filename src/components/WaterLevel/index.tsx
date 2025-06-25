// src/components/WaterLevel/index.tsx
'use client';
import dynamic from 'next/dynamic';
import WaterLevelPlotContainer from './WaterLevelPlotContainer';

const WaterLevelMap = dynamic(() => import('./WaterLevelMap'), { ssr: false });

export default function WaterLevel() {
  return (
    <>
      {/* Mobile: vertical stacking, scrollable */}
      <div className="block md:hidden w-full min-h-[100vh]">
        <div className="w-full h-[75vh] relative">
          <WaterLevelMap />
        </div>
        <div className="w-full">
          <WaterLevelPlotContainer mobile />
        </div>
      </div>
      {/* Desktop: only map here; plot container handled by layout/parent if needed */}
      <div className="hidden md:block">
        <WaterLevelMap />
      </div>
    </>
  );
}