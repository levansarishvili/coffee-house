"use client";

import { useAuth } from "@/app/context/useAuth";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ProfileAuthenticatedView() {
  const { userProfile, signOut, signOutLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeleteUser = async () => {};

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

      <div className="flex flex-col md:flex-row gap-0 md:gap-8">
        {/* Logout */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
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
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-80 md:max-w-96 rounded-2xl border-[#665f55]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to sign out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will need to sign in again to access your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-[#665f55] rounded-xl cursor-pointer bg-transparent hover:bg-[#665f55] hover:text-[#e1d4c9]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="border border-[#665f55] rounded-xl cursor-pointer bg-transparent hover:bg-[#665f55] hover:text-[#e1d4c9]"
                onClick={handleSignOut}
              >
                Sign out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete user */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="flex gap-4 justify-center items-center border mt-10 font-semibold cursor-pointer border-[#665f55] w-50 h-11 rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
              disabled={signOutLoading ? true : false}
            >
              {signOutLoading ? (
                <>
                  <Spinner />
                  Deleting...
                </>
              ) : (
                <>Delete user</>
              )}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-80 md:max-w-96 rounded-2xl border-[#665f55]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-[#665f55] rounded-xl cursor-pointer bg-transparent hover:bg-[#665f55] hover:text-[#e1d4c9]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="border border-[#665f55] rounded-xl cursor-pointer bg-transparent hover:bg-[#665f55] hover:text-[#e1d4c9]"
                onClick={handleDeleteUser}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}
