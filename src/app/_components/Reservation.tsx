// Reservation.tsx
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";

interface Cabin {
  id: string;
}

interface ReservationProps {
  cabin: Cabin;
}

async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="flex flex-col-reverse md:grid md:grid-cols-3 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}

export default Reservation;
