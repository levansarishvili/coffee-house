"use client";

import TogglePasswordVisibility from "@/app/components/TogglePasswordVisibility";
import { createClient } from "@/utils/supabase/component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GitHubSignIn from "./GitHubSignIn";
import GoogleSignIn from "./GoogleSignIn";
import Link from "next/link";
import { LoginFormData } from "@/app/types/interfaces";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "all",
  });

  const router = useRouter();
  const supabase = createClient();
  const [showPassword, setShowPassword] = useState(false);

  // Handle user login
  async function handleLogin(formData: LoginFormData) {
    const { email, password } = formData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
    }
    router.push("/");
  }

  // const getUserData = async () => {
  //   const userData = await supabase.auth.getUser();
  //   console.log(userData.data.user);
  // };

  return (
    <section className="flex flex-col justify-between items-center gap-5 w-full md:w-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        <div className="flex flex-col w-full relative ">
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Placeholder"
              className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                errors.email ? "border-error focus:outline-error" : ""
              }`}
              {...register("email", {
                required: "Email is required.",
                minLength: {
                  value: 3,
                  message: "Email must be at least 3 characters.",
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>

          {/* Error message */}
          {errors.email?.message && (
            <p
              className={`${
                errors.email.message ? "absolute -bottom-4.5" : "hidden"
              } font-normal text-error text-xs mt-1`}
            >
              {errors.email.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col w-full relative">
          <div className="w-full flex flex-col gap-1.5 relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                errors.password ? "border-error focus:outline-error" : ""
              }`}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
                pattern: {
                  value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                  message: "Must contain at least 1 special character.",
                },
              })}
            />

            {/* Toggle button */}
            <span className="absolute right-0 bottom-6">
              <TogglePasswordVisibility
                show={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />
            </span>
          </div>

          {/* Error message */}
          {errors.password && (
            <p
              className={`${
                errors.password.message ? "absolute -bottom-4.5" : "hidden"
              } font-normal text-error text-xs mt-1`}
            >
              {errors.password.message?.toString()}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="flex mt-2 justify-center items-center border font-semibold cursor-pointer border-[#665f55] w-auto h-11 py-2.5 px-[78px] rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
        >
          Sign in
        </button>
      </form>

      <p className="opacity-80">
        Don&apos;t have an account?{" "}
        <Link className="text-accent font-semibold" href="/register">
          Sign up
        </Link>
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <GitHubSignIn />
        <GoogleSignIn />
      </div>
    </section>
  );
}
