import Link from "next/link";


export default function MyAccount() {
    return (
        <div className="container mx-auto">
            <h1>My Account</h1>
            At any time you can delete your PlayBox account and all associated data will be deleted.
            <br>
            </br>
            <Link href="/delete">
                <button className={"btn bg-red-900"}>Delete Account</button>
            </Link>
        </div>
    );
}

