'use client';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngBoundsExpression } from 'leaflet';
import { useEffect, useState } from 'react';
import { useWaterLevelStation, WaterLevelStation } from '../../contexts/WaterLevelStationContext';
import { fetchWaterStations } from '../../utils/WaterLevelApis';

// Expanded Mumbai bounds to allow more rightward panning
const mumbaiBounds: LatLngBoundsExpression = [
  [18.85, 72.00], // Southwest - moved left boundary further left
  [19.35, 73.15], // Northeast - moved right boundary further right
];

const getInitialCenter = (): [number, number] => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return [19.12, 72.90]; // mobile
  }
  return [19.076, 73.10]; // desktop
};

export default function WaterLevelMap() {
  const [stations, setStations] = useState<WaterLevelStation[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>(getInitialCenter);
  const [mapZoom, setMapZoom] = useState<number>(11);
  const [minZoom, setMinZoom] = useState(11);
  const { setSelectedStation } = useWaterLevelStation();

  useEffect(() => {
    fetchWaterStations()
      .then(setStations)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        setMapCenter([19.08, 72.90]);
        setMapZoom(4);
        setMinZoom(4);
      } else {
        setMapCenter([19.076, 73.10]);
        setMapZoom(11);
        setMinZoom(11);
      }
    }
  }, []);

  return (
    <div
      className="md:fixed md:top-0 md:left-0 md:w-full md:h-screen relative w-full h-[75vh] z-0 overflow-visible"
      style={{ touchAction: 'none' }}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        minZoom={minZoom}
        maxZoom={18}
        maxBounds={mumbaiBounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        attributionControl={false}
        whenReady={() => {}}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {stations.length > 0 && stations.map(station => (
          <CircleMarker
            key={station.id}
            center={[station.latitude, station.longitude]}
            radius={8}
            color="blue"
            weight={1.5}
            fillColor="#00BFFF"
            fillOpacity={1}
            eventHandlers={{
              click: () => setSelectedStation(station)
            }}
          >
            <Tooltip permanent={false} direction="top" offset={[0, -10]}>
              {station.name}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}