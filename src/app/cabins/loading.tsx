import Spinner from "@/app/_components/Spinner";

export default function Loader() {
  return (
    <div className="grid items-center justify-items-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
