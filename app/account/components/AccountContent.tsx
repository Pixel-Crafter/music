"use client";

import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const AccountContent = () => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const [loading, setLoading] = useState(false);

    const supabaseClient = useSupabaseClient();
    const [name, setName] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSaveName = async () => {
        if (!name.trim()) return;

        setSaving(true);

        const { error } = await supabaseClient.auth.updateUser({
            data: 
                {
                    full_name: name,
                },
        });

        setSaving(false);

        if (!error) {
            await supabaseClient.auth.refreshSession();
            router.refresh();
        }
    }

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);
    
    return (
        <div className="mb-7 px-6 bg-slate-800">
            <p className="py-3 text-2xl">Account Content </p>
            <p className="py-5">Work in Progress <br /> <BarLoader color="#1db954" /></p>
            <div className="space-y-2 text-sm text-neutral-300">

                {user?.user_metadata.full_name || user?.user_metadata?.name ? (
                    <p>
                        <span className="font-semibold">Name:</span> {" "}
                        {user?.user_metadata.full_name || user?.user_metadata?.name}
                    </p>
                ) : (
                    <div className="space-y-2 max-w-xs">
                        <p className="text-yellow-400 text-sm">
                            Name not added yet 
                        </p>

                        <input 
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full max-w-xs rounded-md bg-neutral-900 border-neutral-700 px-3 py-2 text-sm text-white"
                        />

                        <Button 
                            onClick={handleSaveName}
                            disabled={saving}                            
                        >
                            {saving ? "Saving..." : "Add Name"}
                        </Button>
                    </div>
                )}


                {/* <p>
                    <span className="font-semibold">Name: </span> {" "} 
                    {user?.user_metadata.full_name || user?.user_metadata?.name}
                </p> */}

                <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                </p>
            </div>
        </div>
    );
}

export default AccountContent;