"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "@/components/assets/logo.png";
import Main from "../dashboard/Main";
import Setting from "../setting/Setting";
import { useLogout } from "@/components/api/server/auth";
import { useAuthStore } from "@/components/store/authStore";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const sidebarItems = [
  { label: "Dashboard", component: Main },
  { label: "Settings", component: Setting },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { mutate } = useLogout()
  const email = user?.email as string
  const router = useRouter()

  const ActiveComponent = sidebarItems[activeIndex].component;

  const handelLogout = () => {
    mutate((email), {
      onSuccess: () => {
        logout();
        toast.success('Log Out successfully')
      }
    })
    router.push('/');
  }

  return (
    <div className="relative min-h-screen">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-red-950 text-white flex items-center justify-between px-4 py-3 shadow-md z-50">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={40} height={40} className="rounded-xl" />
          <span className="font-bold">Lender Dashboard</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-red-950 text-white p-4 z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:rounded-r-2xl
        `}
      >
        <div className="flex justify-center mt-14 mb-4">
          <Image
            src={logo}
            alt="logo"
            width={80}
            height={80}
            className="bg-white p-2 rounded-2xl"
          />
        </div>
        <ul>
          {sidebarItems.map((tab, index) => (
            <li key={index} className="mb-2">
              <button
                onClick={() => {
                  setActiveIndex(index);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-2 rounded-md
                  ${activeIndex === index
                    ? "bg-gray-900 text-white font-bold"
                    : "hover:bg-gray-900 hover:text-white text-gray-200"
                  }
                  transition-colors duration-200
                `}
              >
                {tab.label}
              </button>
            </li>
          ))}
          <li className="w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-500 hover:text-white font-bold cursor-pointer">
            <button onClick={handelLogout} className="w-full text-left cursor-pointer" >Log Out</button>
          </li>
        </ul>
      </aside>

      {/* Overlay for mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="bg-gray-100 p-5 mt-14 lg:mt-0 lg:ml-64 min-h-screen">
        <ActiveComponent />
      </main>
    </div>
  );
};

export default Sidebar;
