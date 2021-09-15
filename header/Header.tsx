import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button, HStack, Input,
} from '@chakra-ui/react';

export const ErrorMessage = ({ message }: {message: string}): JSX.Element => (
  <Alert status="error" borderRadius={4}>
    <AlertIcon />
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export const Header = (
  {
    loading,
    error,
    submit,
  }: {
      loading: boolean,
      error: Error|null,
      submit: Dispatch<SetStateAction<string>>
  },
): JSX.Element => {
  const [mmsi, setMmsi] = useState<string>('');

  return (
    <HStack width="100%" p={3} spacing={5} height="72px">
      <Input
        w={250}
        type="text"
        placeholder="Enter MMSI e.g 237029400"
        size="md"
        onChange={(event) => setMmsi(event.currentTarget.value)}
      />
      <Button
        isLoading={loading}
        loadingText="Submitting"
        colorScheme="blue"
        onClick={() => submit(mmsi)}
      >
        Submit
      </Button>
      {error && <ErrorMessage message={error.message} />}
    </HStack>
  );
};
