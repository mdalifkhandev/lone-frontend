"use client";

import { Client } from "@/components/interface/profile";
import CreditScore from "@/components/profileDasbord/CreditScore";
import { getCreditScore } from "@/components/utils/getCreditScore";
import React from "react";
import { BsEye } from "react-icons/bs";
import CustomModal from "./CustomModal";
import { CiImport } from "react-icons/ci";
import { getCreditLevel } from "@/components/utils/creditLavel";

const MyModal: React.FC<{ client: Client }> = ({ client }) => {
    const annualIncome = client?.profileId?.financialInfo?.annualIncome;
    const electricityBill = client?.profileId?.financialInfo?.electricityBill;
    const existingLoanAmount = client?.profileId?.financialInfo?.existingLoanAmount;
    const mobileMoneyBalance = client?.profileId?.financialInfo?.mobileMoneyBalance;
    const valueOfLandOwnership = client?.profileId?.financialInfo?.valueOfLandOwnership;

    const totalIncome =
        (annualIncome || 0) +
        (electricityBill || 0) +
        (mobileMoneyBalance || 0) +
        (valueOfLandOwnership || 0) -
        (existingLoanAmount || 0);

    const creditInfo = getCreditScore(totalIncome);

    const factorsAffectingScore = {
        annualIncome,
        electricityBill,
        mobileMoneyBalance,
    };

    const openModal = () => {
        const modal = document.getElementById(
            `modal_${client?._id}`
        ) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <div>
            {/* Eye button */}
            <button onClick={openModal}>
                <BsEye className="cursor-pointer text-2xl text-red-950" />
            </button>

            {/* Modal */}
            <dialog id={`modal_${client?._id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl bg-white">
                    {/* Header */}
                    <div className="mb-4 md:mb-6 flex flex-col md:flex-row justify-between items-start md:items-cente1 pb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                            Client Details
                        </h1>
                        <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">
                            <CiImport className="text-2xl" /> Export
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Left Side */}
                        <div>
                            <CustomModal client={client} />
                        </div>

                        {/* Right Side */}
                        <div className="w-full md:w-[35%] bg-gray-200 p-4">
                            <CreditScore
                                factorsAffectingScore={factorsAffectingScore}
                                creditInfo={creditInfo}
                            />
                            <div className="card w-full max-w-md shadow-lg rounded-xl bg-white">
                                <div className="card-body">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Risk Assessment
                                    </h2>

                                    {/* Debit-to-income Ratio */}
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">Debit-to-income Ratio</span>
                                        <span className="font-medium text-gray-900">25.5%</span>
                                    </div>

                                    {/* Monthly Income */}
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">Monthly Income</span>
                                        <span className="font-medium text-gray-900">
                                            {Math.floor(Number(annualIncome) / 12)}
                                        </span>
                                    </div>

                                    {/* Total Debit */}
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">Total Debit</span>
                                        <span className="font-medium text-gray-900">
                                            {Math.floor(Number(annualIncome) / 6)}
                                        </span>
                                    </div>

                                    {/* Over Risk */}
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">Over risk</span>
                                        <span className="text-green-500 font-semibold ">
                                            {getCreditLevel(
                                                100 - Math.floor(Number(creditInfo.creditScore))
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Backdrop (click outside to close) */}
                <form method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
        </div>
    );
};

export default MyModal;
