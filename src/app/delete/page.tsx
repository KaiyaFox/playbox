"use client"
// Delete and unlink Spotify from PlayBox
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import {useState} from "react";


export default function Delete() {
const router = useRouter();
const [isDeleted, setIsDeleted] = useState(false);
    // Check if user is authenticated

    // Handle delete account request
    const handleDeleteAccount = async () => {
        try {
            // Make an API call to delete the account
            const response = await fetch('/api/deleteAccount', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Sign out the user
                setIsDeleted(true);

                // Wait 5 seconds before redirecting
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

    return (
        <div className="flex items-center justify-center min-h-screen ">
            {isDeleted ? (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Account Deleted</h1>
                    <p>Your account has been successfully deleted.</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-3xl font-bold mb-4">Delete Account</h1>
                    <p className="mb-4">Are you sure you want to delete your account? This action is irreversible and all of your data on PlayBox
                        including comments on songs will be deleted.</p>
                    <p>This WILL NOT affect your Spotify Account.</p>
                    <button className="btn bg-red-900" onClick={handleDeleteAccount}>Delete PlayBox Account</button>
                </div>
            )}
        </div>
    );
}