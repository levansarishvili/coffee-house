"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  CreditCardIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingBagIcon } from "@/utils/CustomIcons";
import { useAuth } from "@/app/context/useAuth";
import { useCart } from "@/app/context/useCart";

interface AvatarProps {
  isAuthenticated: boolean;
  avatar_url: string | undefined;
  loading: boolean;
}

export default function Avatar({
  isAuthenticated,
  avatar_url,
  loading,
}: AvatarProps) {
  const { signOut } = useAuth();
  const { refreshCart } = useCart();

  // Handle logout
  const handleSignOut = async () => {
    await signOut();
    refreshCart();
  };

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex justify-center overflow-hidden items-center cursor-pointer w-11 h-11 border border-[#665f55] rounded-full hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300">
              {loading ? (
                <UserIcon className="w-6 h-6" />
              ) : avatar_url ? (
                <Image
                  src={avatar_url}
                  alt="User avatar"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                // Show default icon when no avatar
                <UserIcon className="w-6 h-6" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-44 bg-inverse border-[#665f55] rounded-xl"
            align="end"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link href="/profile">
                <DropdownMenuItem className="font-medium cursor-pointer rounded-lg focus:bg-button-hover">
                  <UserIcon className="w-4 h-4 stroke-[1.5]" />
                  Profile
                </DropdownMenuItem>
              </Link>

              <Link href="/cart">
                <DropdownMenuItem className="font-medium cursor-pointer rounded-lg focus:bg-button-hover">
                  <ShoppingBagIcon className="w-4 h-4 stroke-[1.5]" />
                  Cart
                </DropdownMenuItem>{" "}
              </Link>

              <Link href="/orders">
                <DropdownMenuItem className="font-medium cursor-pointer rounded-lg focus:bg-button-hover">
                  <CreditCardIcon className="w-4 h-4 stroke-[1.5]" />
                  Orders
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-[#665f55]" />
            <DropdownMenuItem className="font-medium cursor-pointer rounded-lg focus:bg-button-hover">
              <button
                onClick={handleSignOut}
                className="flex gap-2 items-center cursor-pointer"
              >
                <ArrowLeftStartOnRectangleIcon className="w-4 h-4 stroke-[1.5]" />
                Log out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/profile"
          className="flex justify-center overflow-hidden items-center cursor-pointer w-11 h-11 border border-[#665f55] rounded-full hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all duration-300"
        >
          {loading ? (
            <UserIcon className="w-6 h-6" />
          ) : avatar_url ? (
            <Image
              src={avatar_url}
              alt="User avatar"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          ) : (
            // Show default icon when no avatar
            <UserIcon className="w-6 h-6" />
          )}
        </Link>
      )}
    </>
  );
}
