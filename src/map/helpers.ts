import { LatLngExpression } from 'leaflet';
import { Position } from '../app';

export function* positionsStream(positions:Position[]): Generator<Position, void, unknown> {
  for (let index = 0; index < positions.length; index += 1) {
    yield positions[index];
  }
}

export const getMarkerBounds = (
  positions: Position[],
): LatLngExpression[] => positions.reduce<LatLngExpression[]>((bounds, position) => {
  bounds.push([+position.LAT, +position.LON]);
  return bounds;
}, []);
