"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from '@/hooks/useAuthModal';

import Modal from './Modal';

const AuthModal = () => {
    const { session } = useSessionContext();
    const router = useRouter();
    const { onClose, isOpen } = useAuthModal();
    
    const supabaseClient = useSupabaseClient();

    const [ fullName, setFullName ] = React.useState('');

    const [view, setView] = React.useState<"sign_in" | "sign_up">("sign_in");

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    useEffect(() => {
        if (!session || view !== "sign_up" || !fullName.trim()) return;

        supabaseClient.auth.updateUser({
            data: {
                full_name: fullName,
            },
        });
    }, [session]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    return (
        <Modal
            title="Welcome Back"
            description="Login to your Account"
            isOpen={isOpen}
            onChange={onChange}        
        >
            {/* {!session && view === "sign_up" && (
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-neutral-500 mb-1'>
                        Full Name
                    </label>
                    <input
                        type='text'
                        placeholder='Enter your full name'
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-md bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            )}             */}
            <Auth
                supabaseClient={supabaseClient}
                providers={[]}
                theme="dark"
                magicLink={true}
                // view={view}
                appearance={{
                    theme: ThemeSupa,
                    variables:{
                        default:{
                            colors:{
                                brand: '#404040',
                                brandAccent: '#22c55e'
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
}

export default AuthModal;