// import React, { useEffect, useState } from "react";
// import axios from "axios";
//
// interface Retreat {
//     _id: string;
//     title: string;
//     description: string;
//     start_date: string;
//     end_date: string;
//     price_per_person: number;
//     max_participants?: number;
//     address?: string;
//     map_location?: string;
//     meals_info?: string[];
//     organizer: string;
//     guests?: { name: string; photo?: string }[];
//     featuring_events?: string[];
// }
//
// const ListRetreats: React.FC = () => {
//     const [retreats, setRetreats] = useState<Retreat[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         async function fetchRetreats() {
//             try {
//                 const response = await axios.get("/api/retreats");
//                 setRetreats(response.data);
//             } catch (error) {
//                 console.error("Error fetching retreats:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchRetreats();
//     }, []);
//
//     if (loading) {
//         return <div>Loading retreats...</div>;
//     }
//
//     return (
//         <div>
//             <h1>List of Retreats</h1>
//             {retreats.length === 0 ? (
//                 <p>No retreats available.</p>
//             ) : (
//                 <ul>
//                     {retreats.map((retreat) => (
//                         <li key={retreat._id}>
//                             <h2>{retreat.title}</h2>
//                             <p>{retreat.description}</p>
//                             <p>
//                                 <strong>Dates:</strong> {new Date(retreat.start_date).toLocaleDateString()} -{" "}
//                                 {new Date(retreat.end_date).toLocaleDateString()}
//                             </p>
//                             <p>
//                                 <strong>Price:</strong> ${retreat.price_per_person} per person
//                             </p>
//                             <p>
//                                 <strong>Organizer:</strong> {retreat.organizer}
//                             </p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default ListRetreats;
