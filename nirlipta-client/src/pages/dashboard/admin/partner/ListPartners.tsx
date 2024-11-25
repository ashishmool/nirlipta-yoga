import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListPartners: React.FC = () => {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/partners");
                setPartners(response.data);
            } catch (error) {
                console.error("Error fetching partners:", error);
                alert("Error loading partners.");
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    const handleDelete = async (partnerId: string) => {
        if (!window.confirm("Are you sure you want to delete this partner?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/partners/delete/${partnerId}`);
            setPartners(partners.filter((partner) => partner._id !== partnerId));
            alert("Partner deleted successfully.");
        } catch (error) {
            console.error("Error deleting partner:", error);
            alert("Failed to delete partner.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Partners</h1>
            <div className="flex justify-between mb-4">
                <Link
                    to="/admin/partners/add"
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
                    Add Partner
                </Link>
            </div>
            {loading ? (
                <p className="text-center text-gray-500">Loading partners...</p>
            ) : partners.length === 0 ? (
                <p className="text-center text-gray-500">No partners found.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {partners.map((partner) => (
                        <tr key={partner._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{partner.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{partner.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <Link
                                    to={`/admin/partners/update/${partner._id}`}
                                    className="text-indigo-600 hover:text-indigo-700 mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(partner._id)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ListPartners; // Default export
