// src/map/icons.ts
import L from "leaflet";

export const googleMarker = L.divIcon({
  className: "custom-marker",
  html: `
<svg width="28" height="28" viewBox="0 0 24 24">
  <path
    d="M12 2C8.13 2 5 5.13 5 9
       c0 5.25 7 13 7 13
       s7-7.75 7-13
       c0-3.87-3.13-7-7-7z"
    fill="none"
    stroke="black"
    stroke-width="1"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <circle
    cx="12"
    cy="9"
    r="2.3"
    fill="none"
    stroke="black"
    stroke-width="1"
  />
</svg>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 1],
  popupAnchor: [-200, 0],
});
