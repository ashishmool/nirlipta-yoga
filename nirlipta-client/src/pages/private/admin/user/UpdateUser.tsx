import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate for navigation
import axios from "axios";

const UpdateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get user ID from the route parameter
    const navigate = useNavigate(); // Hook to navigate programmatically

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_picture: "",
        role: "student",
        age: 0,
        height: 0,
        weight: 0,
        gender: "prefer not to say",
        medical_conditions: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch existing user data to populate the form
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/getById/${id}`);
                setFormData({
                    ...response.data,
                    medical_conditions: response.data.medical_conditions?.join(", ") || "", // Convert array to comma-separated string
                });
                console.log("Fetched User::: ",response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            medical_conditions: formData.medical_conditions.split(",").map((condition) => condition.trim()),
        };

        try {
            // Update user by ID
            const response = await axios.put(`http://localhost:5000/api/users/update/${id}`, payload);
            alert("User updated successfully!");
            console.log("Response:", response.data);
            navigate("/admin/users"); // Redirect to user list after update
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    &#8592; Back
                </button>
            </div>

            <h1 className="text-3xl font-semibold text-center mb-6">Update User</h1>
            {loading ? (
                <p>Loading user data...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Inputs */}
                    {[{ label: "Name", name: "name", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Profile Picture (URL)", name: "profile_picture", type: "text" },
                        { label: "Age", name: "age", type: "number" },
                        { label: "Height (cm)", name: "height", type: "number" },
                        { label: "Weight (kg)", name: "weight", type: "number" }]
                        .map(({ label, name, type }) => (
                            <div key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    id={name}
                                    name={name}
                                    type={type}
                                    value={formData[name] || ""} // Ensure value is never null
                                    onChange={handleChange}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                        ))}

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender || ""} // Ensure value is never null
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-Binary</option>
                            <option value="prefer not to say">Prefer Not to Say</option>
                        </select>
                    </div>

                    {/* Role */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role || ""} // Ensure value is never null
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                        <label htmlFor="medical_conditions" className="block text-sm font-medium text-gray-700">Medical Conditions (comma-separated)</label>
                        <input
                            id="medical_conditions"
                            name="medical_conditions"
                            type="text"
                            value={formData.medical_conditions || ""} // Ensure value is never null
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? "Updating..." : "Update User"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateUser;
