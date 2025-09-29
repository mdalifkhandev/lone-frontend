"use client"

import { useAuthStore } from "@/components/store/authStore";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthStore();
    const router = useRouter();
    if(user?.role){
        return router.push('/')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default layout;