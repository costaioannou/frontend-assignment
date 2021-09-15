import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Map } from '../map';
import { Header } from '../header';
import { Configuration } from '../constants';
import { Position } from './Position';

export const App = (): JSX.Element => {
  const [mmsi, setMmsi] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<Error|null>(null);

  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (mmsi) {
      setLoading(true);

      const { BASE_URL, API_KEY } = Configuration;

      fetch(`${BASE_URL}/${API_KEY}/days:1/period:hourly/mmsi:${mmsi}/protocol:jsono`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failure on fetching latest vessel positions');
          } else {
            return response.json();
          }
        })
        .then((fetchedPositions: Position[]) => {
          setLoading(false);

          setError(null);

          setPositions(fetchedPositions);
        })
        .catch((err: Error) => {
          setLoading(false);

          setError(err);
        });
    }
  }, [mmsi]);

  return (
    <Box height="100vh">
      <Header loading={loading} error={error} submit={setMmsi} />
      <Map positions={positions} />
    </Box>
  );
};
