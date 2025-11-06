"use client";

import TogglePasswordVisibility from "@/app/components/TogglePasswordVisibility";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import GitHubSignIn from "./GitHubSignIn";
import GoogleSignIn from "./GoogleSignIn";
import Link from "next/link";
import { LoginFormData } from "@/app/types/interfaces";
import { login } from "@/utils/login";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { migrateTemporaryCartToUserCart } from "@/utils/cartMigration.ts";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginFormData>({
    mode: "all",
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle user login
  const handleLogin = async (formData: LoginFormData) => {
    try {
      setIsLoading(true);
      const { data } = await login(formData);

      // Migrate cart items from temporary_cart to user cart
      await migrateTemporaryCartToUserCart(data.user.id);

      console.log(data);
      // router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-between items-center gap-5 w-full md:w-auto">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        {/* Email */}
        <div className="flex flex-col w-full relative ">
          <div className="w-full flex flex-col gap-1.5">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Placeholder"
              className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                errors.email
                  ? "border-error focus:outline-error"
                  : touchedFields.email && watch("email") && !errors.email
                  ? "border-success focus:outline-success"
                  : "border-[#665f55] focus:outline-[#665f55]"
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

        {/* Password */}
        <div className="flex flex-col w-full relative">
          <div className="w-full flex flex-col gap-1.5 relative">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                errors.password
                  ? "border-error focus:outline-error"
                  : touchedFields.password &&
                    watch("password") &&
                    !errors.password
                  ? "border-success focus:outline-success"
                  : "border-[#665f55] focus:outline-[#665f55]"
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
          className="flex gap-4 w-[200px] mt-2 justify-center items-center border font-semibold cursor-pointer border-[#665f55] h-11 rounded-[100px] hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all"
          disabled={isLoading || !isValid ? true : false}
        >
          {isLoading ? (
            <>
              <Spinner />
              Logging in...
            </>
          ) : (
            <>Sign in</>
          )}
        </button>
      </form>

      <p className="opacity-80">
        Don&apos;t have an account?
        <Link
          className="ml-2 text-accent font-semibold relative group"
          href="/register"
        >
          Sign up
          <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-accent scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
        </Link>
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <GitHubSignIn />
        <GoogleSignIn />
      </div>
    </section>
  );
}
