"use client";

import { useAuthStore } from "@/components/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const role = user?.role;


  useEffect(() => {
    if (role === undefined){
      router.push('/login')
      return
    } // Wait for user to load
    if (!role) {
      router.replace("/login");
      return;
    }
    if (role !== 'user') {
      router.replace('/lender');
    }
  }, [role, router]);

  if (role === undefined) {
    return <div>Loading...</div>;
  }
  if (!role || role !== 'user') {
    return <div>Redirecting...</div>;
  }

  return <div>{children}</div>;
};

export default Layout;
