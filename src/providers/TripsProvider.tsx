import { PropsWithChildren, createContext } from 'react';

interface Trip {
  label: string;
  isCheckedIn: boolean;
}

type Context = {
  trips: Map<string, Trip>;
  checkIn(tripID: string): void;
};

const trips = new Map([
  [ '0', { label: 'Trip #1', isCheckedIn: false }],
  [ '1', { label: 'Trip #2', isCheckedIn: false }],
  [ '2', { label: 'Trip #3', isCheckedIn: false }]
]);

export const TripsContext = createContext<Context>({
  trips,
  checkIn: () => {}
});

export const TripsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const checkIn = (tripID: string) => {
    const trip = trips.get(tripID);
    if (trip) {
      trips.set(tripID, { ...trip, isCheckedIn: true });
    }
  };

  return (
    <TripsContext.Provider value={{ trips, checkIn }}>
      {children}
    </TripsContext.Provider>
  );
};
