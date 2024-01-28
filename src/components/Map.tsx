import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import RoutingMachine from './RoutingMachine';
import { useEffect, useState } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation';
import L from 'leaflet';
import walk from '../assets/svg/walk.svg';

const markerIcon = L.icon({
  iconUrl: walk,
  iconRetinaUrl: walk,
  popupAnchor: [0, 0],
  iconSize: [48, 48],
  shadowAnchor: [0, 0],
  shadowSize: [16, 16]
});

function CapacitorPositionToLatLngExpression(
  position: Position | null
): LatLngExpression {
  return [position?.coords.latitude ?? 0, position?.coords.longitude ?? 0];
}

export const Map = () => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    Geolocation.watchPosition(
      {
        enableHighAccuracy: true
      },
      (position, err) => {
        if (err) {
          console.error(err);
          return;
        }
        if (position !== null) setPosition(position);
      }
    );
  }, []);

  if (position === null)
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#dddddd] text-black text-3xl">
        Ładowanie...
      </div>
    );

  return (
    <MapContainer
      center={CapacitorPositionToLatLngExpression(position)}
      className="w-full h-full"
      zoom={18}
      scrollWheelZoom={true}
      style={{ minWidth: '100%', minHeight: '100%' }}
      attributionControl={false}>
      <Marker
        icon={markerIcon}
        position={CapacitorPositionToLatLngExpression(position)}
      />
      <MapEventHandler />
      <RoutingMachine />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

const MapEventHandler = () => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, []);
  return null;
};
