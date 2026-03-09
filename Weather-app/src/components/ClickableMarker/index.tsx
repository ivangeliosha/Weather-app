import { Marker, Popup, useMapEvents } from "react-leaflet";
import CardInfo from "../CardInfo";
import { googleMarker } from "../../icons/marker";
import type { Weather } from "../../types/Weather";

function ClickableMarker({
  position,
  setPosition,
  weather,
  info,
}: {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  weather: Weather;
  info: { [key: string]: string };
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return (
    <Marker position={position} icon={googleMarker}>
      <Popup>
        <CardInfo weather={weather} info={info} />
      </Popup>
    </Marker>
  );
}
export default ClickableMarker;
