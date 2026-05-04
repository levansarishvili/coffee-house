import { createClient } from "@/utils/supabase/api";
import { createAdminClient } from "@/utils/supabase/server-admin";
import { NextRequest, NextResponse } from "next/server";

interface UpdateProfileData {
  email: string;
  city: string;
  street: string;
  house_number: string;
  full_name: string;
  username: string;
  updated_at: string;
  avatar_url?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.formData();

    const avatar = formData.get("avatar") as File | null;
    const avatar_changed = formData.get("avatar_changed") as string;

    const full_name = formData.get("full_name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const city = formData.get("city") as string;
    const street = formData.get("street") as string;
    const house_number = formData.get("house_number") as string;

    const avatarChanged = avatar_changed === "true" ? true : false;

    if (
      !full_name ||
      !username ||
      !email ||
      !city ||
      !street ||
      !house_number
    ) {
      return NextResponse.json(
        { error: "Some fields are missing" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const supabaseAdmin = createAdminClient();

    // 1. Get authenticated user id
    const { data: authData, error: authError } = await supabase.auth.getUser();
    const user_id = authData?.user?.id;

    if (authError) {
      console.error("User authentication error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: "User profile updating failed" },
        { status: 500 }
      );
    }

    // 2. Delete old avatar from supabase storage
    if (avatarChanged) {
      try {
        // List all files to find the one containing user ID
        const { data: files, error } = await supabaseAdmin.storage
          .from("avatars")
          .list("");

        if (error) {
          console.error("Error listing avatars:", error);
          return;
        }

        if (files && files.length > 0) {
          // Find the file that contains the user ID
          const userAvatarFile = files.find((file) =>
            file.name.includes(user_id as string)
          );

          if (userAvatarFile) {
            const { error: deleteError } = await supabaseAdmin.storage
              .from("avatars")
              .remove([userAvatarFile.name]);

            if (deleteError && deleteError.message !== "Object not found") {
              console.error("Error deleting old avatar:", deleteError);
            } else {
              console.log("Old avatar deleted successfully");
            }
          } else {
            console.log("No existing avatar found for user");
          }
        }
      } catch (error) {
        console.error("Error in deleteOldAvatar:", error);
      }
    }

    let avatarUrl = null;

    // 2. Upload avatar if provided
    if (avatarChanged && avatar && avatar.size > 0 && avatar.name) {
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
      }
    } else {
      console.log("No avatar file provided or file is empty");
    }

    // 3. Update the user profile
    const updateData: UpdateProfileData = {
      email: email.toLowerCase(),
      city,
      street,
      house_number,
      full_name,
      username,
      updated_at: new Date().toISOString(),
    };

    // Only include avatar_url if a new avatar was uploaded
    if (avatarChanged) {
      updateData.avatar_url = avatarUrl as string | undefined;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .update(updateData)
      .eq("user_id", user_id)
      .select()
      .single();

    if (error) {
      console.error("Error updating user profile:", error);
      return NextResponse.json(
        { error: "Failed to update user profile" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: "User profile updated successfully",
        user: data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
