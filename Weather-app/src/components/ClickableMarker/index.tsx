import { Marker, Popup, useMapEvents } from "react-leaflet";
import CardInfo from "../CardInfo";
import { googleMarker } from "../../icons/marker";

function ClickableMarker({
  position,
  setPosition,
  temperature,
  windy,
  wet,
  pressure,
}: {
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  temperature: number;
  windy: number;
  wet: number;
  pressure: number;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return (
    <Marker position={position} icon={googleMarker}>
      <Popup>
        <CardInfo
          temperature={temperature}
          windy={windy}
          wet={wet}
          pressure={pressure}
        />
      </Popup>
    </Marker>
  );
}
export default ClickableMarker;
