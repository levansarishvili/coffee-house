"use client";

import TogglePasswordVisibility from "@/app/components/TogglePasswordVisibility";
import { RegisterFormData } from "@/app/types/interfaces";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CITIES } from "@/app/constants/constants";
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { registerUser } from "@/utils/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<RegisterFormData>({
    mode: "all",
    defaultValues: {
      city: "",
      street: "",
    },
  });

  // Register the field with validation
  register("city", {
    required: "Please select a city",
  });
  register("street", {
    required: "Please select a street",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const selectedCity = watch("city");

  // Get streets for selected city
  const getStreetsByCity = (cityName: string) => {
    const city = CITIES.find(
      (c) => c.city.toLowerCase() === cityName.toLowerCase()
    );
    return city ? city.streets : [];
  };

  const availableStreets = getStreetsByCity(selectedCity);

  // Clear street when city changes
  useEffect(() => {
    setValue("street", "");
  }, [selectedCity, setValue]);

  async function handleRegister(formData: RegisterFormData) {
    try {
      setIsLoading(true);
      const result = await registerUser(formData);
      toast.success(result.message);
      reset();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-col justify-between items-center gap-5 w-full">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col items-center justify-center gap-6 w-full"
      >
        {/* Upload Avatar */}
        <div className="flex flex-col gap-3">
          <div className="w-full flex gap-4">
            <label className="cursor-pointer flex gap-4 items-center">
              <div className="flex items-center justify-center border border-[#665f55] w-16 h-16 md:w-24 md:h-24 rounded-full cursor-pointer overflow-hidden">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("avatar", {
                    validate: {
                      isImage: (fileList: FileList | null) => {
                        if (!fileList || fileList.length === 0) return true;
                        const file = fileList[0];
                        return file?.type?.startsWith("image/")
                          ? true
                          : "Only image files are allowed";
                      },
                      fileSize: (fileList: FileList | null) => {
                        if (!fileList || fileList.length === 0) return true;
                        const file = fileList[0];
                        return file?.size <= 1 * 1024 * 1024
                          ? true
                          : "File size must be less than 1MB";
                      },
                    },
                  })}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    register("avatar").onChange(e);
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    } else {
                      setPreview(null);
                    }
                  }}
                />

                {/* Show uploaded user avatar */}
                {preview ? (
                  <Image
                    src={preview}
                    width={100}
                    height={100}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon className="w-5 h-5 md:w-7 md:h-7" />
                )}
              </div>

              <span className="text-sm text-lightBlue">
                {preview ? "Upload new" : "Upload Image"}
              </span>
            </label>

            {preview && (
              <button
                type="button"
                className="text-sm text-lightBlue cursor-pointer"
                onClick={() => {
                  setPreview(null);
                  setValue("avatar", null);
                }}
              >
                Remove image
              </button>
            )}
          </div>

          {/* Display validation errors */}
          {errors.avatar && (
            <p className="text-error text-xs">{errors.avatar.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full justify-center">
          <div className="flex flex-col gap-4 md:gap-6 max-w-[400px] w-full">
            {/* Email */}
            <div className="flex flex-col w-full relative">
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
                  } `}
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
                  placeholder="Placeholder"
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
                <span className="absolute right-0 bottom-5.5">
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

            {/* Confirm password */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  placeholder="Placeholder"
                  className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                    errors.confirm_password
                      ? "border-error focus:outline-error"
                      : touchedFields.confirm_password &&
                        watch("confirm_password") &&
                        !errors.confirm_password
                      ? "border-success focus:outline-success"
                      : "border-[#665f55] focus:outline-[#665f55]"
                  }`}
                  {...register("confirm_password", {
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />

                {/* Toggle button */}
                <span className="absolute right-0 bottom-6">
                  <TogglePasswordVisibility
                    show={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword((prev) => !prev)}
                  />
                </span>
              </div>

              {/* Error message */}
              {errors.confirm_password && (
                <p
                  className={`${
                    errors.confirm_password.message
                      ? "absolute -bottom-5.5"
                      : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.confirm_password.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6 max-w-[400px] w-full">
            {/* City */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label htmlFor="city">City</label>
                <Select
                  value={watch("city")}
                  onValueChange={(value) => {
                    setValue("city", value, { shouldValidate: true });
                    setIsCitySelected(true);
                  }}
                >
                  <SelectTrigger
                    className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                      errors.city
                        ? "border-error focus:outline-error"
                        : isCitySelected && watch("city") && !errors.city
                        ? "border-success focus:outline-success"
                        : "border-[#665f55] focus:outline-[#665f55]"
                    }`}
                  >
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#665f55] rounded-xl">
                    <SelectGroup>
                      <SelectLabel>Cities</SelectLabel>
                      <SelectItem
                        className="focus:bg-button-hover"
                        value="tbilisi"
                      >
                        Tbilisi
                      </SelectItem>
                      <SelectItem value="milan">Milan</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Error message */}
              {errors.city && (
                <p
                  className={`${
                    errors.city.message ? "absolute -bottom-4.5" : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.city.message?.toString()}
                </p>
              )}
            </div>
            {/* Street */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label htmlFor="street">Street</label>
                <Select
                  disabled={!watch("city")}
                  value={watch("street")}
                  onValueChange={(value) => {
                    setValue("street", value, { shouldValidate: true });
                    setIsStreetSelected(true);
                  }}
                >
                  <SelectTrigger
                    className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                      errors.street
                        ? "border-error focus:outline-error"
                        : isStreetSelected && watch("street") && !errors.street
                        ? "border-success focus:outline-success"
                        : "border-[#665f55] focus:outline-[#665f55]"
                    }`}
                  >
                    <SelectValue placeholder="Select a street" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#665f55] rounded-xl">
                    <SelectGroup>
                      <SelectLabel>Streets</SelectLabel>
                      {availableStreets.map((street) => (
                        <SelectItem key={street} value={street}>
                          {street}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Error message */}
              {errors.street && (
                <p
                  className={`${
                    errors.street.message ? "absolute -bottom-4.5" : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.street.message?.toString()}
                </p>
              )}
            </div>
            {/* House number */}
            <div className="flex flex-col w-full relative ">
              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="house_number">House number</label>
                <input
                  type="number"
                  id="house_number"
                  placeholder="Placeholder"
                  className={`w-full h-13 border border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    errors.house_number
                      ? "border-error focus:outline-error"
                      : touchedFields.house_number &&
                        watch("house_number") &&
                        !errors.house_number
                      ? "border-success focus:outline-success"
                      : "border-[#665f55] focus:outline-[#665f55]"
                  }`}
                  {...register("house_number", {
                    required: "House number is required.",
                    min: {
                      value: 1,
                      message: "House number must be greater than 0",
                    },
                    pattern: {
                      value: /^[1-9]\d*$/,
                      message: "Please enter a valid house number (e.g., 123)",
                    },
                  })}
                />
              </div>

              {/* Error message */}
              {errors.house_number?.message && (
                <p
                  className={`${
                    errors.house_number.message
                      ? "absolute -bottom-4.5"
                      : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.house_number.message.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="opacity-80">
          Have already an account?
          <Link
            className="ml-2 text-accent font-semibold relative group"
            href="/login"
          >
            Sign in
            <span className="absolute bottom-[-5px] rounded-2xl left-0 w-full h-0.5 bg-accent scale-x-0 transition-all duration-400 group-hover:scale-x-100"></span>
          </Link>
        </p>

        <button
          type="submit"
          className={`${
            isValid
              ? "hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all cursor-pointer"
              : "cursor-not-allowed"
          } flex gap-4 mt-2 justify-center items-center border font-semibold 
          border-[#665f55] w-auto h-11 py-2.5 px-[78px] rounded-[100px]`}
          disabled={isLoading || !isValid ? true : false}
        >
          {isLoading ? (
            <>
              <Spinner />
              Registering...
            </>
          ) : (
            <>Registration</>
          )}
        </button>
      </form>
    </section>
  );
}
