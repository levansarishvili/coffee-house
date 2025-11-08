"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/useAuth";
import Loading from "@/Loading";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  // Show loading state or nothing while checking
  if (loading) {
    return (
      <main className="flex justify-center items-center w-full h-screen">
        <Loading />
      </main>
    );
  }

  // If user is not logged in, don't render children
  if (!user) {
    return (
      <main className="flex justify-center items-center w-full h-screen">
        <Loading />
      </main>
    );
  }

  return <>{children}</>;
}
