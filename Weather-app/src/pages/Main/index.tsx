import { MapContainer, TileLayer } from "react-leaflet";
import css from "./Main.module.css";
import { useEffect, useRef, useState } from "react";
import ClickableMarker from "../../components/ClickableMarker";
import { Response } from "../../components/Request";
function Main() {
  console.log("Start");
  const [position, setPosition] = useState<[number, number]>([55.45, 33.37]);
  console.log(Response({ lat: position[0], lon: position[1] }));
  const temperature = useRef<number>(0);
  const windy = useRef<number>(0);
  const wet = useRef<number>(0);
  const pressure = useRef<number>(0);
  console.log(temperature.current);
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
        console.log(response);
        temperature.current = Number(
          response["temp-surface"].at(-1).toFixed(1),
        );
        windy.current = Number(
          Math.sqrt(
            (response["wind_u-surface"].at(-1) ?? 0) ** 2 +
              (response["wind_v-surface"].at(-1) ?? 0) ** 2,
          ).toFixed(1),
        );
        wet.current = Number(response["rh-surface"].at(-1).toFixed(1));
        pressure.current = Number(
          response["pressure-surface"].at(-1).toFixed(1),
        );
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
        {/* https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png */}
        <ClickableMarker
          position={position}
          setPosition={setPosition}
          temperature={temperature.current}
          windy={windy.current}
          wet={wet.current}
          pressure={pressure.current}
        />
      </MapContainer>
    </div>
  );
}

export default Main;
