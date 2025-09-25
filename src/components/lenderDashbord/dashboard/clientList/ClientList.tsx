"use client";

import { Client } from "@/components/interface/profile";
import React, { useEffect, useState, useCallback } from "react";
import { CiFilter } from "react-icons/ci";
import MyModal from "./ModalClient";
import { getCreditLevel } from "@/components/utils/creditLavel";

interface ClientListProps {
  loanApplicationsData: Client[];
}

type TabType = "all" | "pending" | "approved" | "rejected";

const tabs: TabType[] = ["all", "pending", "approved", "rejected"];

const ClientList: React.FC<ClientListProps> = ({ loanApplicationsData }) => {
  const allClients = loanApplicationsData;

  const [showFilter, setShowFilter] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [data, setData] = useState<Client[]>(loanApplicationsData);
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    city: "",
    minScore: "",
    maxScore: "",
    amount: "",
    status: "",
  });

  const toggleFilter = () => setShowFilter(!showFilter);

  const getDataByTab = useCallback(
    (tab: TabType) => {
      let filteredData = allClients;

      switch (tab) {
        case "pending":
          filteredData = filteredData.filter((c) => c.status === "pending");
          break;
        case "approved":
          filteredData = filteredData.filter((c) => c.status === "approved");
          break;
        case "rejected":
          filteredData = filteredData.filter((c) => c.status === "rejected");
          break;
      }

      if (filters.city)
        filteredData = filteredData.filter((c) =>
          c.city.toLowerCase().includes(filters.city.toLowerCase())
        );
      if (filters.minScore)
        filteredData = filteredData.filter(
          (c) => parseFloat(c.creditScore) >= parseFloat(filters.minScore)
        );
      if (filters.maxScore)
        filteredData = filteredData.filter(
          (c) => parseFloat(c.creditScore) <= parseFloat(filters.maxScore)
        );
      if (filters.amount)
        filteredData = filteredData.filter(
          (c) => parseFloat(c.loanAmount) <= parseFloat(filters.amount)
        );
      if (filters.status)
        filteredData = filteredData.filter((c) => c.status === filters.status);

      return filteredData;
    },
    [filters, allClients]
  );

  const fetchData = useCallback(
    (tab: TabType) => {
      setLoading(true);
      setTimeout(() => {
        setData(getDataByTab(tab));
        setLoading(false);
      }, 300);
    },
    [getDataByTab]
  );

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, fetchData]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
    setFilters({ city: "", minScore: "", maxScore: "", amount: "", status: "" });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, status: e.target.value });
  };

  return (
    <div className="bg-white p-4">
      {/* Header + Filter Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold">Client List</h1>
        <button
          className="btn btn-outline hover:bg-red-950 rounded flex items-center gap-2"
          onClick={toggleFilter}
        >
          <CiFilter className="text-2xl" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-3 py-1 rounded ${
              activeTab === tab
                ? "text-red-950 font-bold border-b-2 border-red-950"
                : "text-gray-600 hover:text-red-950"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Clients
          </button>
        ))}
      </div>

      <div className="border-t-2 mb-3"></div>

      {/* Filter Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showFilter ? "max-h-[400px] mt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3 p-4 shadow rounded bg-gray-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="City"
                className="input text-black bg-white border-gray-400"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Min Score</label>
              <input
                type="number"
                placeholder="Min Score"
                className="input text-black bg-white border-gray-400"
                value={filters.minScore}
                onChange={(e) => setFilters({ ...filters, minScore: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Max Score</label>
              <input
                type="number"
                placeholder="Max Score"
                className="input text-black bg-white border-gray-400"
                value={filters.maxScore}
                onChange={(e) => setFilters({ ...filters, maxScore: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Amount Range</label>
              <input
                type="number"
                placeholder="Amount Range"
                className="input text-black bg-white border-gray-400"
                value={filters.amount}
                onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="input text-black bg-white border-gray-400"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Select Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4 rounded">
        {loading ? (
          <p className="p-4 text-center">Loading...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 h-16">
              <tr>
                {["ID", "City", "Credit Score", "Amount Request", "Status", "Actions"].map(
                  (head, idx) => (
                    <th key={idx} className="px-4 py-2 text-center">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((client, index) => (
                  <tr key={index} className="h-16">
                    <td className="px-4 py-2 text-center">{index + 1}</td>
                    <td className="px-4 py-2 text-center">{client.city}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`font-semibold ${
                          Number(client.creditScore) >= 80
                            ? "text-green-600"
                            : Number(client.creditScore) >= 60
                            ? "text-yellow-500"
                            : Number(client.creditScore) >= 40
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {client.creditScore}/100
                      </span>
                      <div className="text-xs font-semibold">
                        {getCreditLevel(Number(client.creditScore))}
                      </div>
                    </td>
                    <td className="px-4 py-2 text-center">{client.loanAmount}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`py-1 px-3 rounded-2xl font-bold text-center 
                        ${client.status === "approved" ? "text-green-500 bg-gray-200" : ""}
                        ${client.status === "pending" ? "text-yellow-600 bg-gray-200" : ""}
                        ${client.status === "rejected" ? "text-red-500 bg-gray-200" : ""}`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <MyModal client={client} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientList;
