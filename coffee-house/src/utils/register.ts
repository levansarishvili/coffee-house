import { RegisterFormData } from "@/app/types/interfaces";

export const registerUser = async (data: RegisterFormData) => {
  const formData = new FormData();

  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("city", data.city);
  formData.append("street", data.street);
  formData.append("house_number", data.house_number);

  if (data.avatar && data.avatar.length > 0) {
    formData.append("avatar", data.avatar[0]);
  }

  const response = await fetch("/api/register", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Registration failed");
  }

  return result;
};
