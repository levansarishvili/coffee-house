import { UpdateProfileData } from "@/app/types/interfaces";

export const updateProfile = async (
  data: UpdateProfileData,
  hasAvatarChanged: boolean | null
) => {
  const formData = new FormData();

  formData.append("full_name", data.full_name);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("city", data.city);
  formData.append("street", data.street);
  formData.append("house_number", data.house_number);

  if (data.avatar && data.avatar.length > 0) {
    formData.append("avatar", data.avatar[0]);
  }
  if (hasAvatarChanged) {
    formData.append("avatar_changed", "true");
  }

  const response = await fetch("/api/update-profile", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "User profile update failed");
  }

  return result;
};
