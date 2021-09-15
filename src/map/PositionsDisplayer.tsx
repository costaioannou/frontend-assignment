import { Polyline, useMap } from 'react-leaflet';
import React, { useEffect, useState } from 'react';
import { latLngBounds, LatLngExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { Marker } from '../marker';
import { getMarkerBounds, positionsStream } from './helpers';
import { Position } from '../app';
import { Configuration } from '../constants';

export const PositionsDisplayer = ({ positions }: { positions: Position[] }): JSX.Element => {
  const [markers, setMarkers] = useState<Position[]>([]);

  const [currentPosition, setCurrentPosition] = useState<Position|null>(null);

  const [polylinePositions, setPolylinePositions] = useState<LatLngExpression[]>([]);

  const map = useMap();

  const clearMap = (): void => {
    setMarkers([]);

    setPolylinePositions([]);
  };

  useEffect(() => {
    clearMap();

    setCurrentPosition(null);

    const stream = positionsStream(positions);

    const intervalId = setInterval(() => {
      const { value, done } = stream.next();

      if (value) {
        setCurrentPosition(value);
      }

      if (done) {
        clearInterval(intervalId);

        const markerBounds = getMarkerBounds(positions);

        if (markerBounds.length) {
          const bounds = latLngBounds(markerBounds);

          map.fitBounds(bounds);
        }
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);

      clearMap();
    };
  }, [map, positions]);

  useEffect(() => {
    if (currentPosition) {
      setMarkers((previousMarkers) => [...previousMarkers, currentPosition]);

      const positionLatLng: LatLngExpression = [+currentPosition.LAT, +currentPosition.LON];

      setPolylinePositions((previousPolylinePositions) => [...previousPolylinePositions, positionLatLng]);

      map.flyTo(positionLatLng, Configuration.MAP_FLYING_ZOOM);
    }

    return () => {
      setCurrentPosition(null);
    };
  }, [map, currentPosition]);

  return (
    <>
      {markers.length
      && (
      <MarkerClusterGroup showCoverageOnHover={false} removeOutsideVisibleBounds>
        {
          markers.map((marker) => (
            <Marker key={marker.TIMESTAMP + marker.LAT + marker.LON} position={marker} />
          ))
        }
      </MarkerClusterGroup>
      )}
      <Polyline pathOptions={{ color: 'red', dashArray: '5' }} positions={polylinePositions} />
    </>
  );
};
