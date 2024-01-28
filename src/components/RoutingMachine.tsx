import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';

const RoutingMachineComponent = ({
  options
}: {
  options: L.Routing.RoutingControlOptions;
}) => {
  return createControlComponent(() => L.Routing.control(options));
};

export default RoutingMachineComponent;
