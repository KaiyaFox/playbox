// // Search for shows using ticketmasters API
// import { useEffect, useState } from "react";
//
// interface ConcertsProps {
//     topArtist: {
//         name: string;
//     }[];
// }
//
// export default function Concerts({topArtist}: ConcertsProps) {
//     const [concerts, setConcerts] = useState<any[]>([]);
//
//     useEffect(() => {
//         const fetchConcerts = async () => {
//             try {
//                 const results: any[] = [];
//
//                 for (const artist of topArtist) {
//                     const res = await fetch(
//                         `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
//                             artist.name
//                         )}&size=3&apikey=${process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY}`
//                     );
//                     const data = await res.json();
//
//                     if (data._embedded?.events) {
//                         results.push(...data._embedded.events);
//                     }
//                 }
//
//                 setConcerts(results);
//                 console.log("Concerts:", results);
//             } catch (error) {
//                 console.error("Error fetching concerts:", error);
//             }
//         };
//
//
//             fetchConcerts();
//
//     }, [topArtist]);
//
//
//     return (
//         <div className="flex items-center justify-center min-h-screen">
//             <div className="p-6 rounded-lg shadow-lg w-96 list bg-base-300/30 rounded-box shadow-md backdrop-blur-sm">
//                 <h1 className="text-xl font-bold mb-4 text-center">Concerts</h1>
//                 <p className="mb-4 text-center">Based on your favorite artists:</p>
//
//                 {concerts.length === 0 ? (
//                     <p className="text-center">No concerts found yet.</p>
//                 ) : (
//                     <ul className="space-y-2">
//                         {concerts.map((event, index) => (
//                             <li key={index} className="p-2 border border-base-100 rounded">
//                                 <strong>{event.name}</strong>
//                                 <div className="text-sm">{event.dates.start.localDate}</div>
//                                 <div className="text-sm text-gray-500">
//                                     {event._embedded.venues[0].city.name}
//                                 </div>
//                                 <a
//                                     href={event.url}
//                                     target="_blank"
//                                     className="text-blue-500 text-sm underline"
//                                 >
//                                     View Tickets
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// }