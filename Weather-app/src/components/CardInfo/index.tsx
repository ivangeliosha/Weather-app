import css from "./CardInfo.module.css";
function CardInfo({
  temperature,
  windy,
  wet,
  pressure,
}: {
  temperature: number;
  windy: number;
  wet: number;
  pressure: number;
}) {
  return (
    <div className={css.body}>
      <div className={css.nameCoordinate}>
        Такая-то точка на карте (место или координаты)
      </div>
      <div className={css.info}>
        <span>Температура: {temperature}</span>
        <span>Ветер: {windy}</span>
        <span>Влажность: {wet}</span>
        <span>Давление: {pressure}</span>
      </div>
      <button className={css.button}>додепать</button>
    </div>
  );
}

export default CardInfo;
