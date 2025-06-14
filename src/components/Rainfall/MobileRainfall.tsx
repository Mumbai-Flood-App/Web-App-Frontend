import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Legend from './Legend';
import PlotContainer from './PlotContainer';
import { StationProvider } from '../../contexts/StationContext';
import type { LatLngBoundsExpression } from 'leaflet';

const mumbaiBounds: LatLngBoundsExpression = [
  [18.85, 72.00],
  [19.35, 73.15],
];

interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  rainfall: number;
}

export default function MobileRainfall() {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    fetch('/api/proxy-stations')
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
    <StationProvider>
      {/* Map and legend in a mobile-friendly box */}
      <div className="relative w-full h-56 rounded-lg overflow-hidden mb-2 bg-white border border-blue-300 shadow-md">
        <MapContainer
          center={[19.076, 73.10]}
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
              <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                {station.name} ({station.rainfall.toFixed(2)} mm)
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
        {/* Legend overlay inside the map box */}
        <div className="absolute bottom-2 right-2 left-2">
          <Legend mobile />
        </div>
      </div>
      {/* Plot container below */}
      <div className="w-full mt-6">
        <div className="border border-gray-700 shadow-lg rounded-lg">
          <PlotContainer mobile />
        </div>
      </div>
    </StationProvider>
  );
} 