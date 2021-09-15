import React, { useEffect, useRef } from 'react';
import {
  Marker as LeafletMarker, Popup,
} from 'react-leaflet';
import { Stack, Text } from '@chakra-ui/react';
import 'leaflet-rotatedmarker';
import { NavigationalStatus } from '../constants';
import { ShipIcon } from './markerIcon';
import { Position } from '../app';

type NavigationalStatusKey = keyof typeof NavigationalStatus;

export const Marker = ({ position }: { position: Position }): JSX.Element => {
  const markerRef = useRef<any>();

  const formatDate = (timestamp: string): string => {
    const formattedDate = new Date(timestamp);
    return `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setRotationOrigin('center center');
      markerRef.current.setRotationAngle(+position.COURSE);
    }
  }, [position]);

  return (
    <LeafletMarker ref={markerRef} position={[+position.LAT, +position.LON]} icon={ShipIcon}>
      <Popup>
        <Stack spacing={3}>
          <Text fontSize="lg">
            {`${formatDate(position.TIMESTAMP)}`}
          </Text>
          <Text fontSize="md">
            {NavigationalStatus[+position.STATUS as NavigationalStatusKey]}
          </Text>
          <Text fontSize="md">
            {`Speed: ${position.SPEED} knots`}
          </Text>
          <Text fontSize="md">
            {`Course: ${position.COURSE}°`}
          </Text>
          <Text fontSize="md">
            {`MMSI: ${position.MMSI}`}
          </Text>
        </Stack>
      </Popup>
    </LeafletMarker>
  );
};
