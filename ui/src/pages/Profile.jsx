
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Image,
  Save,
  RotateCcw,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";

import { fetchUserById,updateUserProfile } from "../features/auth/userSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const {
    userId,
    loading,
    error,
  } = useSelector((state) => state.user);

  /*
   * Fetch complete user information when
   * the profile page is opened.
   */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  /*
   * Fetch user by ID from Redux.
   */
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [userId, dispatch]);

  /*
   * Get the fetched user directly from
   * the fetchUserById thunk result.
   *
   * We don't need another Redux state for it.
   */
  const handleUserFetch = async () => {
    if (!userId) return;

    try {
      const result = await dispatch(
        fetchUserById(userId)
      ).unwrap();

      reset({
        name: result.name || "",
        imageUrl: result.imageUrl || "",
      });
    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : "Failed to load profile."
      );
    }
  };

  /*
   * Load profile data.
   */
  useEffect(() => {
    handleUserFetch();
  }, [userId]);

  const currentName = watch("name");
  const currentImageUrl = watch("imageUrl");

  const initial =
    currentName?.trim()?.charAt(0)?.toUpperCase() || "U";

  /*
   * Update profile
   */
  const onSubmit = async (data) => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    try {
      /*
       * First get the complete user information.
       *
       * This is necessary because your current
       * AppUserRequestDto requires:
       *
       * providerId
       * provider
       * email
       * name
       * imageUrl
       */
      const user = await dispatch(
        fetchUserById(userId)
      ).unwrap();

      /*
       * Send the complete AppUserRequestDto.
       *
       * OAuth information comes from the backend,
       * while name/imageUrl come from the form.
       */
      const profileData = {
        providerId: user.providerId,
        provider: user.provider,
        email: user.email,

        name: data.name.trim(),
        imageUrl: data.imageUrl.trim(),
      };

      await dispatch(
        updateUserProfile({
          id: userId,
          profileData,
        })
      ).unwrap();

      toast.success("Profile updated successfully.");

      /*
       * Reset dirty state after successful update.
       */
      reset(data);

    } catch (err) {
      toast.error(
        typeof err === "string"
          ? err
          : "Failed to update profile."
      );
    }
  };

  /*
   * Reset form.
   */
  const handleReset = () => {
    handleUserFetch();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Profile Header */}
          <div className="border-b border-gray-200 px-6 py-8 dark:border-gray-800">
            <div className="flex flex-col items-center gap-5 sm:flex-row">

              {/* Avatar */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md dark:border-gray-900 dark:bg-gray-800">

                {currentImageUrl ? (
                  <img
                    src={currentImageUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-4xl font-semibold text-gray-500 dark:text-gray-400">
                    {initial}
                  </span>
                )}

              </div>

              <div className="text-center sm:text-left">

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {currentName || "User"}
                </h2>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-950/30 dark:text-green-400">
                  <ShieldCheck size={14} />
                  Account Active
                </div>

              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-7 p-6 sm:p-8"
          >

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Update the information associated with your account.
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Name
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required.",
                    minLength: {
                      value: 2,
                      message:
                        "Name must contain at least 2 characters.",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "Name cannot exceed 100 characters.",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-gray-800 dark:text-white ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700"
                  }`}
                />

              </div>

              {errors.name && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value="Loading..."
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3 pl-11 pr-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-500"
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Email is managed by your authentication provider.
              </p>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                Profile Image URL
              </label>

              <div className="relative">

                <Image
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  {...register("imageUrl", {
                    pattern: {
                      value:
                        /^(https?:\/\/)(.*)$/i,
                      message:
                        "Please enter a valid image URL.",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 dark:bg-gray-800 dark:text-white ${
                    errors.imageUrl
                      ? "border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-700"
                  }`}
                />

              </div>

              {errors.imageUrl && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.imageUrl.message}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Enter a publicly accessible image URL.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                {typeof error === "string"
                  ? error
                  : "Failed to load profile."}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end dark:border-gray-800">

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <RotateCcw size={17} />
                Reset
              </button>

              <button
                type="submit"
                disabled={loading || !isDirty}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={17} />

                {loading ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

