import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useTimeout } from "../lib/hooks/useTimeout";

export const Map = () => {
  const position = [51.505, -0.09] as LatLngExpression;
  return (
    <MapContainer
      center={position}
      className="w-full h-full"
      zoom={13}
      scrollWheelZoom={true}
      style={{ minWidth: "100%", minHeight: "100%" }}
    >
      <MapEventHandler />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
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
