import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMale, FaFemale, FaTransgenderAlt } from 'react-icons/fa';
import axios from "axios";

const ListUsers: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users");
                setUsers(response.data);
                console.log("Fetched Users Data::: ", response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
                alert("Error loading users.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
            setUsers(users.filter((user) => user._id !== userId));
            alert("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Users</h1>
            <div className="flex justify-between mb-4">
                <Link
                    to="/admin/users/add"
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
                    Add User
                </Link>
            </div>
            {loading ? (
                <p className="text-center text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No users found.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Gender</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {user.gender === "male" && <FaMale className="inline-block mr-2" />}
                                {user.gender === "female" && <FaFemale className="inline-block mr-2" />}
                                {user.gender === "other" && (
                                    <>
                                        <FaMale className="inline-block mr-2" />
                                        <FaFemale className="inline-block mr-2" />
                                    </>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{user.role}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <Link
                                    to={`/admin/users/update/${user._id}`}
                                    className="text-indigo-600 hover:text-indigo-700 mr-4"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(user._id)}
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

export default ListUsers;
