"use client";

import React from "react";

export default function Filter() {
  return (
    <div className="border border-primary-800 flex gap-2 mb-5">
      <button className="flex-1 py-2 px-5 bg-primary-800 text-primary-200 hover:bg-primary-700 transition-colors">
        All Cabins
      </button>
      <button className="flex-1 py-2 px-5 bg-primary-800 text-primary-200 hover:bg-primary-700 transition-colors">
        1&mdash;3 Guests
      </button>
      <button className="flex-1 py-2 px-5 bg-primary-800 text-primary-200 hover:bg-primary-700 transition-colors">
        4&mdash;7 Guests
      </button>
      <button className="flex-1 py-2 px-5 bg-primary-800 text-primary-200 hover:bg-primary-700 transition-colors">
        8&mdash;12 Guests
      </button>
    </div>
  );
}
