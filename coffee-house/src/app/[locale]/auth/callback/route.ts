import { createClient } from "../../../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect_to") || "/";
  const origin = requestUrl.origin;

  const supabase = await createClient();

  // Step 1: Exchange the auth code for a session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/login`);
    }
  }

  // Step 3: Redirect user to the intended destination
  return NextResponse.redirect(`${origin}${redirectTo}`);
}
