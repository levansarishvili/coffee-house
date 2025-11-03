import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Avatar() {
  return (
    <Link
      href="/profile"
      className="flex justify-center items-center cursor-pointer w-10 h-10 border border-[#665f55] rounded-full hover:bg-[#665f55] hover:text-inverse transition-all duration-300"
    >
      <UserIcon className="w-6 h-6" />
    </Link>
  );
}
