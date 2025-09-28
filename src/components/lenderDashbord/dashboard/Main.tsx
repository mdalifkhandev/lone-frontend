import React from 'react';
import ClientStatus from './ClientStatus';
import ClientList from './clientList/ClientList';
import { useGetApplyLone } from '@/components/api/server/applyLone';
import { Client } from '@/components/interface/profile';
import { useAuthStore } from '@/components/store/authStore';

const Main = () => {
    const {user}=useAuthStore()
    const email=user?.email as string
    const { data: loanApplications } = useGetApplyLone(email);
    const loanApplicationsData: Client[] = loanApplications?.data || [];
    
    const creditRequestStatus = {
        totalClients: loanApplicationsData.length || 0,
        approvedClients: loanApplicationsData.filter((app) => app.status === 'approved').length || 0,
        pendingClients: loanApplicationsData.filter((app) => app.status === 'pending').length || 0,
    };
    return (
        <div className='text-black bg-white'>
            <h1 className='text-2xl font-bold mb-8 mt-6'>
                CreditFirst - Dashboard
            </h1>
            <ClientStatus creditRequestStatus={creditRequestStatus} />
            <ClientList loanApplicationsData={loanApplicationsData} />
        </div>
    );
};

export default Main;