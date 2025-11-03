import { ShoppingBagIcon } from "@/utils/CustomIcons";
import { GiftIcon, StarIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="flex flex-col justify-center items-center gap-10">
      <div className="text-center">
        <h1 className="text-[32px] md:text-6xl font-semibold mb-6">
          <span className="text-accent italic">Join</span> Our Community
        </h1>
        <p className="text-lg max-w-md">
          Sign in to unlock personalized features and make the most of your
          coffee journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div className="text-center p-6 border border-[#665f55] rounded-[10px] hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-[#665f55] rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBagIcon className="w-6 h-6 text-[#e1d4c9]" />
          </div>
          <h3 className="font-semibold mb-2">Shop Now</h3>
          <p className="text-sm mb-4">
            Explore our collection and make purchases
          </p>
        </div>

        <div className="text-center p-6 border border-[#665f55] rounded-[10px] hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-[#665f55] rounded-full flex items-center justify-center mx-auto mb-4">
            <StarIcon className="w-6 h-6 text-[#e1d4c9]" />
          </div>
          <h3 className="font-semibold mb-2">Save Favorites</h3>
          <p className="text-sm">
            Keep your preferred blends and brewing methods
          </p>
        </div>

        <div className="text-center p-6 border border-[#665f55] rounded-[10px] hover:shadow-md transition-shadow duration-300">
          <div className="w-12 h-12 bg-[#665f55] rounded-full flex items-center justify-center mx-auto mb-4">
            <GiftIcon className="w-6 h-6 text-[#e1d4c9]" />
          </div>
          <h3 className="font-semibold mb-2">Exclusive Rewards</h3>
          <p className="text-sm">
            Earn points and get special member-only offers
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Link
          href="/login"
          className="flex justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 py-2.5 px-[78px] rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="flex justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 py-2.5 px-[78px] rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
        >
          Register
        </Link>
      </div>

      <div className="text-center text-sm mt-8">
        <p>By joining, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </main>
  );
}
