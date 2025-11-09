"use client";

import ProfileAuthenticatedView from "./ProfileAuthenticatedView";
import Loading from "@/Loading";
import { useAuth } from "@/app/context/useAuth";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  return (
    <main className="flex  justify-center items-center w-full">
      {loading && <Loading />}
      {!loading && user && <ProfileAuthenticatedView />}
    </main>
  );
}
