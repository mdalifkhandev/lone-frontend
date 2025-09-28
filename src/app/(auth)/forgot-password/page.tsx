"use client";


import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CiLock } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import FormInput from "@/components/custom/FromInput";
import { useForgatePasswordSendMail, useForgatePasswordVerifyOtp, useForgateResetPassword } from "@/components/api/server/forgatepassword";
import { toast } from "react-toastify";
import { EmailData, ResetPasswordData } from "@/components/interface";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";


const ResetPassword = () => {
    const [sendOTP, setSendOTP] = useState(false);
    const [showResetPasswordSection, setShowResetPasswordSection] = useState(false);
    const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [email, setEmail] = useState('');
    const router = useRouter();

    const { mutate, status } = useForgatePasswordSendMail();
    const { mutate: verifyOtp, status: verifyStatus } = useForgatePasswordVerifyOtp();
    const { mutate: resetPassword } = useForgateResetPassword();

    const { register, handleSubmit, formState: { errors } } = useForm<EmailData>();
    const { register: registerOtp, handleSubmit: handleSubmitOtp,  getValues: getOtpValues, setValue: setOtpValue } = useForm();
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: { errors: errorsPassword }, getValues: getPasswordValues } = useForm<ResetPasswordData>();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSendOTP: SubmitHandler<EmailData> = (data) => {
        mutate(data, {
            onSuccess: (response) => {
                toast.success(response.data?.message || "OTP sent successfully!");
                setEmail(data.email);
                setSendOTP(true);
            },
            onError: (error: Error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
                }
            }
        });
    };

    const handleConfirmOTP = () => {
        const otpArray = [];
        for (let i = 0; i < 6; i++) {
            otpArray.push(getOtpValues(`otp${i}`));
        }
        const otpString = otpArray.join('');

        verifyOtp({ email, otp: otpString }, {
            onSuccess: (response) => {
                toast.success(response.data?.message || "OTP verified successfully!");
                setShowResetPasswordSection(true);
            },
            onError: (error: Error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to verify OTP. Please try again.");
                }
            }
        });
    };

    const handleResetPassword: SubmitHandler<ResetPasswordData> = (data) => {
        const newData: ResetPasswordData = {
            ...data,
            email,
        };
        resetPassword(newData, {
            onSuccess: (response) => {
                toast.success(response.data?.message || "Password reset successfully!");
                router.push('/login');
            },
            onError: (error: Error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
                }
            }
        });
    };

    const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        setOtpValue(`otp${index}`, value);

        if (value && index < 5 && otpInputsRef.current[index + 1]) {
            otpInputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && index > 0 && !getOtpValues(`otp${index}`) && otpInputsRef.current[index - 1]) {
            otpInputsRef.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if (sendOTP && !showResetPasswordSection) {
            otpInputsRef.current[0]?.focus();
        }
    }, [sendOTP, showResetPasswordSection]);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5">
            {/* Send OTP Form */}
            {!sendOTP && (
                <div className="w-full md:w-[60%] lg:w-[40%] border border-gray-300 rounded-md bg-white shadow-xl p-4 md:p-8 lg:p-5">
                    <h1 className="text-center text-red-950 font-semibold text-xl mb-4">
                        Forgot Password
                    </h1>
                    <form onSubmit={handleSubmit(handleSendOTP)} className="space-y-3">
                        <FormInput
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            IconComponent={MdOutlineMail}
                            register={register}
                            errors={errors}
                            rules={{ required: "Email is required" }}
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-950 text-white text-sm py-2 rounded-sm cursor-pointer"
                            disabled={status === 'pending'}
                        >
                            {status === 'pending' ? 'Sending...' : 'Send OTP'}
                        </button>
                    </form>
                </div>
            )}

            {/* Confirm OTP Form */}
            {(sendOTP && !showResetPasswordSection) && (
                <div className="w-full md:w-[60%] lg:w-[35%] border border-gray-300 rounded-md bg-white shadow-xl p-4 md:p-8 lg:p-5">
                    <h1 className="text-center text-red-950 font-semibold text-xl mb-4">
                        Forgot Password
                    </h1>
                    <form onSubmit={handleSubmitOtp(handleConfirmOTP)} className="space-y-3">
                        <div>
                            <label className="text-sm font-semibold text-red-900">
                                Enter OTP
                            </label>
                            <div className="flex justify-between items-center mt-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-red-950 focus:ring-1 focus:ring-red-950 text-lg font-semibold"
                                        {...registerOtp(`otp${index}`, { required: true })}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        ref={(el)=>{
                                            otpInputsRef.current[index] = el;
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-950 text-white text-sm py-2 rounded-sm cursor-pointer"
                            disabled={verifyStatus === 'pending'}
                        >
                            {verifyStatus === 'pending' ? 'Verifying...' : 'Continue'}
                        </button>
                    </form>
                </div>
            )}

            {/* Reset Password Form */}
            {showResetPasswordSection && (
                <div className='w-full md:w-[60%] lg:w-[40%] border border-gray-300 rounded-md bg-white shadow-xl p-4 md:p-8 lg:p-5'>
                    <h1 className='text-center text-red-950 font-semibold text-xl mb-4'>Forgot Password</h1>
                    <form onSubmit={handleSubmitPassword(handleResetPassword)} className="space-y-3">
                        <FormInput
                            label="New Password"
                            name="newPassword"
                            type="password"
                            placeholder="Create a password"
                            IconComponent={CiLock}
                            register={registerPassword}
                            errors={errorsPassword}
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
                        <FormInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            IconComponent={CiLock}
                            register={registerPassword}
                            errors={errorsPassword}
                            rules={{
                                required: "Please confirm your password",
                                validate: (value) => value === getPasswordValues("newPassword") || "Passwords do not match"
                            }}
                            showPassword={showConfirmPassword}
                            togglePasswordVisibility={toggleConfirmPasswordVisibility}
                        />
                        <button type="submit" className="w-full bg-red-950 text-white text-sm py-2 rounded-sm cursor-pointer">Confirm</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;