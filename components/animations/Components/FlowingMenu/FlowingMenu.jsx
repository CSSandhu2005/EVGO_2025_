"use client";
import React from "react";

export default function FlowingMenu() {
  return (
    <div className="w-full overflow-hidden bg-black py-8">
      <div className="whitespace-nowrap animate-marquee flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center mr-12">
            <span className="text-white text-3xl font-bold uppercase">
              Electric SUV
            </span>
            <div
              className="w-40 h-20 bg-center bg-cover rounded-full mx-4"
              style={{ backgroundImage: "url('/images/suv.jpg')" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
