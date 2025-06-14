'use client';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngBoundsExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import Legend from './Legend';

// Expanded Mumbai bounds to allow more rightward panning
const mumbaiBounds: LatLngBoundsExpression = [
  [18.85, 72.00], // Southwest - moved left boundary further left
  [19.35, 73.15], // Northeast - moved right boundary further right
];

// Station type
interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

const getInitialCenter = (): [number, number] => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return [19.12, 72.90]; // mobile
  }
  return [19.076, 73.10]; // desktop
};

export default function LeafletMap() {
  const [stations, setStations] = useState<Station[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(getInitialCenter);
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch('/api/proxy-stations')
      .then(res => res.json())
      .then(setStations)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setMapCenter([19.08, 72.90]);
        setMapZoom(10);
      } else {
        setMapCenter([19.076, 73.10]);
        setMapZoom(11);
      }
    }
  }, []);

  const getColor = (rainfall: number) => {
    if (rainfall > 204.4) return 'red';
    if (rainfall > 115.5) return 'orange';
    if (rainfall > 64.4) return 'yellow';
    if (rainfall > 15.5) return 'skyblue';
    if (rainfall > 0) return 'lightgreen';
    return 'grey';
  };

  return (
    <div className="md:fixed md:top-0 md:left-0 md:w-full md:h-screen relative w-full h-[75vh] z-0">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={11}
        maxZoom={18}
        maxBounds={mumbaiBounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        scrollWheelZoom={true}
        dragging={true}
        doubleClickZoom={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations.length > 0 && stations.map(station => (
          <CircleMarker
            key={station.id}
            center={[station.latitude, station.longitude]}
            radius={8}
            color="black"
            fillColor={getColor(station.rainfall)}
            fillOpacity={1}
          >
            <Tooltip permanent={false} direction="top" offset={[0, -10]}>
              {station.name} ({station.rainfall.toFixed(2)} mm)
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
          <Legend mobile />
        </div>
      )}
    </div>
  );
}