import { AddCarForm } from "./_components/add-car-form";

export const metadata = {
  title: "Add New Car | EVGO Admin",
  description: "Add a new car to the marketplace",
};

export default function AddCarPage() {
  return (
    <div className="p-8 pt-10">
      <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
      <AddCarForm />
    </div>
  );
}