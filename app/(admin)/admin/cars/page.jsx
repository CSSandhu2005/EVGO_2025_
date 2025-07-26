import { Suspense } from "react";
import { CarsList } from "./_components/car-list";

export const metadata = {
  title: "Cars | EVGO Admin",
  description: "Manage cars in your marketplace",
};  

export default function CarsPage() {
  return (
    <div className="p-6 pt-12">
      <h1 className="text-2xl font-bold mb-6">Cars Management</h1>

      {/* Suspense for client component using useSearchParams */}
      <Suspense fallback={<div>Loading cars...</div>}>
        <CarsList />
      </Suspense>
    </div>
  );
}
