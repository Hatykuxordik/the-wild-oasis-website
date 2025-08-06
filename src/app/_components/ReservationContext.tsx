"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";

// --------------------
// 1. Context Type Definition
// --------------------
interface ReservationContextType {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
}

// --------------------
// 2. Initial State
// --------------------
const initialState: DateRange = {
  from: undefined,
  to: undefined,
};

// --------------------
// 3. Create Context With Type
// --------------------
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

// --------------------
// 4. Provider Component With Type
// --------------------
interface ReservationProviderProps {
  children: ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

// --------------------
// 5. Custom Hook With Type Safety
// --------------------
function useReservation(): ReservationContextType {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
