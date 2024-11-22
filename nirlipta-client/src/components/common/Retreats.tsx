import React, { useState } from "react";
import { dummyRetreats } from "../../backend/data/dummyRetreats";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";

const Retreats: React.FC = () => {
    const [currentRetreatIndex, setCurrentRetreatIndex] = useState(0);
    const currentRetreat = dummyRetreats[currentRetreatIndex];
    const totalRetreats = dummyRetreats.length;

    const goToNextRetreat = () => {
        if (currentRetreatIndex < totalRetreats - 1) {
            setCurrentRetreatIndex(currentRetreatIndex + 1);
        }
    };

    const goToPreviousRetreat = () => {
        if (currentRetreatIndex > 0) {
            setCurrentRetreatIndex(currentRetreatIndex - 1);
        }
    };

    return (
        <div className="retreats-page max-w-screen-xl mx-auto flex flex-col items-center p-6">
            <div className="flex flex-wrap lg:flex-nowrap w-full gap-6">

                {/* Left Section */}
                <div className="left-section lg:w-3/5 flex flex-col h-screen sticky top-0 space-y-6">
                    {/* Main Image */}
                    <div className="main-image w-full h-[600px]">
                        <img
                            src={currentRetreat.photos[0]}
                            alt={`${currentRetreat.title}`}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Smaller Images */}
                    <div className="small-images flex gap-4">
                        <img
                            src={currentRetreat.photos?.[1] || ""}
                            alt={currentRetreat.title || "Retreat Image"}
                            className="max-h-[200px] max-w-full object-contain"
                        />
                        <img
                            src={currentRetreat.photos?.[2] || ""}
                            alt={currentRetreat.title || "Retreat Image"}
                            className="max-h-[200px] max-w-full object-contain"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="right-section lg:w-2/5 p-8 flex flex-col h-screen sticky top-0 overflow-y-auto justify-between space-y-8">
                    {/* Retreat Details */}
                    <div>
                        <h3 className="retreat-title font-bold text-2xl text-gray-800">{currentRetreat.title}</h3>
                        <p className="retreat-description text-gray-600 text-base mt-2">{currentRetreat.description}</p>

                        {/* Organizer */}
                        <p className="text-gray-600 text-base mt-4">
                            <span className="font-semibold">Organizer:</span> {currentRetreat.organizer}
                        </p>

                        {/* Guests */}
                        <div className="guests mt-4">
                            <span className="font-semibold text-gray-800">Guests:</span>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                {currentRetreat.guests.map((guest, index) => (
                                    <li key={index}>{guest}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Featuring Events */}
                        <div className="featuring-events mt-4">
                            <span className="font-semibold text-gray-800">Featuring Events:</span>
                            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                                {currentRetreat.featuringEvents.map((event, index) => (
                                    <li key={index}>{event}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Price */}
                        <p className="price text-gray-800 font-bold text-base mt-4">
                            <span className="font-semibold">Price:</span>
                            {currentRetreat.price === 0 ? "Free" : `Rs ${currentRetreat.price}`}
                        </p>

                        {/* Contact and Social Links */}
                        <div className="contact-social mt-4">
                            <p className="contact text-gray-600 text-base">
                                <span className="font-semibold">Contact:</span> {currentRetreat.eventContactNumber}
                            </p>
                            <a
                                href={currentRetreat.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link text-sm text-[#9B6763] hover:underline mt-2 block"
                            >
                                Social Link
                            </a>
                        </div>
                    </div>


                    {/* Book Now Button */}
                    <button className="book-now-btn mt-6 px-6 py-2 bg-[#9B6763] text-white font-semibold rounded-lg">
                        Book Now
                    </button>
                </div>
            </div>
            {/* Pagination Controls */}
            <div className="pagination-controls flex justify-between items-center mt-8 space-x-4">
                <Button
                    onClick={goToPreviousRetreat}
                    disabled={currentRetreatIndex === 0}
                    className="px-4 py-2 text-sm"
                >
                    &lt; Previous
                </Button>
                <p className="text-gray-600 text-sm">
                    {currentRetreatIndex + 1} / {totalRetreats}
                </p>
                <Button
                    onClick={goToNextRetreat}
                    disabled={currentRetreatIndex === totalRetreats - 1}
                    className="px-4 py-2 text-sm"
                >
                    Next &gt;
                </Button>
            </div>
        </div>
    );
};



export default Retreats;
