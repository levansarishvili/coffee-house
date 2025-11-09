"use client";

import { createClient } from "@/utils/supabase/component";

export default function GoogleSignIn() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google OAuth error:", error);
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex justify-center text-sm gap-2 items-center rounded-[100px] cursor-pointer px-2 h-11 border border-[#665f55] group hover:text-[#e1d4c9] 
      hover:bg-[#665f55] transition-all duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon w-6 h-6 fill-primary group-hover:fill-[#e1d4c9] transition-all duration-300"
        viewBox="0 0 512 512"
      >
        <path d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z" />
      </svg>
      Sign in with Google
    </button>
  );
}
