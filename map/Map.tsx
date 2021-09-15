import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { PositionsDisplayer } from './PositionsDisplayer';
import { Position } from '../app';
import { Configuration } from '../constants';

const { MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM } = Configuration;

export const Map = ({ positions }: {positions: Position[]}): JSX.Element => (

  <MapContainer
    center={MAP_DEFAULT_CENTER as LatLngExpression}
    zoom={MAP_DEFAULT_ZOOM}
    scrollWheelZoom={false}
    maxZoom={15}
  >
    <PositionsDisplayer positions={positions} />
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  </MapContainer>
);
