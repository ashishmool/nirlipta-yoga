import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateInstructor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        specialization: "",
        rating: 0,
        availability: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchInstructor = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/instructors/getById/${id}`);
                const instructor = response.data;
                setFormData({
                    name: instructor.name || "",
                    bio: instructor.bio || "",
                    specialization: instructor.specialization.join(", ") || "",
                    rating: instructor.rating || 0,
                    availability: instructor.availability || "",
                });
            } catch (error) {
                console.error("Error fetching instructor:", error);
            }
        };

        if (id) fetchInstructor();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...formData,
            specialization: formData.specialization.split(",").map((spec) => spec.trim()),
        };

        try {
            await axios.put(`http://localhost:5000/api/instructors/update/${id}`, payload);
            alert("Instructor updated successfully!");
            navigate("/admin/instructors");
        } catch (error) {
            console.error("Error updating instructor:", error);
            alert("Failed to update instructor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow">
            <h1 className="text-3xl font-semibold text-center mb-6">Update Instructor</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/** Form Fields */}
                {["name", "bio", "specialization", "rating", "availability"].map((field) => (
                    <div key={field}>
                        <label
                            htmlFor={field}
                            className="block text-sm font-medium text-gray-700 capitalize"
                        >
                            {field === "specialization"
                                ? "Specialization (comma-separated)"
                                : field === "rating"
                                    ? "Rating (0-5)"
                                    : field}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type={field === "rating" ? "number" : "text"}
                            value={formData[field]}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                ))}

                {/** Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {loading ? "Updating..." : "Update Instructor"}
                </button>
            </form>
        </div>
    );
};

export default UpdateInstructor;
