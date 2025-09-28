'use client';

import Image from 'next/image';
import { CiCreditCardOff, CiLock } from 'react-icons/ci';
import { PiSignOutFill } from "react-icons/pi";
import { FiUser } from 'react-icons/fi';
import { JSX, useState } from 'react';
import { useAuthStore } from '@/components/store/authStore';
import PersonalInformation from '@/components/account/PersonalInformation';
import Security from '@/components/account/Security';
import LoanStatus from '@/components/account/LoanStatus';
import image from '@/components/assets/logo.png';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/components/api/server/auth';
import { toast } from 'react-toastify';

interface ProfileLink {
  id: number;
  title: string;
  componentId: string;
  icon: JSX.Element;
}

const profileLinks: ProfileLink[] = [
  {
    id: 1,
    title: "Personal Information",
    componentId: "personal-info",
    icon: <FiUser size={19} />
  },
  {
    id: 2,
    title: "Security",
    componentId: "security",
    icon: <CiLock size={19} />
  },
  {
    id: 3,
    title: "Loan Status",
    componentId: "loan-status",
    icon: <CiCreditCardOff size={19} />
  }
];

const ProfileLayout = () => {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('personal-info');
  const { user, logout } = useAuthStore();
  const { mutate, isPending } = useLogout();

  const email = user?.email;

  const handleSignOut = () => {
    if (!email) return; 

    mutate(email, {
      onSuccess: () => {
        logout();
        toast.success('Log Out successfully');
        router.push('/');
      },
      onError: () => {
        toast.error('Failed to log out');
      }
    });
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'personal-info':
        return <PersonalInformation />;
      case 'security':
        return <Security />;
      case 'loan-status':
        return <LoanStatus />;
      default:
        return null;
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen py-6 md:py-8 lg:py-10 px-3 md:px-16 lg:px-20'>
      <div className='mb-6 md:mb-8 lg:mb-10'>
        <h1 className='text-2xl md:text-3xl lg:text-4xl text-red-950'>Account Settings</h1>
        <p className='text-sm text-gray-600'>Manage your account preferences and information</p>
      </div>

      <div className='flex justify-center flex-col md:flex-row items-start gap-5'>
   
        <div className='w-full md:w-[40%] lg:w-[45%] bg-white rounded-sm p-4 shadow-md'>
          <div className='flex items-center gap-6 border-b border-gray-300 pb-6'>
            <Image
              src={image}
              alt="Logo"
              className='w-12 h-12 rounded-full border border-blue-500'
              width={48}
              height={48}
            />
            <div>
              <h2 className='text-xl text-black font-semibold'>{'User'}</h2>
              <p className='text-gray-700 text-sm'>{user?.email}</p>
            </div>
          </div>

          <div className='mt-6 border-b text-black border-gray-300 pb-6'>
            <ul className='md:space-y-2 space-y-1 text-[15px] font-medium'>
              {profileLinks.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => setActiveComponent(link.componentId)}
                    className={`${activeComponent === link.componentId
                      ? 'bg-red-200 border text-red-950 border-gray-500'
                      : ''} w-full flex items-center gap-3 py-2 px-3 rounded-sm`}
                  >
                    {link.icon}
                    {link.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6 cursor-pointer'>
            <button
              onClick={handleSignOut}
              disabled={!email || isPending} 
              className={`flex items-center gap-3 font-medium text-[16px] px-3 py-2 rounded cursor-pointer 
                ${!email || isPending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-600 hover:text-red-700"}`}
            >
              <PiSignOutFill size={19} />
              {isPending ? "Logging out..." : "Sign Out"}
            </button>
          </div>
        </div>

 
        <div className='w-full bg-white rounded-sm px-3 py-5 shadow-md'>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
