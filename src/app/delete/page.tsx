"use client"

import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Delete() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('/api/deleteAccount', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                setIsDeleted(true);
                setTimeout(() => {
                    signOut({ callbackUrl: '/' });
                    router.push('/');
                }, 10000);
            } else {
                console.error('Failed to delete account');
            }
        } catch (error) {
            console.error('An error occurred while deleting the account:', error);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 rounded-lg shadow-lg bg-base-300/30 backdrop-blur-sm w-96 text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p>You must be signed in.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 rounded-lg shadow-lg bg-base-300/30 backdrop-blur-sm w-96 text-center">
                {isDeleted ? (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Account Deleted</h1>
                        <p className="mb-2">Your PlayBox account and all associated data have been successfully deleted.</p>
                        <p className="text-sm text-neutral-400">You will be signed out and redirected shortly.</p>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4">Delete Account</h1>
                        <p className="mb-4">
                            Are you sure you want to delete your PlayBox account?
                            <br />
                            <strong>This action is permanent</strong> and will remove all data including listening history, preferences, and comments.
                        </p>
                        <p className="mb-6 text-sm text-neutral-400">
                            This will <strong>not</strong> affect your Spotify account.
                        </p>
                        <button className="btn bg-red-700 hover:bg-red-800 text-white" onClick={handleDeleteAccount}>
                            Yes, Delete My Account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}