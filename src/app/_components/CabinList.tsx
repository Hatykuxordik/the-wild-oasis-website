// import {unstable_noStore as noStore} from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

// 1️⃣ Define the shape of a cabin
type Cabin = {
  id: number;
  name: string;
  image: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
};

interface FilterProps {
  filter: string;
}

async function CabinList({ filter }: FilterProps) {
  //noStore();  Ensure this data is not cached
  // 2️⃣ Type the array correctly
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
