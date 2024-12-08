import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface WorkshopFormData {
    title: string;
    description: string;
    difficulty_level: string;
    price: number;
    classroom_info: string;
    address: string;
    map_location: string;
    photo: File | null;
    instructor_id: string;
    category: string;
    newCategory?: string; // New category field
}

const AddWorkshop: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<WorkshopFormData>({
        title: "",
        description: "",
        difficulty_level: "beginner",
        price: 0,
        classroom_info: "",
        address: "",
        map_location: "",
        photo: null,
        instructor_id: "",
        category: "",
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [instructors, setInstructors] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isNewCategory, setIsNewCategory] = useState(false); // New state for toggling category creation

    // Fetch instructors
    useEffect(() => {
        const fetchInstructors = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/instructors");
                setInstructors(response.data);
            } catch (error) {
                console.error("Error fetching instructors:", error);
                toast.error("Failed to fetch instructors.");
            } finally {
                setLoading(false);
            }
        };

        fetchInstructors();
    }, []);

    // Fetch workshop categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:5000/api/workshop-categories");
                console.log(response.data);  // Check the response here
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            } finally {
                setLoading(false);
            }
        };


        fetchCategories();
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, photo: file });
            setImagePreview(URL.createObjectURL(file)); // Display preview
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setFormData({ ...formData, category: selectedCategory });
        setIsNewCategory(selectedCategory === "create-new"); // Show input field if "Create New Category" is selected
    };

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
        formDataObj.append("category", formData.category); // Add selected category
        if (formData.photo) {
            formDataObj.append("photo", formData.photo);
        }
        if (isNewCategory && formData.newCategory) {
            formDataObj.append("newCategory", formData.newCategory); // Add new category if applicable
        }

        try {
            await axios.post("http://localhost:5000/api/workshops/save", formDataObj, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Workshop added successfully!");
            navigate("/admin/workshops");
        } catch (error) {
            console.error("Error adding workshop:", error);
            toast.error("Failed to add workshop.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)} // Navigate back
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    &#8592; Back
                </button>
                <h1 className="text-3xl font-semibold">Add Workshop</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
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
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Difficulty Level */}
                <div>
                    <label htmlFor="difficulty_level" className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                    <select
                        id="difficulty_level"
                        name="difficulty_level"
                        value={formData.difficulty_level}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
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
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                {/* Classroom Info */}
                <div>
                    <label htmlFor="classroom_info" className="block text-sm font-medium text-gray-700">Classroom Info</label>
                    <input
                        id="classroom_info"
                        name="classroom_info"
                        type="text"
                        value={formData.classroom_info}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Map Location */}
                <div>
                    <label htmlFor="map_location" className="block text-sm font-medium text-gray-700">Map Location</label>
                    <input
                        id="map_location"
                        name="map_location"
                        type="text"
                        value={formData.map_location}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
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
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-4 w-full h-60 object-cover rounded-md"
                        />
                    )}
                </div>

                {/* Instructor */}
                <div>
                    <label htmlFor="instructor_id" className="block text-sm font-medium text-gray-700">Instructor</label>
                    <select
                        id="instructor_id"
                        name="instructor_id"
                        value={formData.instructor_id}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select an instructor</option>
                        {instructors.map((instructor) => (
                            <option key={instructor._id} value={instructor._id}>
                                {instructor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleCategoryChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                        <option value="create-new">Create New Category</option> {/* Always last */}
                    </select>

                    {isNewCategory && (
                        <div className="mt-4">
                            <label htmlFor="newCategory" className="block text-sm font-medium text-gray-700">New Category Name</label>
                            <input
                                id="newCategory"
                                name="newCategory"
                                type="text"
                                value={formData.newCategory || ""}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        {loading ? "Adding..." : "Add Workshop"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddWorkshop;
