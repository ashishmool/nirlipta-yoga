import React, { useState, useEffect } from "react";
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
    newCategory?: string;
    modules: { name: string; duration: string }[];
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
        modules: [{ name: "", duration: "" }],
    });
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [instructors, setInstructors] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isNewCategory, setIsNewCategory] = useState(false);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/instructors");
                setInstructors(response.data);
            } catch (error) {
                console.error("Error fetching instructors:", error);
                toast.error("Failed to fetch instructors.");
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/workshop-categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            }
        };

        fetchInstructors();
        fetchCategories();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData({ ...formData, photo: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value;
        setFormData({ ...formData, category: selectedCategory });
        setIsNewCategory(selectedCategory === "create-new");
    };

    const handleModuleChange = (index: number, field: string, value: string) => {
        const updatedModules = [...formData.modules];
        updatedModules[index][field] = value;
        setFormData({ ...formData, modules: updatedModules });
    };

    const addModule = () => {
        setFormData({ ...formData, modules: [...formData.modules, { name: "", duration: "" }] });
    };

    const removeModule = (index: number) => {
        const updatedModules = formData.modules.filter((_, i) => i !== index);
        setFormData({ ...formData, modules: updatedModules });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formDataObj = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "modules") {
                value.forEach((module: any, index: number) => {
                    formDataObj.append(`modules[${index}][name]`, module.name);
                    formDataObj.append(`modules[${index}][duration]`, module.duration);
                });
            } else if (key === "photo" && value) {
                formDataObj.append("photo", value as Blob);
            } else if (value) {
                formDataObj.append(key, value as string);
            }
        });

        try {
            console.log("Payload Data:::",formData);
            console.log("Form Data:::",formDataObj);
            const response = await axios.post("http://localhost:5000/api/workshops/save", formDataObj, {
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
                <button onClick={() => navigate(-1)} className="text-indigo-600 hover:text-indigo-700">
                    &#8592; Back
                </button>
                <h1 className="text-3xl font-semibold">Add New Workshop</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title and Category in the same line */}
                <div className="flex space-x-6">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                            <option value="create-new">Create New Category</option>
                        </select>
                    </div>
                </div>

                {/* Difficulty Level, Price, and Address in the same line */}
                <div className="flex space-x-6">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                </div>

                {/* Classroom Info and Map Location in the same line */}
                <div className="flex space-x-6">
                    <div className="flex-1">
                        <label htmlFor="classroom_info" className="block text-sm font-medium text-gray-700">Classroom Info</label>
                        <textarea
                            id="classroom_info"
                            name="classroom_info"
                            value={formData.classroom_info}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="flex-1">
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



                {/* Description */}
                <div>
                    <div className="flex-1">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                {/* Modules Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Modules</h2>
                    {formData.modules.map((module, index) => (
                        <div key={index} className="flex space-x-4 items-center mb-4">
                            <input
                                type="text"
                                placeholder="Module Name"
                                value={module.name}
                                onChange={(e) => handleModuleChange(index, "name", e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Duration (e.g., 2 hours)"
                                value={module.duration}
                                onChange={(e) => handleModuleChange(index, "duration", e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => removeModule(index)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addModule}
                        className="text-indigo-600 hover:text-indigo-700"
                    >
                        + Add Module
                    </button>
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
                        className="mt-1 block w-full"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-4 w-full h-60 object-cover rounded-md"
                        />
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