'use client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngBoundsExpression } from 'leaflet';
import { useEffect, useState } from 'react';

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

export default function LeafletMap() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch('https://api.mumbaiflood.in/aws/stations/')
      .then(res => res.json())
      .then(setStations)
      .catch(console.error);
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
    <div className="fixed top-0 left-0 w-full h-screen z-0">
      <MapContainer
        center={[19.076, 73.10]} // Adjusted longitude to be closer to eastern boundary
        zoom={11}
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
            <Popup>{station.name}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}