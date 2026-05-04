import { migrateTemporaryCartToUserCart } from "@/utils/cartMigrationServer.ts";
import { createClient } from "../../../../utils/supabase/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || "/";
  const origin = requestUrl.origin;

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error getting user:", userError);
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // Migrate cart items using server-side function
  if (user) {
    try {
      await migrateTemporaryCartToUserCart(user.id);
      console.log("Cart migration completed successfully");
    } catch (error) {
      console.error("Cart migration failed:", error);
    }
  }

  if (user) {
    try {
      // Check if user already exists in user_profiles table
      const { error: checkError } = await supabase
        .from("user_profiles")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      // If user doesn't exist in user_profiles, create a new profile
      if (checkError && checkError.code === "PGRST116") {
        const { error: insertError } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: user.id,
              email: user.email,
              avatar_url:
                user.user_metadata?.avatar_url ||
                user.user_metadata?.picture ||
                "",
              created_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          console.error("Error creating user profile:", insertError);
        } else {
          console.log("User profile created successfully for:", user.email);
        }
      } else if (checkError) {
        console.error("Error checking user profile:", checkError);
      }
      // If existingProfile exists, do nothing
    } catch (error) {
      console.error("Unexpected error in profile creation:", error);
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
