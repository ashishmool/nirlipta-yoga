import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaBars, FaTimes, FaGithub, FaInstagram } from "react-icons/fa"; // Imported social icons
import { CgLogOut } from "react-icons/cg";
import Login from "@/components/auth/Login.tsx";
import Logo from "/images/logo-main.svg";

export default function MainNav() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Track scroll state

    // Check if the user is logged in by checking localStorage or session
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedin(true);
        }
    }, []);

    // Handle scroll event to monitor scroll position
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Change bg color after scrolling down 50px
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedin(false);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);
    };

    return (
        <div className="fixed min-w-full z-50">
            {/* Navbar */}
            <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="mr-3 w-1/8">
                        <img src={Logo} className="w-24 h-auto" alt="Nirlipta Yoga" />
                    </Link>

                    {/* Hamburger Icon */}
                    <button
                        className="lg:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Main Navigation */}
                    <div className={`lg:flex lg:items-center ${isMobileMenuOpen ? "block" : "hidden"} w-5/8`}>
                        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                            {/* Navigation Links */}
                            <Link to="/workshops" className="text-gray-800 hover:text-[#9B6763] text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                Workshops
                            </Link>
                            <Link to="/retreats" className="text-gray-800 hover:text-[#9B6763] text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                Retreats
                            </Link>
                            <Link to="/about" className="text-gray-800 hover:text-[#9B6763] text-base font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                                About Nirlipta
                            </Link>
                        </div>
                    </div>


                    {/* Social Icons Section */}
                    <div className="flex space-x-6 items-center">
                        <a href="https://github.com/nirlipta" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://instagram.com/nirlipta" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-500">
                            <FaInstagram size={24} />
                        </a>
                    </div>

                    {/* Login/Logout Button */}
                    <div className="mt-4 lg:mt-0 w-2/8">
                        {isLoggedin ? (
                            <Button variant="outline" onClick={handleLogout} className="text-red-500 text-base font-sm">
                                <CgLogOut className="mr-2" />
                                Log Out
                            </Button>
                        ) : (
                            <Button onClick={() => setIsDialogOpen(true)} className="bg-[#9B6763] text-sm">
                                Login
                            </Button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Login Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <Login onClose={() => setIsDialogOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
