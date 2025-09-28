'use client';

import React, { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { useForm, SubmitHandler } from "react-hook-form";
import FormInput from "../custom/FromInput";
import { useGetUser } from "../api/server/user";
import { useGetSingleProfile, useUpdateAndCreateProfile } from "../api/server/profileApi";
import { toast } from "react-toastify";
import SecurityModal from "../lenderDashbord/setting/SecurityModal";
import { useAuthStore } from "../store/authStore";

export const metadata={
    title:'Profile Account'
}

interface IFormInput {
  firstName?: string,
  lastName?: string,
  address?: string,
  city?: string,
  state?: string,
  zipCode?: string
  email?: string
  phone?: string
}


const PersonalInformation = () => {
  const {user}=useAuthStore()
  const email=user?.email as string
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const { data: userData } = useGetUser(email)
  const userLoginData = userData?.data.data
  const { data } = useGetSingleProfile(userLoginData?._id)
  const { mutate,  } = useUpdateAndCreateProfile()
  const profileData=data?.data.data
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

  const handleUpdateProfile: SubmitHandler<IFormInput> = async (data) => {
    const contactInfo = {
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode
    }
    const personalInfo = {
      firstName: data.firstName,
      lastName: data.lastName
    }
    const newData = {
      contactInfo,
      personalInfo,
      userId: userLoginData._id
    }
    mutate(newData, {
      onSuccess: (response) => {
        toast.success(response.data.message)
        setUpdateProfile(false)
      },
      onError: (err) => {
        toast.error('Update Faild !')
      }
    })
  };

  return (
    <div>
      <div className='flex justify-between items-center py-2 bg-gray-200 px-5 rounded-sm'>
        <p className='font-semibold text-black text-md'>Personal Information</p>
        <div className="flex gap-3">
        <span
        className={`text-black ${userLoginData?.role==="user" ? "hidden" : "block"} text-sm font-semibold cursor-pointer flex items-center gap-1`}
        >
         <SecurityModal />
        </span>
        <button
          onClick={() => setUpdateProfile(true)}
          className={`${updateProfile ? "hidden" : "block"} text-sm text-black font-semibold cursor-pointer flex items-center gap-1`}
          >
          <MdOutlineEditNote size={25} />Update Profile
        </button>
          </div>
      </div>
      <form onSubmit={handleSubmit(handleUpdateProfile)} className='mt-5 md:space-y-3 space-y-1'>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='w-full md:w-1/2'>
            <FormInput
              label="First Name"
              name="firstName"
              type="text"
              defaultValue={profileData?.personalInfo?.firstName || ""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              IconComponent={() => <></>}
              required={true}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <FormInput
              label="Last Name"
              name="lastName"
              type="text"
              defaultValue={profileData?.personalInfo?.lastName||""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              IconComponent={() => <></>}
              required={true}
            />
          </div>
        </div>
        <div className='flex flex-col md:flex-row gap-3'>
          <div className='w-full md:w-1/2'>
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              defaultValue={userLoginData?.email || ""}
              disabled={true}
              errors={errors}
              register={register}
              IconComponent={() => <></>}
              readonly={true}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              defaultValue={userLoginData?.phone || ""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              IconComponent={() => <></>}
              readonly={true}
            />
          </div>
        </div>
        <div className='w-full'>
          <FormInput
            label="Street Address"
            name="address"
            type="text"
            defaultValue={profileData?.contactInfo?.address||""}
            disabled={!updateProfile}
            errors={errors}
            register={register}
            placeholder="12 street road"
            IconComponent={() => <></>}
            required={true}
          />
        </div>
        <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
          <div>
            <FormInput
              label="City"
              name="city"
              type="text"
              defaultValue={profileData?.contactInfo?.city||""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              placeholder="New York"
              IconComponent={() => <></>}
              required={true}
            />
          </div>
          <div>
            <FormInput
              label="State"
              name="state"
              type="text"
              defaultValue={profileData?.contactInfo?.state||""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              placeholder="NY"
              IconComponent={() => <></>}
              required={true}
            />
          </div>
          <div>
            <FormInput
              label="ZIP Code"
              name="zipCode"
              type="number"
              defaultValue={profileData?.contactInfo?.zipCode||""}
              disabled={!updateProfile}
              errors={errors}
              register={register}
              placeholder="5010"
              IconComponent={() => <></>}
              required={true}
            />
          </div>
        </div>
        <div className={`${updateProfile ? "block" : "hidden"}`}>
          <div className="flex justify-center items-center mt-5">
            <button className="cursor-pointer bg-red-950 px-3 rounded-sm py-2 text-gray-200 text-sm font-semibold">Update Now</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;