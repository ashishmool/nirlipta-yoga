import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ListAccommodation: React.FC = () => {
    const [accommodations, setAccommodations] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAccommodations, setFilteredAccommodations] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/accommodations");
                setAccommodations(response.data || []);
                setFilteredAccommodations(response.data || []);
            } catch (error) {
                console.error("Error fetching accommodations:", error);
            }
        };

        fetchAccommodations();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this accommodation?")) {
            try {
                await axios.delete(`http://localhost:5000/api/accommodations/delete/${id}`);
                setAccommodations((prev) => prev.filter((acc) => acc._id !== id));
                setFilteredAccommodations((prev) => prev.filter((acc) => acc._id !== id));
            } catch (error) {
                console.error("Error deleting accommodation:", error);
            }
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredAccommodations(
            accommodations.filter((acc) =>
                Object.values(acc).some((value) => value.toString().toLowerCase().includes(query))
            )
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Accommodations</h1>

            {/* Search and Add Button */}
            <div className="flex justify-between mb-4">
                <Link
                    to="/admin/accommodations/add"
                    className="inline-flex items-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add Accommodation
                </Link>
                <input
                    type="text"
                    placeholder="Search accommodations"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Accommodations Table */}
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Available Rooms</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredAccommodations.map((acc) => (
                    <tr key={acc._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{acc.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{acc.location}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{acc.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{acc.available_rooms}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                            <Link
                                to={`/admin/accommodations/update/${acc._id}`}
                                className="text-indigo-600 hover:text-indigo-700 mr-4"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(acc._id)}
                                className="text-red-600 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAccommodation;
