"use client";

import { useAuth } from "@/app/context/useAuth";
import { useCart } from "@/app/context/useCart";
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
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { signOut, signOutLoading } = useAuth();
  const { refreshCart } = useCart();
  const router = useRouter();

  // Handle logout
  const handleSignOut = async () => {
    await signOut();
    refreshCart();
    router.replace("/");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="flex gap-4 justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-50 h-11 
          rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
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
            You can sign back in anytime with your credentials.
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
  );
}
