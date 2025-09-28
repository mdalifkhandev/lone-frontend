'use client';

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import creditLimitData from "../data/creditLimitData";

export interface CreditLimitTier {
  id: number;
  tag: string;
  scoreRange: string;
  FCFA: number;
  description: string;
  facilities: string[];
  color: string;
}

const CreditLimit = () => {
  return (
    <div className="my-7 md:my-12 lg:pb-20 lg:my-20 mx-5 md:mx-14 lg:mx-24 bg-white">
      <div className="text-center space-y-1 md:space-y-2 lg:space-y-3">
        <h1 className="text-xl font-bold md:text-2xl lg:text-4xl text-red-950">
          Credit Limit Tiers
        </h1>
        <p className="text-sm text-black">
          Our system suggests credit limits based on your credit score range
        </p>
      </div>
      <div className="grid text-black grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-5 md:mt-8 lg:mt-10">
        {(creditLimitData as CreditLimitTier[]).map((tier) => (
          <div
            key={tier.id}
            className={`border border-gray-200 rounded-lg shadow p-5 space-y-3`}
            style={{ backgroundColor: tier.color }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-[16px] font-semibold">{tier.tag}</h2>
              <p className="text-[11px] bg-yellow-200 px-1 rounded-lg">{tier.scoreRange}</p>
            </div>
            <p className="text-lg text-red-950  font-semibold">{tier.FCFA} FCFA</p>
            <p className="text-sm text-gray-700">{tier.description}</p>
            <div className="w-full h-[1px] bg-gray-400"></div>
            <ul>
              {tier.facilities.map((facility, index) => (
                <li key={index} className="text-sm flex items-center gap-1">
                  <IoCheckmarkDoneCircleOutline className="text-blue-600" />
                  {facility}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditLimit;