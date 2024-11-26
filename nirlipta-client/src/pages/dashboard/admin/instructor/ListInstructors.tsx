import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListInstructors: React.FC = () => {
    const [instructors, setInstructors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/instructors");
                setInstructors(response.data);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            try {
                await axios.delete(`http://localhost:5000/api/instructors/delete/${id}`);
                setInstructors(instructors.filter((instructor: any) => instructor._id !== id));
            } catch (error) {
                console.error("Error deleting instructor:", error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Instructors</h1>
            <div className="flex justify-between mb-4">
                <Link
                    to="/admin/instructors/add"
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
                    Add Instructor
                </Link>
            </div>
            {loading ? (
                <p>Loading instructors...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Specialization</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Rating</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {instructors.map((instructor: any) => (
                        <tr key={instructor._id} className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{instructor.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {instructor.specialization?.join(", ") || "No Specialization"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{instructor.rating}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <Link
                                    to={`/admin/instructors/update/${instructor._id}`}
                                    className="text-indigo-600 hover:text-indigo-700 mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(instructor._id)}
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

export default ListInstructors;
