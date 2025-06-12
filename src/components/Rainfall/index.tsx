// src/components/Rainfall/index.tsx
'use client';
import dynamic from 'next/dynamic';
import { StationProvider } from '../../contexts/StationContext';
import Legend from './Legend';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function Rainfall() {
  return (
    <StationProvider>
      <LeafletMap />
      <Legend />
    </StationProvider>
  );
}