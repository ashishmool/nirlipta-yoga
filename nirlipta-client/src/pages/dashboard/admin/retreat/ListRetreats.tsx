import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { FaCirclePlus } from "react-icons/fa6";

const ListRetreats: React.FC = () => {
    const [retreats, setRetreats] = useState<any[]>([]);
    const [filteredRetreats, setFilteredRetreats] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Fetch retreats on component mount
    useEffect(() => {
        const fetchRetreats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/retreats");
                setRetreats(response.data || []);
                setFilteredRetreats(response.data || []);
                setTotalPages(Math.ceil((response.data.length || 1) / 5)); // Set total pages for pagination
            } catch (error) {
                console.error("Error fetching retreats:", error);
            }
        };

        fetchRetreats();
    }, []);

    // Search functionality
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter retreats based on query in any column
        const filtered = retreats.filter((retreat) =>
            Object.values(retreat)
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        setFilteredRetreats(filtered);
        setCurrentPage(1); // Reset to first page after search
        setTotalPages(Math.ceil(filtered.length / 5)); // Update total pages after filter
    };

    // Pagination: calculate the retreats to display based on the current page
    const getPaginatedRetreats = () => {
        const startIndex = (currentPage - 1) * 5;
        const endIndex = startIndex + 5;
        return filteredRetreats.slice(startIndex, endIndex);
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this retreat?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/retreats/delete/${id}`);
                alert("Retreat deleted successfully!");
                // Re-fetch the retreats after deletion
                const response = await axios.get("http://localhost:5000/api/retreats");
                setRetreats(response.data);
                setFilteredRetreats(response.data);
                setTotalPages(Math.ceil(response.data.length / 5)); // Update total pages after delete
            } catch (error) {
                console.error("Error deleting retreat:", error);
            }
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center mb-6">Retreats</h1>

            {/* Add Retreat Button */}
            <div className="mb-4 flex items-center justify-between">
                <Link to="add"> {/* Use relative path here */}
                    <button className="flex items-center bg-green-500 text-white p-2 rounded-md">
                        <FaCirclePlus className="h-5 w-5 mr-2" />
                        Add Retreat
                    </button>
                </Link>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search retreats"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="p-3 w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Retreats Table */}
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="px-6 py-3 border-b">Title</th>
                    <th className="px-6 py-3 border-b">Description</th>
                    <th className="px-6 py-3 border-b">Start Date</th>
                    <th className="px-6 py-3 border-b">End Date</th>
                    <th className="px-6 py-3 border-b">Price</th>
                    <th className="px-6 py-3 border-b">Max Participants</th>
                    <th className="px-6 py-3 border-b">Action</th>
                </tr>
                </thead>
                <tbody>
                {getPaginatedRetreats().map((retreat: any) => (
                    <tr key={retreat._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b">{retreat.title}</td>
                        <td className="px-6 py-4 border-b">{retreat.description}</td>
                        <td className="px-6 py-4 border-b">{retreat.start_date}</td>
                        <td className="px-6 py-4 border-b">{retreat.end_date}</td>
                        <td className="px-6 py-4 border-b">{retreat.price_per_person}</td>
                        <td className="px-6 py-4 border-b">{retreat.max_participants}</td>
                        <td className="px-6 py-4 border-b text-center">
                            {/* Edit Button now navigates to UpdateRetreat */}
                            <button
                                onClick={() => navigate(`/admin/retreats/update/${retreat._id}`)} // Add /admin/ here to match your desired URL
                                className="bg-blue-500 text-white p-2 rounded-md mr-2"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(retreat._id)}
                                className="bg-red-500 text-white p-2 rounded-md"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                >
                    Prev
                </button>
                <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ListRetreats;
