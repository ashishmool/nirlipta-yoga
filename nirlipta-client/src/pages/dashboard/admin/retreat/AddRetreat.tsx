import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRetreat: React.FC = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        price_per_person: 0,
        max_participants: 0,
        address: "",
        map_location: "",
        meals_info: "",
        organizer: "",
        featuring_events: "",
        accommodation_id: null, // Accommodation ID
        instructor_id: null, // Instructor ID
        guests: [] as { name: string; photo: File | null }[], // Guest info and their photo
    });

    const [loading, setLoading] = useState(false);
    const [accommodations, setAccommodations] = useState([]);
    const [instructors, setInstructors] = useState([]);

    // Fetch accommodations and instructors on component mount
    useEffect(() => {
        const fetchAccommodations = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/accommodations");
                setAccommodations(response.data || []);
            } catch (error) {
                console.error("Error fetching accommodations:", error);
            }
        };

        const fetchInstructors = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/instructors");
                setInstructors(response.data || []);
            } catch (error) {
                console.error("Error fetching instructors:", error);
            }
        };

        fetchAccommodations();
        fetchInstructors();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || null });
    };

    const handleGuestChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newGuests = [...formData.guests];
        newGuests[index] = { ...newGuests[index], [name]: value };
        setFormData({ ...formData, guests: newGuests });
    };

    const handleGuestImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newGuests = [...formData.guests];
        const file = e.target.files ? e.target.files[0] : null;
        newGuests[index] = { ...newGuests[index], photo: file };
        setFormData({ ...formData, guests: newGuests });
    };

    const addGuest = () => {
        setFormData({ ...formData, guests: [...formData.guests, { name: "", photo: null }] });
    };

    const removeGuest = (index: number) => {
        const newGuests = formData.guests.filter((_, i) => i !== index);
        setFormData({ ...formData, guests: newGuests });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formPayload = new FormData();
        formPayload.append("title", formData.title);
        formPayload.append("description", formData.description);
        formPayload.append("start_date", formData.start_date);
        formPayload.append("end_date", formData.end_date);
        formPayload.append("price_per_person", formData.price_per_person.toString());
        formPayload.append("max_participants", formData.max_participants.toString());
        formPayload.append("address", formData.address);
        formPayload.append("map_location", formData.map_location);

        formPayload.append("meals_info", JSON.stringify(formData.meals_info.split(",").map((meal) => meal.trim())));
        formPayload.append("featuring_events", JSON.stringify(formData.featuring_events.split(",").map((event) => event.trim())));

        formPayload.append("organizer", formData.organizer);

        if (formData.accommodation_id) {
            formPayload.append("accommodation_id", formData.accommodation_id);
        }
        if (formData.instructor_id) {
            formPayload.append("instructor_id", formData.instructor_id);
        }

        // Append guest names and photos
        formData.guests.forEach((guest, index) => {
            formPayload.append(`guest[${index}][name]`, guest.name);
            if (guest.photo) {
                formPayload.append(`guest[${index}][photo]`, guest.photo);
            }
        });

        try {
            console.log("Form Payload",formPayload);
            console.log("Form Data",formData);
            const response = await axios.post("http://localhost:5000/api/retreats/save", formPayload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Retreat added successfully:", response.data);
        } catch (error) {
            console.error("Error adding retreat:", error);
            alert("Failed to add retreat. Please check the server logs for more details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Add New Retreat</h1>
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

                {/* Start Date and End Date in Same Row */}
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                            id="start_date"
                            name="start_date"
                            type="date"
                            value={formData.start_date}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                            id="end_date"
                            name="end_date"
                            type="date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                {/* Price and Max Participants in Same Row */}
                <div className="flex space-x-4">
                    <div className="w-1/2">
                        <label htmlFor="price_per_person" className="block text-sm font-medium text-gray-700">Price Per Person</label>
                        <input
                            id="price_per_person"
                            name="price_per_person"
                            type="number"
                            value={formData.price_per_person}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="max_participants" className="block text-sm font-medium text-gray-700">Max Participants</label>
                        <input
                            id="max_participants"
                            name="max_participants"
                            type="number"
                            value={formData.max_participants}
                            onChange={handleChange}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                </div>

                {/* Meals Info */}
                <div>
                    <label htmlFor="meals_info" className="block text-sm font-medium text-gray-700">Meals Info</label>
                    <textarea
                        id="meals_info"
                        name="meals_info"
                        value={formData.meals_info}
                        onChange={handleChange}
                        placeholder="Comma separated list of meal options (e.g., Vegetarian, Vegan)"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Organizer */}
                <div>
                    <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Organizer</label>
                    <input
                        id="organizer"
                        name="organizer"
                        type="text"
                        value={formData.organizer}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Featuring Events */}
                <div>
                    <label htmlFor="featuring_events" className="block text-sm font-medium text-gray-700">Featuring Events</label>
                    <textarea
                        id="featuring_events"
                        name="featuring_events"
                        value={formData.featuring_events}
                        onChange={handleChange}
                        placeholder="Comma separated list of events (e.g., Kirtan Night, Yoga Classes)"
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Accommodation */}
                <div>
                    <label htmlFor="accommodation_id" className="block text-sm font-medium text-gray-700">Accommodation</label>
                    <select
                        id="accommodation_id"
                        name="accommodation_id"
                        value={formData.accommodation_id || ""}
                        onChange={handleSelectChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Accommodation</option>
                        {accommodations.map((acc: any) => (
                            <option key={acc._id} value={acc._id}>{acc.name}</option>
                        ))}
                    </select>
                </div>

                {/* Instructor */}
                <div>
                    <label htmlFor="instructor_id" className="block text-sm font-medium text-gray-700">Instructor</label>
                    <select
                        id="instructor_id"
                        name="instructor_id"
                        value={formData.instructor_id || ""}
                        onChange={handleSelectChange}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Instructor</option>
                        {instructors.map((inst: any) => (
                            <option key={inst._id} value={inst._id}>{inst.name}</option>
                        ))}
                    </select>
                </div>

                {/* Guests Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Guests</label>
                    {formData.guests.map((guest, index) => (
                        <div key={index} className="flex items-center space-x-4 mb-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Guest Name"
                                value={guest.name}
                                onChange={(e) => handleGuestChange(index, e)}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="file"
                                name="image"
                                onChange={(e) => handleGuestImageChange(index, e)}
                                className="mt-1 block p-3 border border-gray-300 rounded-md shadow-sm"
                            />
                            <button
                                type="button"
                                onClick={() => removeGuest(index)}
                                className="bg-red-500 text-white p-2 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addGuest}
                        className="bg-green-500 text-white p-2 rounded-md"
                    >
                        Add Guest
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-4 rounded-md disabled:bg-gray-400"
                    >
                        {loading ? "Saving..." : "Save Retreat"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRetreat;
