"use client";

import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);
    
    return (
        <div className="mb-7 px-6 bg-slate-800">
            <p className="py-3 text-2xl">Account Content </p>
            <p className="py-5">Work in Progress <br /> <BarLoader color="#1db954" /></p>
        </div>
    );
}

export default AccountContent;