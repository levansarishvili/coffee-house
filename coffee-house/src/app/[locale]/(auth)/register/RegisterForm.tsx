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
import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { registerUser } from "@/utils/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { getStreetsByCity } from "@/utils/getStreetsByCity";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("RegistrationPage");

  // Register the field with validation
  register("city", {
    required: `${t("ErrorMessages.city.required")}`,
  });
  register("street", {
    required: `${t("ErrorMessages.street.required")}`,
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
      router.push("/login");
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
              <div className="flex items-center justify-center border border-[#c1b6ad] dark:border-[#665f55] w-16 h-16 md:w-24 md:h-24 rounded-full cursor-pointer overflow-hidden">
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
                          : `${t("ErrorMessages.avatar.fileType")}`;
                      },
                      fileSize: (fileList: FileList | null) => {
                        if (!fileList || fileList.length === 0) return true;
                        const file = fileList[0];
                        return file?.size <= 1 * 1024 * 1024
                          ? true
                          : `${t("ErrorMessages.avatar.fileSize")}`;
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

              <span className="text-sm">
                {preview
                  ? `${t("avatarButtons.uploadNew")}`
                  : `${t("avatarButtons.uploadImage")}`}
              </span>
            </label>

            {preview && (
              <button
                type="button"
                className="text-sm cursor-pointer"
                onClick={() => {
                  setPreview(null);
                  setValue("avatar", null);
                }}
              >
                {t("avatarButtons.removeImage")}
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
            {/* Fullname */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="full_name">{t("InputLabels.fullName")}</label>
                <input
                  type="text"
                  id="full_name"
                  placeholder={t("InputPlaceholders.fullName")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm ${
                      errors.full_name
                        ? "border-error focus:outline-error"
                        : touchedFields.full_name &&
                          watch("full_name") &&
                          !errors.full_name
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    } `}
                  {...register("full_name", {
                    required: `${t("ErrorMessages.fullName.required")}`,
                    minLength: {
                      value: 3,
                      message: `${t("ErrorMessages.fullName.minLength")}`,
                    },
                    maxLength: {
                      value: 50,
                      message: `${t("ErrorMessages.fullName.maxLength")}`,
                    },
                    pattern: {
                      value: /^[A-Za-z\s.'-]+$/,
                      message: `${t("ErrorMessages.fullName.pattern")}`,
                    },
                  })}
                />
              </div>

              {/* Error message */}
              {errors.full_name?.message && (
                <p
                  className={`${
                    errors.full_name.message ? "absolute -bottom-4.5" : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.full_name.message.toString()}
                </p>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="username">{t("InputLabels.username")}</label>
                <input
                  type="text"
                  id="username"
                  placeholder={t("InputPlaceholders.username")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm ${
                      errors.username
                        ? "border-error focus:outline-error"
                        : touchedFields.username &&
                          watch("username") &&
                          !errors.username
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    } `}
                  {...register("username", {
                    required: `${t("ErrorMessages.username.required")}`,
                    minLength: {
                      value: 3,
                      message: `${t("ErrorMessages.username.minLength")}`,
                    },
                    maxLength: {
                      value: 30,
                      message: `${t("ErrorMessages.username.maxLength")}`,
                    },
                  })}
                />
              </div>

              {/* Error message */}
              {errors.username?.message && (
                <p
                  className={`${
                    errors.username.message ? "absolute -bottom-4.5" : "hidden"
                  } font-normal text-error text-xs mt-1`}
                >
                  {errors.username.message.toString()}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5">
                <label htmlFor="email">{t("InputLabels.email")}</label>
                <input
                  type="text"
                  id="email"
                  placeholder={t("InputPlaceholders.email")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm ${
                      errors.email
                        ? "border-error focus:outline-error"
                        : touchedFields.email && watch("email") && !errors.email
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    } `}
                  {...register("email", {
                    required: `${t("ErrorMessages.email.required")}`,
                    minLength: {
                      value: 3,
                      message: `${t("ErrorMessages.email.minLength")}`,
                    },
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: `${t("ErrorMessages.email.pattern")}`,
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
                <label htmlFor="password">{t("InputLabels.password")}</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder={t("InputPlaceholders.password")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm ${
                      errors.password
                        ? "border-error focus:outline-error"
                        : touchedFields.password &&
                          watch("password") &&
                          !errors.password
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                  {...register("password", {
                    required: `${t("ErrorMessages.password.required")}`,
                    minLength: {
                      value: 6,
                      message: `${t("ErrorMessages.password.minLength")}`,
                    },
                    pattern: {
                      value: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
                      message: `${t("ErrorMessages.password.pattern")}`,
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
          </div>

          <div className="flex flex-col gap-4 md:gap-6 max-w-[400px] w-full">
            {/* Confirm password */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label htmlFor="confirm_password">
                  {t("InputLabels.confirmPassword")}
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  placeholder={t("InputPlaceholders.confirmPassword")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm ${
                      errors.confirm_password
                        ? "border-error focus:outline-error"
                        : touchedFields.confirm_password &&
                          watch("confirm_password") &&
                          !errors.confirm_password
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                  {...register("confirm_password", {
                    required: `${t("ErrorMessages.confirmPassword.required")}`,
                    validate: (value) =>
                      value === watch("password") ||
                      `${t(
                        "ErrorMessages.confirmPassword.compareWithPassword"
                      )}`,
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
            {/* City */}
            <div className="flex flex-col w-full relative">
              <div className="w-full flex flex-col gap-1.5 relative">
                <label htmlFor="city">{t("InputLabels.city")}</label>
                <Select
                  value={watch("city")}
                  onValueChange={(value) => {
                    setValue("city", value, { shouldValidate: true });
                    setIsCitySelected(true);
                  }}
                >
                  <SelectTrigger
                    className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                      errors.city
                        ? "border-error focus:outline-error"
                        : isCitySelected && watch("city") && !errors.city
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                  >
                    <SelectValue placeholder={t("InputPlaceholders.city")} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#c1b6ad] dark:border-[#665f55] rounded-xl">
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
                <label htmlFor="street">{t("InputLabels.street")}</label>
                <Select
                  disabled={!watch("city")}
                  value={watch("street")}
                  onValueChange={(value) => {
                    setValue("street", value, { shouldValidate: true });
                    setIsStreetSelected(true);
                  }}
                >
                  <SelectTrigger
                    className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
                      errors.street
                        ? "border-error focus:outline-error"
                        : isStreetSelected && watch("street") && !errors.street
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                  >
                    <SelectValue placeholder={t("InputPlaceholders.street")} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-[#c1b6ad] dark:border-[#665f55] rounded-xl">
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
                <label htmlFor="house_number">
                  {t("InputLabels.houseNumber")}
                </label>
                <input
                  type="number"
                  id="house_number"
                  placeholder={t("InputPlaceholders.houseNumber")}
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal placeholder:text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      errors.house_number
                        ? "border-error focus:outline-error"
                        : touchedFields.house_number &&
                          watch("house_number") &&
                          !errors.house_number
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                  {...register("house_number", {
                    required: `${t("ErrorMessages.houseNumber.required")}`,
                    min: {
                      value: 1,
                      message: `${t("ErrorMessages.houseNumber.min")}`,
                    },
                    pattern: {
                      value: /^[1-9]\d*$/,
                      message: `${t("ErrorMessages.houseNumber.pattern")}`,
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
          {t("question")}
          <Link
            className="ml-2 text-accent font-semibold relative group"
            href="/login"
          >
            {t("signInLink")}
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
              {t("Buttons.registerLoading")}...
            </>
          ) : (
            <>{t("Buttons.register")}</>
          )}
        </button>
      </form>
    </section>
  );
}
