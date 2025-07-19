import { eachDayOfInterval } from "date-fns";
import { supabase } from "@/app/_lib/supabase";
import { notFound } from "next/navigation";

// Types
export type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
};

export type Guest = {
  id: number;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
  created_at: string;
};

export type Booking = {
  id: number;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  cabinId: string;
  status: string;
  created_at: string;
  cabins?: { name: string; image: string };
};

export type Settings = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
};

export type Country = {
  name: string;
  flag: string;
};

// GET
export async function getCabin(id: string): Promise<Cabin | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function getCabinPrice(
  id: string
): Promise<Pick<Cabin, "regularPrice" | "discount"> | null> {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();
  if (error) console.error(error);
  return data;
}

export async function getCabins(): Promise<Cabin[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data as Cabin[];
}

export async function getGuest(email: string): Promise<Guest | null> {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();
  return data;
}

export async function getBooking(id: string): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error("Booking could not get loaded");
  return data as Booking;
}

export async function getBookings(guestId: string): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) throw new Error("Bookings could not get loaded");
  return data as Booking[];
}

export async function getBookedDatesByCabinId(
  cabinId: string
): Promise<Date[]> {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todayISO = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayISO},status.eq.checked-in`);

  if (error) throw new Error("Bookings could not get loaded");

  const bookedDates = data
    .map((booking: Booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      })
    )
    .flat();

  return bookedDates;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) throw new Error("Settings could not be loaded");
  return data as Settings;
}

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries as Country[];
  } catch {
    throw new Error("Could not fetch countries");
  }
}

// CREATE
export async function createGuest(
  newGuest: Omit<Guest, "id" | "created_at">
): Promise<Guest[]> {
  const { data, error } = await supabase.from("guests").insert([newGuest]);
  if (error) throw new Error("Guest could not be created");
  return data;
}

export async function createBooking(
  newBooking: Omit<Booking, "id" | "created_at">
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();
  if (error) throw new Error("Booking could not be created");
  return data;
}

// UPDATE
export async function updateGuest(
  id: string,
  updatedFields: Partial<Guest>
): Promise<Guest> {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Guest could not be updated");
  return data;
}

export async function updateBooking(
  id: string,
  updatedFields: Partial<Booking>
): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");
  return data;
}

// DELETE
export async function deleteBooking(id: string): Promise<Booking[]> {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error("Booking could not be deleted");
  return data;
}
