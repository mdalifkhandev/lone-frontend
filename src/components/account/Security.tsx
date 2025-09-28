'use client';

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { useUpdatePassword } from "../api/server/auth";
import { UpdathPassword } from "../interface";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/authStore";


const getStringValue = (value: FormDataEntryValue | null): string => {
  return value ? (typeof value === 'string' ? value : value.name || '') : '';
};


const Security: React.FC = () => {
  const {user}=useAuthStore()
  const email=user?.email as string
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>(false);

  const { mutate, status, } = useUpdatePassword();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const form = new FormData(e.currentTarget);


    const currentPassword = getStringValue(form.get("currentPassword"));
    const newPassword = getStringValue(form.get("newPassword"));
    const confirmNewPassword = getStringValue(form.get("confirmNewPassword"));


    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return toast.error("All password fields are required.");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("New password and confirm new password do not match.");
    }

    const newUpdatedPassword: UpdathPassword = {
      email,
      confirmNewPassword,
      currentPassword,
      newPassword
    };

    mutate(newUpdatedPassword, {
      onSuccess: (response) => {
        toast.success(response?.data?.message);
        return
      },
      onError: (err: Error) => {
        if (err instanceof AxiosError) {
          const errorMessage = (err)?.response?.data?.message || "Failed to change password. Please try-again.";
          toast.error(errorMessage);
          return
        }
        return
      }
    });
  };

  const isSaving = status === 'pending';

  return (
    <div>
      <div className="flex justify-between items-center py-2 bg-gray-200 px-5 rounded-sm">
        <p className="font-semibold text-md text-black">Security</p>
      </div>
      <form onSubmit={handleChangePassword} className="mt-5 md:space-y-3 space-y-1 md:px-10">

        <div className="relative">
          <label htmlFor="currentPassword" className="text-sm font-semibold text-red-950">Current Password</label>
          <input
            id="currentPassword"
            type={showPassword ? "text" : "password"}
            name="currentPassword"
            className="w-full text-black appearance-none outline-none border border-gray-200 rounded-sm py-2 px-4 text-sm font-medium"
            placeholder="....................."
            required
            disabled={isSaving}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-black right-2 top-[37px] cursor-pointer p-1"
          >
            {showPassword ? <AiOutlineEye className="w-5 h-5" /> : <AiOutlineEyeInvisible className="w-5 h-5" />}
          </span>
        </div>

        <div className="relative">
          <label htmlFor="newPassword" className="text-sm font-semibold text-red-950">New Password</label>
          <input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            className="w-full text-black appearance-none outline-none border border-gray-200 rounded-sm py-2 px-4 text-sm font-medium"
            placeholder="....................."
            required
            disabled={isSaving}
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute text-black right-2 top-[37px] cursor-pointer p-1"
          >
            {showNewPassword ? <AiOutlineEye className="w-5 h-5" /> : <AiOutlineEyeInvisible className="w-5 h-5" />}
          </span>
        </div>

        <div className="relative">
          <label htmlFor="confirmNewPassword" className="text-sm font-semibold text-red-900">Confirm New Password</label>
          <input
            id="confirmNewPassword"
            type={showConfirmNewPassword ? "text" : "password"}
            name="confirmNewPassword"
            className="w-full text-black appearance-none outline-none border border-gray-200 rounded-sm py-2 px-4 text-sm font-medium"
            placeholder="....................."
            required
            disabled={isSaving}
          />
          <span
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            className="absolute text-black right-2 top-[37px] cursor-pointer p-1"
          >
            {showConfirmNewPassword ? <AiOutlineEye className="w-5 h-5" /> : <AiOutlineEyeInvisible className="w-5 h-5" />}
          </span>
        </div>

        <div className="flex justify-center items-center pt-4 md:pt-0">
          <button
            type="submit"
            className="cursor-pointer bg-red-950 px-3 rounded-sm py-2 text-gray-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;