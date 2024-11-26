import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddAccommodation: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price_per_night: 0,
        location: "",
        max_occupancy: 1,
        photo: null as File | null,
        available_rooms: 1, // Add available_rooms here
    });

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, photo: file });
            setImagePreview(URL.createObjectURL(file)); // Set the preview URL
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("description", formData.description);
        formDataObj.append("price_per_night", formData.price_per_night.toString()); // Make sure price is a string
        formDataObj.append("location", formData.location);
        formDataObj.append("max_occupancy", formData.max_occupancy.toString());
        formDataObj.append("available_rooms", formData.available_rooms.toString()); // Add available_rooms

        // Add the photo file if it's present
        if (formData.photo) {
            formDataObj.append("photo", formData.photo);
        }

        try {
            console.log("Payload for Accommodation:::", formDataObj);
            await axios.post("http://localhost:5000/api/accommodations/save", formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Accommodation added successfully!");
            navigate("/admin/accommodations");
        } catch (error) {
            console.error("Error adding accommodation:", error);
            alert("Failed to add accommodation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)} // Go back to the previous page
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    &#8592; Back
                </button>
                <h1 className="text-3xl font-semibold">Add Accommodation</h1>
            </div>
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

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Price Per Night */}
                <div>
                    <label htmlFor="price_per_night" className="block text-sm font-medium text-gray-700">Price Per Night</label>
                    <input
                        id="price_per_night"
                        name="price_per_night"
                        type="number"
                        value={formData.price_per_night}
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

                {/* Max Occupancy */}
                <div>
                    <label htmlFor="max_occupancy" className="block text-sm font-medium text-gray-700">Max Occupancy</label>
                    <input
                        id="max_occupancy"
                        name="max_occupancy"
                        type="number"
                        value={formData.max_occupancy}
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

                {/* Photo */}
                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Image Preview:</p>
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="w-full h-60 object-cover border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {loading ? "Adding..." : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline-block mr-2"
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
                                Add Accommodation
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};


export default AddAccommodation;
