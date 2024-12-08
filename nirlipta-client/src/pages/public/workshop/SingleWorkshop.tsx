import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button.tsx";
import axios from "axios";

interface Workshop {
    _id: string;
    title: string;
    description: string;
    difficulty_level: string;
    price: number;
    classroom_info: string;
    address: string;
    map_location: string;
    photo: string;
    instructor_id: string;
}

const SingleWorkshop: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the workshop ID from the URL
    const navigate = useNavigate();
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch workshop details
    useEffect(() => {
        const fetchWorkshop = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/workshops/${id}`);
                setWorkshop(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load workshop details.");
                setLoading(false);
            }
        };

        fetchWorkshop();
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-[#9B6763] hover:underline text-sm"
            >
                &larr; Back to Workshops
            </button>

            {/* Workshop Details */}
            {workshop && (
                <>
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Workshop Image */}
                        <div className="w-full md:w-1/2">
                            <img
                                src={workshop.photo}
                                alt={workshop.title}
                                className="object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Workshop Information */}
                        <div className="w-full md:w-1/2">
                            <h1 className="text-2xl font-bold text-gray-800">{workshop.title}</h1>
                            <p className="text-gray-600 mt-2">{workshop.description}</p>

                            <div className="mt-4">
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Difficulty Level: </span>
                                    {workshop.difficulty_level}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Classroom Info: </span>
                                    {workshop.classroom_info || "N/A"}
                                </p>
                                <p className="text-sm text-gray-500">
                                    <span className="font-bold">Address: </span>
                                    {workshop.address || "N/A"}
                                </p>
                            </div>

                            <div className="mt-4">
                                <p className="text-lg font-bold text-gray-800">
                                    Price: <span className="text-[#9B6763]">Rs {workshop.price}</span>
                                </p>
                            </div>

                            {/* Enroll Button */}
                            <Button className="mt-6 bg-[#9B6763] text-white w-full">
                                Enroll Now
                            </Button>
                        </div>
                    </div>

                    {/* Map Section */}
                    {workshop.map_location && (
                        <div className="mt-8">
                            <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                            <iframe
                                src={workshop.map_location}
                                className="w-full h-64 rounded-lg mt-4"
                                title="Workshop Location"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SingleWorkshop;
