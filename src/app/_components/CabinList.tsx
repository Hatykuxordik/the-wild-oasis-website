import React from "react";

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

async function CabinList() {
  //noStore();  Ensure this data is not cached
  // 2️⃣ Type the array correctly
  const cabins: Cabin[] = await getCabins();

  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
