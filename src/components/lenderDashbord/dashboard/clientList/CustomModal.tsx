"use client";

import { useApproveLone } from '@/components/api/server/applyLone';
import { Client } from '@/components/interface/profile';
import { useAuthStore } from '@/components/store/authStore';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface ClientDetailsProps {
    client?: Client | null;
}

const CustomModal: React.FC<ClientDetailsProps> = ({ client }) => {
    const queryClient = useQueryClient();
    const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);
    const [loanAmount, setLoanAmount] = useState<number | ''>('');
    const [interestRate, setInterestRate] = useState<number | ''>('');
    const [term, setTerm] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [rejectReason, setRejectReason] = useState<string>('');

    const { mutate: approveLoan } = useApproveLone();

    const { user } = useAuthStore();
    const name = `${client?.profileId?.personalInfo?.firstName} ${client?.profileId?.personalInfo?.lastName}`;



    const handleSubmit = () => {
        if (decision === 'approved') {
            if (!loanAmount || !interestRate || !term) {
                alert('Please fill in all fields for approval.');
                return;
            }
            const data = {
                id: client?._id,
                status: decision,
                ApproveLoanAmount: loanAmount,
                interested: interestRate,
                termMonth: term,
                note: notes
            }
            approveLoan(data, {
                onSuccess: (response) => {
                    toast.success(response.data.message)
                    queryClient.invalidateQueries({ queryKey: ['getApplyLone'] });
                    setDecision(null);
                    setLoanAmount('');
                    setInterestRate('');
                    setTerm('');
                    setNotes('');
                    setRejectReason('');
                },
                onError: (error: Error) => {
                    if (error instanceof AxiosError)
                        toast.error(error?.response?.data?.message || 'An error occurred')
                }
            })
        } else if (decision === 'rejected') {
            const data = {
                id: client?._id,
                status: decision,
                note: rejectReason,
            }
            approveLoan(data, {
                onSuccess: (response) => {
                    toast.success(response.data.message)
                    queryClient.invalidateQueries({ queryKey: ['getApplyLone'] });
                    setDecision(null);
                    setLoanAmount('');
                    setInterestRate('');
                    setTerm('');
                    setNotes('');
                    setRejectReason('');
                },
                onError: (error: Error) => {
                    if (error instanceof AxiosError)
                        toast.error(error?.response?.data?.message || 'An error occurred')
                }
            })
        } else {
            console.log("⚠️ No decision selected yet.");
        }
    };

    return (
        <div className="p-4 md:p-6 w-full min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-4 md:p-6 w-full h-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
                    <div className="md:col-span-3 space-y-4 md:space-y-8 w-full h-full">

                        {/* Credit Passport */}
                        <div className="bg-gray-50 p-4 rounded-md shadow-sm my-15 w-full">
                            <h2 className="text-lg font-semibold mb-4">Credit Passport</h2>
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full">
                                <div className="flex-1">
                                    <p className="font-bold text-gray-700">{name}</p>
                                    <p className="text-sm text-gray-600">Email: {user?.email}</p>
                                    <p className="text-sm text-gray-600">Phone: {user?.phone}</p>
                                </div>
                                <div className="flex flex-col gap-2 text-sm text-gray-600">
                                    <p>Date of Birth: {client?.profileId?.personalInfo?.dateOfBirth && new Date(client?.profileId?.personalInfo?.dateOfBirth).toLocaleDateString()}</p>
                                    <p>Location: {client?.profileId?.contactInfo?.address}</p>
                                    <p>Gender: {client?.profileId?.personalInfo?.gender}</p>
                                </div>
                            </div>
                        </div>

                        {/* Financial Info */}
                        <div className="my-15 bg-gray-50 p-4 rounded-md shadow-sm w-full">
                            <h2 className="text-lg font-semibold mb-4">Financial Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 w-full">
                                <p>Annual Income  (FCFA): {client?.profileId?.financialInfo?.annualIncome}</p>
                                <p>Existing Loans: {client?.profileId?.financialInfo?.existingLoan && Number(client?.profileId?.financialInfo?.existingLoan) > 0 ? 'YES' : 'NO'}</p>
                                <p>Land ownership (FCFA): {client?.profileId?.financialInfo?.valueOfLandOwnership}</p>
                                <p>Credit Card Debt: {client?.profileId?.financialInfo?.existingLoanAmount}</p>
                                <p>Mobile money Balance (FCFA): {client?.profileId?.financialInfo?.mobileMoneyBalance}</p>
                            </div>
                        </div>

                        {/* Decision Section */}
                        <div className="my-15 bg-gray-50 p-4 rounded-md shadow-sm w-full">
                            <h2 className="text-lg font-semibold mb-4">Decision</h2>
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
                                <button
                                    className={`px-4 py-2 rounded-md text-green-600 ${decision === 'approved' ? 'bg-[#039B06] text-white' : 'bg-[#039B061A] hover:bg-[#039B06]'}`}
                                    onClick={() => setDecision('approved')}
                                >
                                    ✓ Approve
                                </button>
                                <button
                                    className={`px-4 py-2 rounded-md text-red-600 ${decision === 'rejected' ? 'bg-[#D00202] text-white' : 'bg-[#D002021A] hover:bg-red-600]'}`}
                                    onClick={() => setDecision('rejected')}
                                >
                                    ✕ Reject
                                </button>
                            </div>

                            {/* Approve Section */}
                            {decision === 'approved' && (
                                <div className="p-4 md:p-6 bg-[#039B061A] border border-gray-300 rounded-lg shadow-sm w-full mx-auto font-sans grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <input
                                        type="number"
                                        placeholder="Loan Amount ($)"
                                        className="mt-1 block w-full p-2 border bg-gray-100 border-gray-300 rounded-md"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Interest Rate (%)"
                                        className="mt-1 block w-full p-2 border bg-gray-100 border-gray-300 rounded-md"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                    />
                                    <select
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white md:col-span-2"
                                        value={term}
                                        onChange={(e) => setTerm(e.target.value)}
                                    >
                                        <option value="">Select a term</option>
                                        <option value="1">1</option>
                                        <option value="3">3</option>
                                        <option value="6">6</option>
                                        <option value="8">8</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            )}

                            {/* Reject Section */}
                            {decision === 'rejected' && (
                                <div className="p-4 bg-red-100 border border-red-300 rounded-lg shadow-sm w-full">
                                    <textarea
                                        className="w-full p-2 border rounded-md"
                                        rows={3}
                                        placeholder="Enter reason for rejection..."
                                        value={rejectReason}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            {/* Notes */}
                            {decision !== 'rejected' && (
                                <div className="mt-4 w-full">
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        rows={3}
                                        placeholder="Optional notes..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                </div>
                            )}

                            {/* Submit button */}
                            <div className="mt-4 w-full">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded-md text-white bg-[#4B1E2F] w-full"
                                    onClick={handleSubmit}
                                >
                                    Submit Decision
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomModal;
