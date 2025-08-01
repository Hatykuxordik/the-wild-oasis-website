import Image from "next/image";
import Link from "next/link";

import image1 from "../../../public/about-1.jpg";
import image2 from "../../../public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const metadata = {
  title: "About",
};

export const revalidate = 86400; // Revalidate every day

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="flex flex-col md:grid md:grid-cols-5 gap-x-24 gap-y-16 md:gap-y-32 text-lg items-center">
      <div className="order-2 md:col-span-3">
        <h1 className="text-3xl mb-3 md:text-4xl md:mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="order-1 md:col-span-2">
        <Image
          src={image1}
          placeholder="blur"
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="order-3 md:col-span-2">
        <Image
          src={image2}
          placeholder="blur"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="order-4 md:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-3 md:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <div>
            <Link
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
