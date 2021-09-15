import L from 'leaflet';

import ShipIconPng from './ship.png';

export const ShipIcon = new L.Icon({
  iconUrl: ShipIconPng,
  iconRetinaUrl: ShipIconPng,
  iconAnchor: undefined,
  popupAnchor: [0, 0],
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(25, 25),
});
