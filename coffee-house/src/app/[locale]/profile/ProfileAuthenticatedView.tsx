"use client";

import { useAuth } from "@/app/context/useAuth";
import Image from "next/image";
import ProfileForm from "./ProfileForm";

export default function ProfileAuthenticatedView() {
  const { userProfile } = useAuth();

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
    </section>
  );
}
