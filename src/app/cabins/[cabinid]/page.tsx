import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Image from "next/image";

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
  description?: string;
};

// Metadata generation with correct param name
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

// Static params must match the dynamic segment name [cabinId]
export async function generateStaticParams(): Promise<{ cabinId: string }[]> {
  const cabins = await getCabins();
  return cabins.map((cabin: Cabin) => ({
    cabinId: String(cabin.id),
  }));
}

// Main page component with consistent naming
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const cabin: Cabin = await getCabin(resolvedParams?.cabinId);
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3 h-[400px]">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>

        <div>
          <p className="text-lg text-primary-300 mb-10">{description}</p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
