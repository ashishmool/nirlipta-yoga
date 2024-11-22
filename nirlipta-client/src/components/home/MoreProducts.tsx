import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI Components
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { LoadingScreen } from "../ui/loading";

// Dummy Data
import { dummyProducts } from "@/backend/data/dummyData";

function MoreProducts() {
    const [loadingScreen, setLoadingScreen] = useState(true);
    const [allProduct, setAllProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Scroll top when clicking on "View Product"
    const scrollTopFunc = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Load dummy products on component mount
    useEffect(() => {
        setAllProduct(dummyProducts); // Set the dummy products directly
        setTimeout(() => setLoadingScreen(false), 1000); // Simulate loading delay
    }, []);

    // Calculate total pages based on the number of products and products per page
    const totalPages = Math.ceil(allProduct.length / productsPerPage);

    // Get the products for the current page
    const currentProducts = allProduct.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    // Handle page navigation
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            {/* Header section */}
            <div className="sm:container sm:text-left text-center mt-12 mb-6">
                <h2 className="text-2xl font-bold">Discover More Treasures</h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Explore our exquisite range of premium jewelry, each crafted to captivate and enchant.
                </p>
            </div>

            <ScrollArea className="w-full whitespace-nowrap sm:p-0 p-3">
                {/* Jewelry section */}
                <div className="flex flex-wrap justify-evenly my-6">
                    {loadingScreen ? (
                        <LoadingScreen />
                    ) : (
                        currentProducts.map((item) => (
                            <div key={item.$id} className="sm:w-[280px] sm:h-[280px] w-[85%] sm:mb-32 mb-10 capitalize product-card">
                                <Badge className="absolute z-10 bg-stone-900 hover:bg-stone-900 text-white rounded-none">
                                    By {item.store?.name || "Unknown Store"}
                                </Badge>

                                {/* Preview Images */}
                                <Link to={`/jewelleries/${item.$id}`}>
                                    <Carousel className="hover:cursor-w-resize">
                                        <CarouselContent>
                                            {item.photos?.slice(0, 3).map((photo, index) => (
                                                <CarouselItem key={index}>
                                                    <img src={photo} alt={item.title} className="object-cover h-full w-full rounded-lg" />
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                    </Carousel>
                                </Link>

                                {/* Card Details */}
                                <div className="details my-1">
                                    <Link to={`/jewelleries/${item.$id}`}>
                                        <h6 className="font-semibold">
                                            {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
                                        </h6>
                                        <p className="text-sm">
                                            Available sizes: {item.size?.join(", ") || "N/A"}
                                        </p>
                                    </Link>

                                    <div className="flex items-center py-1 w-full">
                                        <div className="font-bold mr-2 text-lg">
                                            <span>${item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full">
                                            <Link to={`/jewelleries/${item.$id}`}>
                                                <Button className="float-right" onClick={scrollTopFunc}>
                                                    View Product
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4">
                <Button onClick={goToPreviousPage} disabled={currentPage === 1} className="mr-2">
                    Previous
                </Button>
                <span className="text-lg font-semibold">
                    Page {currentPage} of {totalPages}
                </span>
                <Button onClick={goToNextPage} disabled={currentPage === totalPages} className="ml-2">
                    Next
                </Button>
            </div>
        </div>
    );
}

export default MoreProducts;
