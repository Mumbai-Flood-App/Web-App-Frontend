'use client';
import dynamic from 'next/dynamic';
import Legend from './Legend';

const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false });

export default function Rainfall() {
  return (
    <>
      <LeafletMap />
      <Legend />
    </>
  );
}