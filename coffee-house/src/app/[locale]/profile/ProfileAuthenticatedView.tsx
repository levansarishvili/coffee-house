"use client";

import { useAuth } from "@/app/context/useAuth";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import ProfileForm from "./ProfileForm";

export default function ProfileAuthenticatedView() {
  const { userProfile, signOut, signOutLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  console.log(userProfile);
  return (
    <section className="flex flex-col justify-center items-center w-full">
      <div className="w-full rounded-[40px] relative">
        <div className="h-36 md:h-56 overflow-hidden rounded-[40px]">
          <Image
            src="/assets/profile-bg.png"
            alt="User profile background"
            width={1360}
            height={800}
            className="object-contain opacity-80"
          />
        </div>
      </div>

      {/* Profile form */}
      <ProfileForm />

      {/* Logout */}
      <button
        onClick={handleSignOut}
        className="flex gap-4 justify-center items-center border mt-10 font-semibold cursor-pointer border-[#665f55] w-50 h-11 rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
        disabled={signOutLoading ? true : false}
      >
        {signOutLoading ? (
          <>
            <Spinner />
            Logging out...
          </>
        ) : (
          <>Sign out</>
        )}
      </button>
    </section>
  );
}
