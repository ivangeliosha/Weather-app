import css from "./CardInfo.module.css";
function CardInfo({
  temperature,
  windy,
  wet,
  pressure,
  info,
}: {
  temperature: number;
  windy: number;
  wet: number;
  pressure: number;
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
          Температура: {temperature > 0 ? `+${temperature} °C` : temperature} °C
        </span>
        <span>Ветер: {windy} м/с</span>
        <span>Влажность: {wet} %</span>
        <span>Давление: {(pressure * 0.75006).toFixed(0)}</span>
      </div>
    </div>
  );
}

export default CardInfo;
