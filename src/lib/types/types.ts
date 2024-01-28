export type Place = {
  id: number;
  name: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
};

export type Route = {
  id: number;
  description: string;
  waypoints: Place[];
};
