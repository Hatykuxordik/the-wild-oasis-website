import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Metadata } from "next";
import Link from "next/link";
import NotFound from "./not-found";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

type Props = {
  params: Promise<{
    cabinId: string;
  }>;
};

type Cabin = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description: string;
};

export const revalidate = 3600;

// Metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const cabin = await getCabin(resolvedParams.cabinId);

  if (!cabin) {
    return {
      title: "Cabin Not Found",
    };
  }

  return {
    title: `Cabin ${cabin.name}`,
  };
}

// Static params
export async function generateStaticParams(): Promise<{ cabinId: string }[]> {
  const cabins = await getCabins();
  return cabins.map((cabin: Cabin) => ({
    cabinId: String(cabin.id),
  }));
}

// Main page component
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const cabin = await getCabin(resolvedParams.cabinId);

  // Handle case where cabin is null
  if (!cabin) {
    return <NotFound />;
  }

  return (
    <div className="w-full md:max-w-6xl mx-2 md:mx-auto mt-8">
      <Link
        href="/cabins"
        className="md:hidden absolute top-22 left-1 z-20 text-primary-100 hover:text-accent-400 transition-colors"
        aria-label="Back to cabins"
      >
        <svg
          className="w-6 h-6 text-primary-100"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
      </Link>

      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today.{" "}
          <span className="block md:inline">Pay on arrival.</span>
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
