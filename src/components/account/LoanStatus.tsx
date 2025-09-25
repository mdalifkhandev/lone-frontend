"use client";

import React from "react";
import { useAuthStore } from "../store/authStore";
import { useGetSingleLone } from "../api/server/applyLone";
import Image from "next/image";

import pending from "@/components/assets/pending.png";
import rejected from "@/components/assets/reject.png";

const LoanStatus: React.FC = () => {
  const { user } = useAuthStore();
  const { data: loanData } = useGetSingleLone(user?._id ?? "");

  // adjust according to your API response shape
  const status = loanData?.data?.data?.status;
  const notes = loanData?.data?.data?.notes;

  return (
    <div>
      {status === "approved" ? (
        <div className="px-3 py-5 shadow-md bg-white rounded-sm space-y-4 text-black">
          <div>
            <h3 className="text-red-950 font-semibold">Loan Amount</h3>
            <p className="mt-2">${1000}</p>
          </div>
          <div>
            <h3 className="text-red-950 font-semibold">Interest Rate</h3>
            <p className="mt-2">{1000}%</p>
          </div>
          <div>
            <h3 className="text-red-950 font-semibold">Terms (months)</h3>
            <p className="mt-2">12 Month</p>
          </div>
          <p className="text-red-950 font-semibold text-[16px]">
            **Note: {notes}
          </p>
        </div>
      ) : status === "rejected" ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-black">
            We&apos;re sorry, your loan was not approved at this time
          </h2>
          <Image className="h-[300px] w-auto" src={rejected} alt="Rejected" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-center text-black">
            Your loan has not yet been approved. Please wait for further updates
          </h2>
          <Image className="h-[300px] w-auto" src={pending} alt="Pending" />
        </div>
      )}
    </div>
  );
};

export default LoanStatus;
