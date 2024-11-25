import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListWorkshops: React.FC = () => {
    const [workshops, setWorkshops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/workshops");
                setWorkshops(response.data);
            } catch (error) {
                console.error("Error fetching workshops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkshops();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this workshop?")) {
            try {
                await axios.delete(`http://localhost:5000/api/workshops/${id}`);
                setWorkshops(workshops.filter((workshop: any) => workshop._id !== id));
            } catch (error) {
                console.error("Error deleting workshop:", error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Workshops</h1>
            <div className="flex justify-between mb-4">
                <Link
                    to="/admin/workshops/add"
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
                    Add Workshop
                </Link>
            </div>
            {loading ? (
                <p>Loading workshops...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Instructor</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {workshops.map((workshop: any) => (
                        <tr key={workshop._id} className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{workshop.title}</td>
                            {/* Render instructor name instead of object */}
                            <td className="px-6 py-4 text-sm text-gray-500">{workshop.instructor_id?.name || 'No Instructor'}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{workshop.price}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <Link
                                    to={`/admin/workshops/update/${workshop._id}`}
                                    className="text-indigo-600 hover:text-indigo-700 mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(workshop._id)}
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

export default ListWorkshops;
