'use client';

import { TfiMoney } from "react-icons/tfi";
import { getPersentage } from "../utils/getPersentage";
import { useState } from "react";
import { profileInfo } from "../interface/profile";
import { useAuthStore } from "../store/authStore";
import { useApplyLone, useGetSingleLone } from "../api/server/applyLone";
import { toast } from "react-toastify";


const CreditLimits = ({ totalIncome, profile }: { totalIncome: number, profile: profileInfo }) => {
    const totalIncomePersentage = getPersentage(100000, 100, totalIncome)
    const { mutate, status } = useApplyLone()
    const { user } = useAuthStore()
    const { data: loanData } = useGetSingleLone(user?._id ?? "", user?.email ?? '');
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const city = profile?.contactInfo?.city?.toLowerCase()
    const profileId = profile?._id
    const userId = user?._id
    const creditScore = totalIncomePersentage.percentage
    const data = loanData?.data?.data
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loanAmount = e.currentTarget.loanAmount.value
        const applicationData = {
            userId,
            profileId,
            loanAmount,
            creditScore,
            city,
            term: isAgreed
        };
        if (creditScore < 60) {
            return toast.error('Your credit score is too low to apply for a loan.')
        }
        mutate(applicationData, {
            onSuccess: (response) => {
                toast.success(response.data.message)

            },
            onError: () => {
                toast.error('Faild and Error')
            }
        })
    }
    return (
        <div>
            <h3 className='bg-gray-200 p-4 font-bold rounded-t-sm text-black'>Suggest Credit Limit</h3>
            <div className='px-4 py-7'>
                <div className="flex items-center flex-col md:gap-5 gap-3">
                    <div className="bg-gray-100 p-3 rounded-full">
                        <TfiMoney className="text-red-950 bg-gray-100" size={25}></TfiMoney>
                    </div>
                    <h4 className="text-md font-semibold text-black">FCFA {totalIncome}</h4>
                    <p className="text-sm text-gray-700">Based on your credit score of {totalIncomePersentage?.percentage}/{totalIncomePersentage?.numberOfPersentag}</p>
                </div>
                <div className="bg-gray-100 rounded-sm p-3 space-y-3 mt-7">
                    <h2 className="text-md font-semibold">Credit Limit Ranges</h2>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">Excellent(80-100):</p>
                        <h4 className="text-[14px] font-semibold text-gray-700">FCFA 100,000</h4>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700 ">Good(60-79):</p>
                        <h4 className="text-[14px] font-semibold text-gray-700">FCFA 50,000</h4>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">Fair(40-59):</p>
                        <h4 className="text-[14px] font-semibold text-gray-700">FCFA 30,000</h4>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-700">Poor(0-39):</p>
                        <h4 className="text-[14px] font-semibold text-gray-700">FCFA 10,000</h4>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-5 max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
                    <div className="mt-5 flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="terms"
                            required
                            name="terms"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsAgreed(e.target.checked)}
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">I agree to share my data with partner financial institutions for my credit application</label>
                    </div>
                    <div className="space-y-2 mt-4 text-black">
                        <label htmlFor="loan-amount" className="block text-gray-600">Enter Loan Amount</label>
                        <input
                            type="number"
                            id="loan-amount"
                            name="loanAmount"
                            required
                            className="appearance-none outline-none border border-gray-400 rounded-sm py-2 px-3 w-full"
                            placeholder="Enter your amount"
                        />
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        {
                            data?.status === "pending" ? <button
                            disabled
                            type="submit"
                            className={`py-[6px] font-bold px-3 rounded-sm text-sm transition-all duration-300 'bg-gray-400 text-red-950 cursor-not-allowed' : 'bg-red-950  cursor-pointer'`}
                        >
                             Your Application is Pending
                        </button> : <button
                            disabled={!isAgreed}
                            type="submit"
                            className={`py-[6px] px-3 rounded-sm text-sm transition-all duration-300 ${!isAgreed ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-red-950 text-gray-300 cursor-pointer'}`}
                        >
                            {status === "pending" ? "Submitting..." : "Submit Application"}
                        </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreditLimits;