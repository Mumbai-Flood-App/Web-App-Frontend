import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapPinPickerProps {
  onSelect: (latlng: { lat: number; lng: number }, address?: string) => void;
}

const mumbaiCenter: [number, number] = [19.076, 72.8777];

function LocationMarker({ onSelect }: { onSelect: (latlng: { lat: number; lng: number }, address?: string) => void }) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      // Optionally, reverse geocode here for address
      onSelect(e.latlng);
    },
  });

  return position ? (
    <Marker position={position} icon={L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      shadowSize: [41, 41],
    })} />
  ) : null;
}

export default function MapPinPicker({ onSelect }: MapPinPickerProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={mumbaiCenter}
        zoom={11}
        minZoom={10}
        maxZoom={18}
        className="w-full h-full cursor-[url('/img/pin.svg'),_pointer]"
        style={{ minHeight: 320 }}
        scrollWheelZoom={true}
        dragging={true}
        touchZoom={true}
        doubleClickZoom={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker onSelect={onSelect} />
      </MapContainer>
    </div>
  );
} 