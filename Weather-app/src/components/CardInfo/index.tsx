import type { Weather } from "../../types/Weather";
import css from "./CardInfo.module.css";
function CardInfo({
  weather: { temperature, windy, wet, pressure },
  info,
}: {
  weather: Weather;
  info: { [key: string]: string };
}) {
  return (
    <div className={css.body}>
      <div className={css.nameCoordinate}>
        <div className={css.nameCoordinate}>
          {info.country}
          {info.state ? `, ${info.state}` : ""}
          {info.county ? `, ${info.county}` : ""}
        </div>
      </div>
      <div className={css.info}>
        <span>
          Температура: {temperature > 0 ? `+${temperature}` : temperature} °C
        </span>
        <span>Ветер: {windy} м/с</span>
        <span>Влажность: {wet} %</span>
        <span>Давление: {(pressure * 0.00750062).toFixed(0)} мм рт.ст.</span>
      </div>
    </div>
  );
}

export default CardInfo;
