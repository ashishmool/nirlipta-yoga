import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPartner: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        logoUrl: "",
        website: "",
        category: "Sports Partner",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/partners/save", formData);
            alert("Partner added successfully!");
            navigate("/admin/partners");
        } catch (error) {
            console.error("Error adding partner:", error);
            alert("Failed to add partner. Please check server logs.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-blue-600 hover:underline mb-4"
            >
                Back to Partners List
            </button>
            <h1 className="text-3xl font-semibold text-center mb-6">Add New Partner</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Partner Name</label>
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

                <div>
                    <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700">Logo URL</label>
                    <input
                        id="logoUrl"
                        name="logoUrl"
                        type="text"
                        value={formData.logoUrl}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                    <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    >
                        <option value="Sports Partner">Sports Partner</option>
                        <option value="Spiritual Partner">Spiritual Partner</option>
                        <option value="Education Partner">Education Partner</option>
                        <option value="Business Partner">Business Partner</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {loading ? "Adding..." : "Add Partner"}
                </button>
            </form>
        </div>
    );
};

export default AddPartner;
