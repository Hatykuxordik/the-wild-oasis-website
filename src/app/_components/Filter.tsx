"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className="py-1 md:py-2 px-2 md:px-5 hover:bg-primary-700 transition-colors"
        onClick={() => handleFilter("all")}
      >
        All Cabins
      </button>
      <button
        className="py-1 md:py-2 px-2 md:px-5 hover:bg-primary-700 transition-colors"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 Guests
      </button>
      <button
        className="py-1 md:py-2 px-2 md:px-5  hover:bg-primary-700 transition-colors"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 Guests
      </button>
      <button
        className="py-1 md:py-2 px-2 md:px-5 hover:bg-primary-700 transition-colors"
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 Guests
      </button>
    </div>
  );
}
