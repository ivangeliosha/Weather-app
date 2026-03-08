export function Response({ lat, lon }: { lat: number; lon: number }) {
  return {
    lat: lat,
    lon: lon,
    model: "gfs",
    parameters: ["temp", "wind", "rh", "pressure"],
    levels: ["surface"],
    key: "a7VdbgDvq0Ju4uNszaMZERveAXpkOIXS",
  };
}
