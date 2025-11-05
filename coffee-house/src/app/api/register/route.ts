import { createClient } from "@/utils/supabase/api";
import { createAdminClient } from "@/utils/supabase/server-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.formData();

    const avatar = formData.get("avatar") as File | null;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const city = formData.get("city") as string;
    const street = formData.get("street") as string;
    const house_number = formData.get("house_number") as string;

    if (!email || !password || !city || !street || !house_number) {
      return NextResponse.json(
        { error: "Some fields are missing" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();

    // 1. Register user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
    });

    if (authError) {
      console.error("Auth registration error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }

    let avatarUrl = null;

    // 2. Upload avatar if provided
    if (avatar && avatar.size > 0 && avatar.name) {
      try {
        // Generate unique filename
        const fileExtension = avatar.name.split(".").pop() || "jpg";
        const fileName = `avatar-${
          authData.user.id
        }-${Date.now()}.${fileExtension}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } =
          await supabaseAdmin.storage.from("avatars").upload(fileName, avatar, {
            contentType: avatar.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Avatar upload error:", uploadError);
          // Continue without avatar - don't fail registration
        } else {
          // Get public URL for the uploaded avatar
          const { data: publicUrlData } = supabaseAdmin.storage
            .from("avatars")
            .getPublicUrl(uploadData.path);

          avatarUrl = publicUrlData.publicUrl;
          console.log("Avatar uploaded successfully:", avatarUrl);
        }
      } catch (avatarError) {
        console.error("Avatar processing error:", avatarError);
        // Continue registration without avatar
      }
    } else {
      console.log("No avatar file provided or file is empty");
    }

    // 3. Create the user profile
    const { data, error } = await supabase
      .from("user_profiles")
      .insert([
        {
          user_id: authData.user.id,
          created_at: new Date().toISOString(),
          email: email.toLowerCase(),
          city,
          street,
          house_number,
          avatar_url: avatarUrl,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: "User created successfully",
        user: data,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
