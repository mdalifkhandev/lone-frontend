"use client";

import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { contactInfo, financialInfo, personalInfo } from "../interface/profile";
import FormInput from "../custom/FromInput";
import { useUpdateAndCreateProfile } from "../api/server/profileApi";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface FinancialInfoProps {
    personalInfo: personalInfo | null;
    contactInfo: contactInfo | null;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    financial: financialInfo
    userId: string
}

const FinancialInfo: React.FC<FinancialInfoProps> = ({
    setStep,
    personalInfo,
    contactInfo,
    financial,
    userId
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
    } = useForm<financialInfo>({
        mode: "onChange",
        defaultValues: {
            existingLoan: "no",
        }
    });


    const existingLoan = watch("existingLoan");
    const { mutate } = useUpdateAndCreateProfile()
    const router = useRouter()


    useEffect(() => {
        if (existingLoan === "no") {
            setValue("existingLoanAmount", 0);
        }
    }, [existingLoan, setValue]);

    const handleApplicationSubmit: SubmitHandler<financialInfo> = (data) => {
        const financialInfo = {
            annualIncome: data.annualIncome,
            valueOfLandOwnership: data.valueOfLandOwnership,
            electricityBill: data.electricityBill,
            mobileMoneyBalance: data.mobileMoneyBalance,
            existingLoanAmount: data.existingLoanAmount,
            terms: data.terms,
            existingLoan: data.existingLoan,
        };

        const profileInfo = { personalInfo, contactInfo, financialInfo, userId };
        mutate(profileInfo, {
            onSuccess: (response) => {
                toast.success(response.data.message)
                router.push('/client')
            },
            onError: (error: Error) => {
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data?.message || "User Update Faild");
                }
            }
        })
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-red-950 mb-3">
                Financial Information
            </h2>
            <form
                onSubmit={handleSubmit(handleApplicationSubmit)}
                className="mt-5 md:space-y-3 space-y-1"
            >
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-1/2">
                        <FormInput
                            name="annualIncome"
                            type="number"
                            label="Annual Income (FCFA)"
                            defaultValue={financial?.annualIncome ? String(financial?.annualIncome) : ""}
                            errors={errors}
                            register={register}
                            IconComponent={() => <></>}
                            rules={{ required: "Annual income is required" }}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <FormInput
                            name="valueOfLandOwnership"
                            type="number"
                            label=" Value of land ownership (FCFA)"
                            defaultValue={financial?.valueOfLandOwnership ? String(financial?.valueOfLandOwnership) : ""}
                            errors={errors}
                            register={register}
                            IconComponent={() => <></>}
                            rules={{ required: "Value of land ownership is required" }}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-1/2">
                        <FormInput
                            name="electricityBill"
                            type="number"
                            label="Electricity bill (FCFA)"
                            defaultValue={financial?.electricityBill ? String(financial?.electricityBill) : ""}
                            errors={errors}
                            register={register}
                            IconComponent={() => <></>}
                            rules={{ required: "Electricity bill is required" }}
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <FormInput
                            name="mobileMoneyBalance"
                            type="number"
                            label="Mobile money balance (FCFA)"
                            defaultValue={financial?.mobileMoneyBalance ? String(financial?.mobileMoneyBalance) : ""}
                            errors={errors}
                            register={register}
                            IconComponent={() => <></>}
                            rules={{ required: "Mobile money balance is required" }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-7">
                    <label className="text-red-950 font-semibold">Existing Loan</label>
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <input
                                {...register("existingLoan", { required: "Please select an option" })}
                                type="radio"
                                name="existingLoan"
                                value="yes"
                                className="radio radio-sm accent-red-500 text-red-950"
                            />
                            <p className="text-sm text-red-950">Yes</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                {...register("existingLoan", { required: "Please select an option" })}
                                type="radio"
                                name="existingLoan"
                                value="no"
                                className="radio radio-sm accent-red-500 text-red-950"
                            />
                            <p className="text-sm text-red-950">No</p>
                        </div>
                    </div>
                </div>
                {errors.existingLoan && <span className="text-red-500 text-xs mt-1">{errors.existingLoan.message}</span>}


                {existingLoan === "yes" && (
                    <div className="w-full md:w-1/2 mt-2">
                        <FormInput
                            name="existingLoanAmount"
                            defaultValue={financial?.existingLoanAmount ? String(financial?.existingLoanAmount) : ""}
                            type="number"
                            label="Enter Amount"
                            errors={errors}
                            register={register}
                            IconComponent={() => <></>}
                            rules={{ required: existingLoan === "yes" ? "Loan amount is required" : false }}
                        />
                    </div>
                )}


                <div className="flex items-center mt-7">
                    <input
                        type="checkbox"
                        {...register("terms", { required: "You must agree to the terms" })}
                        className="mr-2 leading-tight accent-red-950"
                    />
                    <label className="text-sm font-medium text-gray-500">
                        I agree to share my data with GUEHI AND CO to process my credit score
                    </label>
                </div>
                {errors.terms && <span className="text-red-500 text-xs mt-1">{errors.terms.message}</span>}


                <div className="flex justify-between mt-5">
                    <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-4 py-2 rounded-md bg-gray-400 text-black disabled:opacity-50 flex items-center gap-2 cursor-pointer font-semibold transition hover:bg-gray-400"
                    >
                        Back
                    </button>
                    <button
                        disabled={!isValid}
                        type="submit"
                        className="px-4 py-2 rounded-md bg-red-950 text-white disabled:opacity-50 cursor-pointer font-semibold transition hover:bg-red-800"
                    >
                        Submit Application
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FinancialInfo;