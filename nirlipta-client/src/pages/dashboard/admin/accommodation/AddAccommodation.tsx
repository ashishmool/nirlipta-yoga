import React, { useState } from "react";
import axios from "axios";

const AddAccommodation: React.FC = () => {
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
            amenities: formData.amenities.split(",").map((amenity) => amenity.trim()), // Convert to an array
            image: formData.image,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/accommodations/save", payload);
            console.log("Accommodation added successfully:", response.data);
            setFormData({
                name: "",
                description: "",
                price: 0,
                location: "",
                available_rooms: 0,
                amenities: "",
                image: "",
            }); // Clear form
        } catch (error) {
            console.error("Error adding accommodation:", error);
            alert("Failed to add accommodation. Please check the server logs for more details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Add New Accommodation</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Accommodation Name</label>
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

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Location */}
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Available Rooms */}
                <div>
                    <label htmlFor="available_rooms" className="block text-sm font-medium text-gray-700">Available Rooms</label>
                    <input
                        id="available_rooms"
                        name="available_rooms"
                        type="number"
                        value={formData.available_rooms}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Amenities */}
                <div>
                    <label htmlFor="amenities" className="block text-sm font-medium text-gray-700">Amenities (comma-separated)</label>
                    <input
                        id="amenities"
                        name="amenities"
                        type="text"
                        value={formData.amenities}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        id="image"
                        name="image"
                        type="text"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {loading ? "Adding..." : "Add Accommodation"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAccommodation;
