import Link from "next/link";


export default function MyAccount() {
    return (
        <div className="container mx-auto">
            <h1>My Account</h1>
            At any time you can delete your PlayBox account and all associated data will be deleted.
            <button className={"btn btn-red"}>Delete PlayBox Account</button>
            <Link href="/delete">Delete Account</Link>
        </div>
    );
}

