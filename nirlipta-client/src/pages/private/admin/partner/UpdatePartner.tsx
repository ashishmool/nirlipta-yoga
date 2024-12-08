import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePartner: React.FC = () => {
    const { partnerId } = useParams<{ partnerId: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        logoUrl: "",
        website: "",
        category: "Sports Partner",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/partners/${partnerId}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching partner:", error);
                alert("Error fetching partner details.");
            }
        };

        if (partnerId) fetchPartner();
    }, [partnerId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://localhost:5000/api/partners/update/${partnerId}`, formData);
            alert("Partner updated successfully!");
            navigate("/admin/partners");
        } catch (error) {
            console.error("Error updating partner:", error);
            alert("Failed to update partner.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Update Partner</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Partner Name */}
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

                {/* Logo URL */}
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

                {/* Website */}
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

                {/* Category */}
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

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {loading ? "Updating..." : "Update Partner"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePartner;
