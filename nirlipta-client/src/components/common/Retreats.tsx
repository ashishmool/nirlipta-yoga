import React, { useState } from "react";
import { dummyRetreats } from "../../backend/data/dummyRetreats";
import { Button } from "../ui/button";

const Retreats: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = dummyRetreats.length;

    const currentRetreat = dummyRetreats[currentPage - 1]; // Page number maps to index

    // Pagination Logic
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="retreats-page max-w-screen-xl mx-auto flex flex-col items-center p-6">
            <div className="flex flex-wrap lg:flex-nowrap w-full gap-6">
                {/* Left Section */}
                <div className="left-section lg:w-3/5 flex flex-col h-screen sticky top-0 space-y-6 relative">
                    {/* Main Image */}
                    <div className="main-image w-full h-[600px] relative">
                        <img
                            src={currentRetreat.photos[0]}
                            alt={`${currentRetreat.title}`}
                            className="object-cover w-full h-full"
                        />
                        {/* Pagination Section */}
                        <div className="pagination-container absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                            <div className="pagination-controls bg-white shadow-md rounded-lg px-4 py-2 flex items-center space-x-2">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className={`text-sm ${
                                        currentPage === 1
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-black hover:text-blue-600"
                                    }`}
                                >
                                    &lt;
                                </button>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        className={`px-3 py-1 rounded-2xl text-sm ${
                                            currentPage === index + 1
                                                ? "bg-black text-white font-bold"
                                                : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`text-sm ${
                                        currentPage === totalPages
                                            ? "text-gray-400 cursor-not-allowed"
                                            : "text-black hover:text-blue-600"
                                    }`}
                                >
                                    &gt;
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 mt-2">
                                Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                                <span className="font-semibold text-gray-900">{totalPages}</span>
                            </div>
                        </div>

                        {/* Price and Actions Overlapping */}
                        <div className="price-and-actions absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-gray-50 rounded-lg shadow-lg p-6 w-4/5 grid grid-cols-4 gap-4">
                            {/* Price (1st column, 1/4 width) */}
                            <p className="price text-gray-800 font-bold text-md flex justify-center items-center col-span-1">
                                <span className="font-semibold">Price:</span>{" "}
                                {currentRetreat.price === 0 ? "Free" : `Rs ${currentRetreat.price}`}
                            </p>

                            {/* Single Rooms (2nd column, 2/4 width) */}
                            <p className="single-rooms text-gray-800 text-sm flex justify-center items-center col-span-2">
                                <span className="font-semibold">Single Room:</span>{" "}
                                {currentRetreat.SingleRoomsQuantity > 0 ? "Available" : "Fully Booked"}
                            </p>

                            {/* Seats Left (3rd column, 1/4 width) */}
                            <p className="seats-left text-gray-800 text-sm flex justify-center items-center col-span-1">
                                <span className="font-semibold">Seats Left:</span> {currentRetreat.MaxParticipants}
                            </p>
                        </div>
                        {/* Book Now Button */}
                        <div className="book-now-container absolute left-1/2 bottom-[-9%] transform -translate-x-1/2 z-20">
                            <Button className="book-now-btn bg-[#9B6763] text-white font-semibold py-2 px-6 rounded-lg">
                                Book Now
                            </Button>
                        </div>


                    </div>
                </div>

                {/* Right Section */}

                <div className="right-section lg:w-2/5 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto justify-between">
                    {/* Retreat Details */}
                    <div className="retreat-details space-y-6">
                        <h3 className="retreat-title font-bold text-2xl text-gray-800">{currentRetreat.title}</h3>
                        <p className="retreat-description text-gray-600 text-base">{currentRetreat.description}</p>

                        {/* Organizer */}
                        <p className="text-gray-600 text-base">
                            <span className="font-semibold">Organizer:</span> {currentRetreat.organizer}
                        </p>

                        {/* Guests */}
                        <div className="guests">
                            <span className="font-semibold text-gray-800">Guests:</span>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                {currentRetreat.guests.map((guest, index) => (
                                    <li key={index}>{guest}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Featuring Events */}
                        <div className="featuring-events">
                            <span className="font-semibold text-gray-800">Featuring Events:</span>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                {currentRetreat.featuringEvents.map((event, index) => (
                                    <li key={index}>{event}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Meal Options */}
                        <div className="meal-options">
                            <span className="font-semibold text-gray-800">Meal Options:</span>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                {currentRetreat.MealOptions.map((option, index) => (
                                    <li key={index}>{option}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <p className="contact text-gray-600 text-base flex">
                            <span className="font-semibold">Contact:</span> {currentRetreat.eventContactNumber}
                        </p>

                        {/* Social Link */}
                        <a
                            href={currentRetreat.socialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link text-sm text-[#9B6763] hover:underline flex mt-4"
                        >
                            Click for More Info!
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Retreats;
