export default async function requestWeather({
  position,
}: {
  position: [number, number];
}) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lat: position[0],
      lon: position[1],
      model: "gfs",
      parameters: ["temp", "wind", "rh", "pressure"],
      levels: ["surface"],
      key: "a7VdbgDvq0Ju4uNszaMZERveAXpkOIXS",
    }),
  };
  const response = await fetch(
    "https://api.windy.com/api/point-forecast/v2",
    requestOptions,
  );
  const data = await response.json();
  return data;
}
