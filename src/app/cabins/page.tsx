import CabinCard from "@/app/_components/CabinCard";
import type { Metadata } from "next";
import { getCabins } from "../_lib/data-service";

export const metadata: Metadata = {
  title: "Cabins",
};

// 1️⃣ Define the shape of a cabin
type Cabin = {
  id: string;
  name: string;
  image: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
};

export default async function Page(): JSX.Element {
  // 2️⃣ Type the array correctly
  const cabins: Cabin[] = await getCabins();
  console.log(cabins);

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* 3️⃣ Optional: Show fallback if no cabins */}
      {cabins.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-primary-300">
          No cabins available right now. Please check back later.
        </p>
      )}
    </div>
  );
}
