"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import {
  CameraIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/app/context/useAuth";
import { UpdateProfileData } from "@/app/types/interfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStreetsByCity } from "@/utils/getStreetsByCity";
import { toast } from "sonner";
import { updateProfile } from "@/utils/updateProfile";
import LogoutButton from "./LogoutButton";
import { useTranslations } from "next-intl";

export default function ProfileForm() {
  const {
    user,
    userProfile,
    loading: authLoading,
    refreshUserProfile,
  } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<UpdateProfileData>({
    mode: "onChange",
    defaultValues: {
      city: userProfile?.city,
      street: userProfile?.street,
    },
  });
  const t = useTranslations("ProfilePage");

  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [isStreetSelected, setIsStreetSelected] = useState(false);

  const selectedCity = watch("city");

  // Initialize form with user data
  useEffect(() => {
    if (userProfile && !authLoading) {
      reset({
        full_name: userProfile.full_name || "",
        username: userProfile.username || "",
        email: userProfile.email || user?.email || "",
        city: userProfile.city || "",
        street: userProfile.street || "",
        house_number: userProfile.house_number || "",
      });

      if (userProfile.avatar_url) {
        setPreview(userProfile.avatar_url);
      }
    }
  }, [userProfile, user, authLoading, reset]);

  // Watch the avatar field to track changes
  const avatarState = watch("avatar");
  const hasAvatarChanged = avatarState === null || avatarState?.length > 0;

  // Get streets for selected city
  const availableStreets = getStreetsByCity(selectedCity);

  // Handle form submission
  const handleUpdateProfile = async (formData: UpdateProfileData) => {
    try {
      setIsLoading(true);
      const result = await updateProfile(formData, hasAvatarChanged);
      toast.success(result.message);
      refreshUserProfile();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleUpdateProfile)}
      className="flex flex-col -mt-10 md:-mt-12 items-center justify-center gap-6 w-full"
    >
      {/* Upload Avatar */}
      <div className="flex flex-col gap-4 items-center relative">
        <div className="relative group">
          <label className="cursor-pointer">
            <div
              className="flex items-center justify-center border-2 border-[#665f55] dark:border-[#c1b6ad] w-20 h-20 md:w-24 md:h-24 
             rounded-full cursor-pointer overflow-hidden bg-background hover:bg-[#665f55] hover:text-[#e1d4c9] transition-all 
            duration-300"
            >
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

              {preview ? (
                <>
                  <Image
                    src={preview}
                    width={128}
                    height={128}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Edit overlay */}
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full 
                  flex items-center justify-center"
                  >
                    <PencilSquareIcon className="w-6 h-6 group-hover:text-[#e1d4c9]" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <CameraIcon className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-xs">Upload</span>
                </div>
              )}
            </div>
          </label>

          {/* Remove button - only show when image is selected */}
          {preview && (
            <button
              type="button"
              className="absolute -right-1 top-0 flex justify-center items-center w-6 h-6 rounded-full border border-[#665f55] 
            bg-[#665f55] text-[#e1d4c9] transition-all duration-300 cursor-pointer"
              onClick={() => {
                setPreview(null);
                setValue("avatar", null);
              }}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Display validation errors */}
        {errors.avatar && (
          <p className="text-error text-xs text-center mt-2">
            {errors.avatar.message}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-16 w-full justify-center">
        <div className="flex flex-col gap-4 md:gap-6 w-full">
          {/* Fullname */}
          <div className="flex flex-col w-full relative">
            <div className="w-full flex flex-col gap-1.5">
              <label htmlFor="full_name">{t("InputLabels.fullName")}</label>
              <input
                type="text"
                id="full_name"
                placeholder="Placeholder"
                className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
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
                placeholder="Placeholder"
                className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
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
                disabled
                type="text"
                id="email"
                placeholder="Placeholder"
                className={`opacity-80 w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal ${
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
        </div>

        <div className="flex flex-col gap-4 md:gap-6 w-full">
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
                  className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 shadow-none 
                    rounded-xl focus:outline-none placeholder:font-normal ${
                      errors.city
                        ? "border-error focus:outline-error"
                        : isCitySelected && watch("city") && !errors.city
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                >
                  <SelectValue placeholder="Select a city" />
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
                  className={`w-full h-13 border border-[#c1b6ad] shadow-none dark:border-[#665f55] px-3 rounded-xl focus:outline-none 
                    placeholder:font-normal ${
                      errors.street
                        ? "border-error focus:outline-error"
                        : isStreetSelected && watch("street") && !errors.street
                        ? "border-success"
                        : "border-[#c1b6ad] dark:border-[#665f55]"
                    }`}
                >
                  <SelectValue placeholder="Select a street" />
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
                placeholder="Placeholder"
                className={`w-full h-13 border border-[#c1b6ad] dark:border-[#665f55] px-3 rounded-xl focus:outline-none placeholder:font-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
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

      <div className="w-fill flex flex-col md:flex-row justify-center items-center gap-8 mt-4">
        {/* Submit Button */}
        <button
          type="submit"
          className={`${
            isValid
              ? "hover:bg-[#665f55] hover:text-[#e1d4c9] duration-300 transition-all cursor-pointer"
              : "cursor-not-allowed"
          } flex gap-4 justify-center items-center border font-semibold 
          border-[#665f55] w-[200px] h-11 rounded-[100px]`}
          disabled={isLoading || !isValid ? true : false}
        >
          {isLoading ? (
            <>
              <Spinner />
              {t("Buttons.saveChangesLoading")}...
            </>
          ) : (
            <>{t("Buttons.saveChanges")}</>
          )}
        </button>

        {/* Logout button */}
        <LogoutButton />
      </div>
    </form>
  );
}
