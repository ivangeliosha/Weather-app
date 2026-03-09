export default async function requestInformation({
  position,
}: {
  position: [number, number];
}) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position[0]}&lon=${position[1]}&format=json`,
  );
  const data = await response.json();
  return data["address"];
}
