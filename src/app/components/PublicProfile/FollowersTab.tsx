// // Tab that shows the users followers
// import { useEffect, useState } from "react";
// export default function FollowersTab({ userId }: { userId: string }) {
//     const [followers, setFollowers] = useState<any[]>([]);
//
//     console.log("From FollowTAB",userId);
//
//     useEffect(() => {
//         const fetchFollowers = async () => {
//             try {
//                 const response = await fetch("/api/followers", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ userId }),
//                 });
//                 const data = await response.json();
//                 console.log("Followers data: ", data);
//                 setFollowers(data.followers);
//             } catch (error) {
//                 console.error("Error fetching followers:", error);
//             }
//         };
//
//         fetchFollowers();
//     }, [userId]);
//
//     return (
//         <div className="overflow-x-auto">
//             <table className="table w-full">
//                 <thead>
//                     <tr>
//                         <th>Follower</th>
//                         <th>Followed At</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {followers.map((follower) => (
//                         <tr key={follower.id}>
//                             <td>{follower.name}</td>
//                             <td>{new Date(follower.created_at).toLocaleDateString()}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }