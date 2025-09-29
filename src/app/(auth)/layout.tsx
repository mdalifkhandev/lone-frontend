"use client";

import { useAuthStore } from "@/components/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role) {
      router.push("/");
    }
  }, [user, router]);

  if (user?.role) {
    return <div>Redirecting...</div>;
  }

  return <div>{children}</div>;
};

export default Layout;
