import { UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
interface AvatarProps {
  avatar_url: string | undefined;
  loading: boolean;
}

export default function Avatar({ avatar_url, loading }: AvatarProps) {
  return (
    <Link
      href="/profile"
      className="flex justify-center overflow-hidden items-center cursor-pointer w-10 h-10 border border-[#665f55] rounded-full hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300"
    >
      {loading ? (
        <UserIcon className="w-6 h-6 animate-pulse" />
      ) : avatar_url ? (
        <Image
          src={avatar_url}
          alt="User avatar"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      ) : (
        // Show default icon when no avatar
        <UserIcon className="w-6 h-6" />
      )}
    </Link>
  );
}
