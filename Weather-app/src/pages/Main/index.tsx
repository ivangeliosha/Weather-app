import { MapContainer, TileLayer } from "react-leaflet";
import css from "./Main.module.css";
import { useEffect, useState } from "react";
import ClickableMarker from "../../components/ClickableMarker";
import { Response } from "../../components/Request";
function Main() {
  const [position, setPosition] = useState<[number, number]>([
    55.613699390365326, 37.60106467874721,
  ]);
  const [temperature, setTemperature] = useState<number>(0);
  const [windy, setWindy] = useState<number>(0);
  const [wet, setWet] = useState<number>(0);
  const [pressure, setPressure] = useState<number>(0);
  const [info, setInfo] = useState<{ [key: string]: string }>({
    info: "No information",
  });
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Response({ lat: position[0], lon: position[1] })),
    };
    fetch("https://api.windy.com/api/point-forecast/v2", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const response: any = data;
        setTemperature(
          Number(((response["temp-surface"].at(-1) ?? 0) - 273.15).toFixed(1)),
        );
        setWindy(
          Number(
            Math.sqrt(
              (response["wind_u-surface"].at(-1) ?? 0) ** 2 +
                (response["wind_v-surface"].at(-1) ?? 0) ** 2,
            ).toFixed(1),
          ),
        );
        setWet(Number(response["rh-surface"].at(-1).toFixed(1)));
        setPressure(Number(response["pressure-surface"].at(-1).toFixed(1)));
      });
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
    )
      .then((response) => response.json())
      .then((data) => {
        setInfo(data["address"]);
      });
  }, [position]);

  return (
    <div className={css.body}>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        className={css.map}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=22.03.20-0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU" />
        <ClickableMarker
          position={position}
          setPosition={setPosition}
          temperature={temperature}
          windy={windy}
          wet={wet}
          pressure={pressure}
          info={info}
        />
      </MapContainer>
    </div>
  );
}

export default Main;
