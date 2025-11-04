import { LoginFormData } from "@/app/types/interfaces";
import { createClient } from "./supabase/component";

export async function login(formData: LoginFormData) {
  const supabase = createClient();

  const { email, password } = formData;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return { data };
}
