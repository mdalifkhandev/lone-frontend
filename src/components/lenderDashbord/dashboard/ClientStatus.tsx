"use client";

import { LuUsers } from "react-icons/lu";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

interface CreditRequestStatusProps {
  creditRequestStatus: {
    totalClients: number;
    approvedClients: number;
    pendingClients: number;
  };
}

const ClientStatus: React.FC<CreditRequestStatusProps> = ({
  creditRequestStatus,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Total Clients */}
      <div className="flex items-center gap-3 p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
        <div className="bg-red-300 p-3 rounded-full flex items-center justify-center">
          <LuUsers size={28} className="text-red-900" />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-600">Total Clients</h3>
          <p className="text-red-950 text-2xl font-bold">
            {creditRequestStatus?.totalClients}
          </p>
        </div>
      </div>

      {/* Approved Clients */}
      <div className="flex items-center gap-3 p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
        <div className="bg-green-300 p-3 rounded-full flex items-center justify-center">
          <IoCheckmarkDoneCircleOutline size={28} className="text-green-700" />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-600">Approved Clients</h3>
          <p className="text-green-700 text-2xl font-bold">
            {creditRequestStatus?.approvedClients}
          </p>
        </div>
      </div>

      {/* Pending Clients */}
      <div className="flex items-center gap-3 p-5 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
        <div className="bg-yellow-300 p-3 rounded-full flex items-center justify-center">
          <MdAccessTime size={28} className="text-yellow-800" />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-600">Pending Decisions</h3>
          <p className="text-yellow-900 text-2xl font-bold">
            {creditRequestStatus?.pendingClients}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStatus;
