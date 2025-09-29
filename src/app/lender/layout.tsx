"use client";

import Sidebar from "@/components/lenderDashbord/sidebar/Sidebar";
import { useAuthStore } from "@/components/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const role = user?.role;

  useEffect(() => {
    if (role === undefined){
      router.push('/login')
      return
    }
    if (!role) {
      router.replace("/login");
      return;
    }
    if (role === "user") {
      router.replace("/account");
    }
  }, [role, router]);

  if (role === undefined) {
    return <div>Loading...</div>;
  }
  if (!role || role === "user") {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="bg-white">
      <div>
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
