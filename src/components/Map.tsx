import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useTimeout } from "../lib/hooks/useTimeout";
import RoutingMachine from "./RoutingMachine";

export const Map = () => {
  const position = [51.505, -0.09] as LatLngExpression;
  return (
    <MapContainer
      center={position}
      className="w-full h-full"
      zoom={13}
      scrollWheelZoom={true}
      style={{ minWidth: "100%", minHeight: "100%" }}
      attributionControl={false}
    >
      <MapEventHandler />
      <RoutingMachine />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

const MapEventHandler = () => {
  const map = useMap();
  useTimeout(
    () => {
      map.invalidateSize();
    },
    [],
    0
  );
  return null;
};
