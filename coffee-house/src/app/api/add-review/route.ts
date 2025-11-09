import { createClient } from "@/utils/supabase/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in to submit a review" },
        { status: 401 }
      );
    }

    // Get user profile including avatar
    const { data: userProfile } = await supabase
      .from("user_profiles")
      .select("avatar_url, username, full_name")
      .eq("user_id", user.id)
      .single();

    const formData = await request.formData();

    // Extract form data
    const rating = formData.get("rating") as string;
    const comment = formData.get("comment") as string;
    const product_id = formData.get("product_id") as string;

    // Validate required fields
    if (!rating || !comment || !product_id) {
      return NextResponse.json(
        { error: "Rating, comment, and product ID are required" },
        { status: 400 }
      );
    }

    const ratingNumber = parseInt(rating);

    // Check if user purchased this product
    const { data: orderItems, error: orderItemsError } = await supabase
      .from("order_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product_id)
      .single();

    if (orderItemsError) {
      console.error("Error checking purchase status:", orderItemsError);
    }

    const purchased_status = !!orderItems;

    // Check if user already added review on this product
    const { data: existingReviews, error: checkError } = await supabase
      .from("reviews")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product_id);

    if (checkError) {
      console.error("Error checking existing reviews:", checkError);
    }

    // If review already exists, return error
    if (existingReviews && existingReviews.length > 0) {
      return NextResponse.json(
        { error: "You have already reviewed this product!" },
        { status: 409 }
      );
    }

    // Insert review into Supabase
    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          product_id: parseInt(product_id),
          user_id: user.id,
          user_avatar_url: userProfile?.avatar_url,
          user_name:
            userProfile?.username ||
            userProfile?.full_name ||
            user.email?.split("@")[0] ||
            "Anonymous",
          rating: ratingNumber,
          comment: comment.trim(),
          purchased_status,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        success: true,
        review: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
