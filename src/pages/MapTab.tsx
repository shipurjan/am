import { Map } from "../components/Map";
import { Tab } from "../components/Tab";

export const MapTab = () => {
  return (
    <Tab title={"Map"} size={"small"}>
      <div className="w-full h-full">
        <Map />
      </div>
    </Tab>
  );
};
