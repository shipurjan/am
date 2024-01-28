import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = () => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(33.55546582848033, 36.25547681726967),
      L.latLng(33.50546582848033, 36.29547681726967),
    ],
    containerClassName: "hidden",
    lineOptions: {
      styles: [{ color: "#FF0000", weight: 5 }],
      extendToWaypoints: true,
      missingRouteTolerance: 1,
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
