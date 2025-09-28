'use client';

import { FaEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { LoginData } from "@/components/interface";
import FormInput from "@/components/custom/FromInput";
import { useState } from "react";
import Link from "next/link";
import { FaLock } from "react-icons/fa"; 
import { useUserLogin } from "@/components/api/server/auth";
import { toast } from "react-toastify";
import { useAuthStore } from "@/components/store/authStore";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const { mutate, status, error } = useUserLogin();
  const router = useRouter()
  const { login } = useAuthStore()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    }
  });

  const handleSignIn = (data: LoginData) => {
    mutate(data, {
      onSuccess: (response) => {
        toast.success(response.data?.message || "Login successful-!");
        const data = response.data.data;
        login(data.accessToken, data.user);
        router.push('/')
        
      },
      onError: (error: Error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5">
      <div className="w-full md:w-[60%] lg:w-[40%] border border-gray-300 rounded-md bg-white shadow-xl p-4 md:p-8 lg:p-5">
        <h1 className="text-center text-red-950 font-semibold text-xl">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-3">

          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            IconComponent={FaEnvelope}
            register={register}
            errors={errors}
            rules={{ required: "Email is required" }}
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            IconComponent={FaLock}
            register={register}
            errors={errors}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            }}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")} 
                className="mr-2 h-4 w-4 text-red-950 focus:ring-red-950 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
            </div>
            <Link href="/forgot-password">
              <p className="text-sm text-red-950 hover:underline cursor-pointer">
                Forgot password?
              </p>
            </Link>
          </div>

          <button
            type="submit"
            disabled={status === 'pending'} 
            className={`w-full bg-red-950 text-white text-sm py-2 rounded-sm cursor-pointer ${status === 'pending' ? 'opacity-50' : ''}`}
          >
            {status === 'pending' ? 'Signing In...' : 'Sign In'}
          </button>

          {error && <p className="text-red-600 text-sm mt-4 text-center">{(error as Error & { response?: { data?: { message?: string } } }).response?.data?.message || "An error occurred"}</p>}

          <div className="flex items-center gap-2 text-sm justify-center">
            <p className="text-black">New To our Platform ? </p>
            <Link href="/signup" className="text-red-950 font-semibold">
              Sign Up Here
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Page;