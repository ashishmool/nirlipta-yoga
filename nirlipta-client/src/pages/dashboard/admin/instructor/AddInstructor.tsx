import React, { useState } from "react";
import axios from "axios";

const AddInstructor: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        specialization: "",
        rating: 0,
        availability: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: formData.name,
            bio: formData.bio,
            specialization: formData.specialization.split(",").map((spec) => spec.trim()), // Convert to array
            rating: formData.rating,
            availability: formData.availability,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/instructors/save", payload);
            console.log("Instructor added successfully:", response.data);
            setFormData({
                name: "",
                bio: "",
                specialization: "",
                rating: 0,
                availability: "",
            }); // Clear form
        } catch (error) {
            console.error("Error adding instructor:", error);
            alert("Failed to add instructor. Please check the server logs for more details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Add New Instructor</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Specialization */}
                <div>
                    <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization (comma-separated)</label>
                    <input
                        id="specialization"
                        name="specialization"
                        type="text"
                        value={formData.specialization}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Rating */}
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        value={formData.rating}
                        onChange={handleChange}
                        min={0}
                        max={5}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Availability */}
                <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability (e.g., "Mon-Fri: 9AM-5PM")</label>
                    <input
                        id="availability"
                        name="availability"
                        type="text"
                        value={formData.availability}
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
                        {loading ? "Adding..." : "Add Instructor"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInstructor;  // This is important, ensure you have 'export default'
