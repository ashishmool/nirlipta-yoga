import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateAccommodation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        location: "",
        available_rooms: 0,
        amenities: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/accommodations/getById/${id}`);
                const { name, description, price, location, available_rooms, amenities, image } = response.data;
                setFormData({
                    name,
                    description,
                    price,
                    location,
                    available_rooms,
                    amenities: amenities.join(", "), // Convert array to comma-separated string
                    image,
                });
            } catch (error) {
                console.error("Error fetching accommodation:", error);
                alert("Failed to fetch accommodation data.");
            }
        };

        fetchAccommodation();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            available_rooms: formData.available_rooms,
            amenities: formData.amenities.split(",").map((amenity) => amenity.trim()),
            image: formData.image,
        };

        try {
            await axios.put(`http://localhost:5000/api/accommodations/update/${id}`, payload);
            alert("Accommodation updated successfully!");
            navigate("/admin/accommodations"); // Redirect to accommodations list
        } catch (error) {
            console.error("Error updating accommodation:", error);
            alert("Failed to update accommodation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Update Accommodation</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields same as AddAccommodation */}
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                            {key.replace("_", " ").toUpperCase()}
                        </label>
                        <input
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {loading ? "Updating..." : "Update Accommodation"}
                </button>
            </form>
        </div>
    );
};

export default UpdateAccommodation;
