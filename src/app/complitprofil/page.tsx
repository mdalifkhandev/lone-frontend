'use client';

import React, { useState } from 'react';
import PersonalInfo from '@/components/completeProfile/PersonalInfo';
import ContactInfo from '@/components/completeProfile/ContactInfo';
import FinancialInfo from '@/components/completeProfile/FinancialInfo';
import { contactInfo, personalInfo,  } from '@/components/interface/profile';
import { useAuthStore } from '@/components/store/authStore';
import { useGetSingleProfile } from '@/components/api/server/profileApi';

    
const CompleteProfile = () => {
    const [step, setStep] = useState<number>(1);
    const [personalInfo, setPersonalInfo] = useState<personalInfo | null>(null);
    const [contactInfo, setContactInfo] = useState<contactInfo | null>(null);
    const {user}=useAuthStore()
    
    const {data}=useGetSingleProfile(user?._id??'')
    
    const contact=data?.data?.data?.contactInfo
    const personal=data?.data?.data?.personalInfo
    const financial=data?.data?.data?.financialInfo
    const userId=user?._id as string
    

    const steps = [
        { id: 1, label: "Personal" },
        { id: 2, label: "Contact" },
        { id: 3, label: "Financial" },
    ];

    const renderStepComponent = () =>{
        
        switch (step) {
            case 1: return <PersonalInfo step={step} setStep={setStep} setPersonalInfo={setPersonalInfo} personal={personal} />;
            case 2: return <ContactInfo step={step} setStep={setStep} setContactInfo={setContactInfo} contact={contact} />;
            case 3: return <FinancialInfo setStep={setStep} personalInfo={personalInfo} contactInfo={contactInfo} financial={financial} userId={userId} />;
            case 4: return (
                <div className="text-center p-8">
                    <h2 className="text-2xl font-semibold text-green-700 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600">Thank you for completing your profile information.</p>
                    <div className="mt-6 p-4 bg-gray-100 rounded-md text-left">
                        <h3 className="font-bold">Submitted Info:</h3>
                        <pre className="mt-2 text-sm">{JSON.stringify({ personalInfo, contactInfo }, null, 2)}</pre>
                    </div>
                    <button onClick={() => setStep(1)} className="mt-6 px-4 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition">Start Over</button>
                </div>
            );
            default: return null;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-5 py-10">
            <div className="w-full md:w-[80%] lg:w-[70%] bg-white p-5 shadow-lg rounded-md">
                <div className="md:mb-10 mb-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-red-950 font-semibold">Complete Your Profile</h2>
                    <p className="text-sm text-gray-700">Please provide accurate information to get the most accurate credit rating</p>
                </div>

                <div className="relative mb-8">
                    <div className="absolute top-3 lg:left-32 lg:right-32 flex justify-between items-center">
                        {steps.slice(0, -1).map((s, idx) => (
                            <div key={idx} className={`h-1 flex-1 mx-2 rounded-full ${step > s.id ? "bg-red-950" : "bg-gray-300"} transition-colors duration-300`} />
                        ))}
                    </div>
                    <div className="flex justify-between relative z-10">
                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center w-full">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 border-2 ${step >= s.id ? "bg-red-950 text-white border-red-950" : "bg-white border-gray-400 text-gray-600"}`}>
                                    {s.id}
                                </div>
                                <p className={`mt-2 text-sm ${step >= s.id ? "font-bold text-red-950" : "text-gray-600"}`}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-8">{renderStepComponent()}</div>
            </div>
        </div>
    );
};

export default CompleteProfile;
