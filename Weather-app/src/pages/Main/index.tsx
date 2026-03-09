import { MapContainer, TileLayer } from "react-leaflet";
import css from "./Main.module.css";
import { useEffect, useState } from "react";
import ClickableMarker from "../../components/ClickableMarker";
import type { Weather } from "../../types/Weather";
import requestWeather from "../../components/RequestWeather";
import requestInformation from "../../components/RequestInformation";
function Main() {
  const [position, setPosition] = useState<[number, number]>([
    55.613699390365326, 37.60106467874721,
  ]);
  const [weather, setWeather] = useState<Weather>({
    temperature: 0,
    windy: 0,
    wet: 0,
    pressure: 0,
  });
  const [info, setInfo] = useState<{ [key: string]: string }>({
    info: "No information",
  });
  useEffect(() => {
    async function weatherSetting() {
      try {
        const response: any = await requestWeather({ position: position });
        setWeather({
          temperature: Number(
            ((response["temp-surface"].at(-1) ?? 0) - 273.15).toFixed(1),
          ),
          windy: Number(
            Math.sqrt(
              (response["wind_u-surface"].at(-1) ?? 0) ** 2 +
                (response["wind_v-surface"].at(-1) ?? 0) ** 2,
            ).toFixed(1),
          ),
          wet: Number(response["rh-surface"].at(-1).toFixed(1)),
          pressure: Number(response["pressure-surface"].at(-1).toFixed(1)),
        });
        console.log(weather);
      } catch (e) {
        console.error("Ошибка при загрузке погоды", e);
      }
    }
    async function informationSetting() {
      try {
        const responseInfo: any = await requestInformation({
          position: position,
        });
        setInfo(responseInfo);
      } catch (e) {
        console.error("Ошибка при загрузке погоды", e);
      }
    }
    weatherSetting();
    informationSetting();
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
          weather={weather}
          info={info}
        />
      </MapContainer>
    </div>
  );
}

export default Main;
