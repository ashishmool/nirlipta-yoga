import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const UpdateWorkshop: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        difficulty_level: "beginner",
        price: 0,
        classroom_info: "",
        address: "",
        map_location: "",
        photo: null as File | null,
        instructor_id: "",
    });

    // Loading state for API request
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Fetch workshop data on component mount
    useEffect(() => {
        const fetchWorkshopData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/workshops/${id}`);
                const workshop = response.data;
                setFormData({
                    title: workshop.title || "",
                    description: workshop.description || "",
                    difficulty_level: workshop.difficulty_level || "beginner",
                    price: workshop.price || 0,
                    classroom_info: workshop.classroom_info || "",
                    address: workshop.address || "",
                    map_location: workshop.map_location || "",
                    photo: null, // Don't auto-load photo into form data
                    instructor_id: workshop.instructor_id || "",
                });

                if (workshop.photo) {
                    setImagePreview(workshop.photo); // Set existing photo as preview if available
                }
            } catch (error) {
                console.error("Error fetching workshop data:", error);
                toast.error("Failed to load workshop data.");
            }
        };

        fetchWorkshopData();
    }, [id]);

    // Handle file change for photo upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, photo: file });
            setImagePreview(URL.createObjectURL(file)); // Set the preview URL
        }
    };

    // Handle changes in form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for updating the workshop
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formDataObj = new FormData();
        formDataObj.append("title", formData.title);
        formDataObj.append("description", formData.description);
        formDataObj.append("difficulty_level", formData.difficulty_level);
        formDataObj.append("price", formData.price.toString());
        formDataObj.append("classroom_info", formData.classroom_info);
        formDataObj.append("address", formData.address);
        formDataObj.append("map_location", formData.map_location);
        formDataObj.append("instructor_id", formData.instructor_id);

        if (formData.photo) {
            formDataObj.append("photo", formData.photo);
        }

        try {
            await axios.put(`http://localhost:5000/api/workshops/update/${id}`, formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Workshop updated successfully!");
            navigate("/admin/workshops");
        } catch (error) {
            console.error("Error updating workshop:", error);
            toast.error("Failed to update workshop.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-indigo-600 hover:text-indigo-700">
                    &#8592; Back
                </button>
                <h1 className="text-3xl font-semibold">Update Workshop</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-7 gap-4">
                    <div className="col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="col-span-3">
                        <label htmlFor="instructor_id" className="block text-sm font-medium text-gray-700">Instructor</label>
                        <input
                            id="instructor_id"
                            name="instructor_id"
                            type="text"
                            value={formData.instructor_id}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

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

                <div className="grid grid-cols-3 gap-4">
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
                    <div>
                        <label htmlFor="difficulty_level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                        <select
                            id="difficulty_level"
                            name="difficulty_level"
                            value={formData.difficulty_level}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="classroom_info" className="block text-sm font-medium text-gray-700">Classroom Info</label>
                    <textarea
                        id="classroom_info"
                        name="classroom_info"
                        value={formData.classroom_info}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="map_location" className="block text-sm font-medium text-gray-700">Map Location</label>
                    <input
                        id="map_location"
                        name="map_location"
                        type="text"
                        value={formData.map_location}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                    <input
                        id="photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full"
                    />
                    {imagePreview && (
                        <div className="mt-2">
                            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${
                            loading ? 'bg-gray-500' : 'bg-indigo-600'
                        } text-white px-6 py-2 rounded-md`}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateWorkshop;
