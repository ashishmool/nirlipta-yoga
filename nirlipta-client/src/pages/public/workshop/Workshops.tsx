import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../../components/ui/button.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { dummyWorkshops } from "../../../backend/data/dummyWorkshops.ts";

interface Course {
    photos: string[];
    code: string;
    name: string;
    categories: string[];
    price: number;
    discountPrice?: number;
    categoryId: number;
    duration: string;
}

interface Category {
    id: number;
    name: string;
    label: string;
}

const categories: Category[] = [
    { id: 1, name: "Yoga Basics", label: "Yoga Basics" },
    { id: 2, name: "Advanced Yoga", label: "Advanced Asanas" },
    { id: 3, name: "Meditation", label: "Mindfulness Meditation" },
];

const Workshops: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const coursesPerPage = 3;

    // Filtered courses based on the selected category
    const filteredCourses = selectedCategoryId
        ? dummyWorkshops.filter(course => course.categoryId === selectedCategoryId)
        : dummyWorkshops;

    // Total number of pages based on the filtered courses
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    // Get the current set of courses to display
    const currentCourses = filteredCourses.slice(
        (currentPage - 1) * coursesPerPage,
        currentPage * coursesPerPage
    );

    // Update the page number
    const goToPage = (page: number) => setCurrentPage(page);
    const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    // Handle category selection and reset page to 1
    const handleCategorySelection = (categoryId: number | null) => {
        setSelectedCategoryId(categoryId);
        setCurrentPage(1); // Reset to page 1 whenever the category changes
    };

    return (

        <div className="online-courses-page flex flex-col sm:flex-row gap-8 mb-8 mt-10">
            {/* Sidebar */}
            <div className="sidebar p-6 rounded-lg w-full sm:w-1/4 relative mt-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Workshops</h2>
                <p className="text-gray-600 mb-6">by Category</p>
                <ScrollArea className="w-full h-120">
                    <ul className="space-y-6">
                        {categories.map((category) => (
                            <li key={category.id} className="category">
                                <Link
                                    to="#"
                                    className={`flex items-center space-x-2 text-gray-700 hover:text-[#9B6763] transition-all ${
                                        selectedCategoryId === category.id ? "text-[#9B6763]" : ""
                                    }`}
                                    onClick={() => handleCategorySelection(category.id)}
                                >
                                    <span className="font-semibold">{category.label}</span>
                                </Link>
                            </li>
                        ))}
                        {/* Reset Filters */}
                        <li className="category">
                            <Link
                                to="#"
                                className="flex items-center space-x-2 text-[#9B6763] hover:text-gray-500 transition-all text-sm"
                                onClick={() => handleCategorySelection(null)}
                            >
                                <span className="font-semibold">Reset Filters</span>
                            </Link>
                        </li>
                    </ul>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>



            {/* Course List */}
            <div className="course-list w-full sm:w-3/4">
                {filteredCourses.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">No courses found</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCourses.map((course, index) => (
                                <div key={index} className="course-card bg-white p-6 rounded-lg shadow-lg relative">
                                    <Badge className="absolute z-10 text-white rounded-none mt-8" style={{ backgroundColor: "#A38F85" }}>
                                        {categories.find(cat => cat.id === course.categoryId)?.label || "Unknown"}
                                    </Badge>
                                    <Carousel>
                                        <CarouselContent>
                                            {course.photos.slice(0, 3).map((photo, index) => (
                                                <CarouselItem key={index}>
                                                    <img src={photo} alt={course.name} className="object-cover h-full w-full rounded-lg" />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                    <h3 className="course-name font-semibold text-lg text-gray-800 mt-4">{course.name}</h3>
                                    <p className="course-duration text-gray-500 text-sm mt-2">Duration: {course.duration}</p>
                                    <p className="price mt-4 flex items-center">
                                        {course.discountPrice ? (
                                            <>
                                                <span className="original-price line-through text-gray-500 mr-2">Rs {course.price}</span>
                                                <span className="discount-price font-bold" style={{ color: "#9B6763" }}>Rs {course.discountPrice}</span>
                                            </>
                                        ) : (
                                            <span className="text-gray-800 font-bold">Rs {course.price}</span>
                                        )}
                                    </p>
                                    <Button className="enroll-btn mt-4 bg-black text-white px-4 py-2">Enroll Now</Button>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <div className="pagination-container mt-6">
                            <div className="pagination-controls flex justify-center space-x-2">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className={`text-sm ${
                                        currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black hover:text-blue-600"
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
                                        currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-black hover:text-blue-600"
                                    }`}
                                >
                                    &gt;
                                </button>
                            </div>
                            <div className="text-sm text-gray-600 mt-2 text-center">
                                Page <span className="font-semibold text-gray-900">{currentPage}</span> of{" "}
                                <span className="font-semibold text-gray-900">{totalPages}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Workshops;
