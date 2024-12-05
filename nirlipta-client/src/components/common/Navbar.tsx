import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import Auth from '@/components/auth/Auth';
import Loading from '../ui/loading';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// ICONS
import { CiSearch } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { CgLogOut } from "react-icons/cg";

// SESSION CHECK FUNCTION
import { checkSession } from "../../backend/services/auth/checkSession";

export default function Navbar() {
    const [isLoggedin, setIsLoggedin] = useState(false); // Login state
    const [logoutSpinner, setLogoutSpinner] = useState(false);
    const [userMetaData, setUserMetaData] = useState({ name: "User" }); // Replace with actual user data
    const [userExtraMetaDetails, setUserExtraMetaDetails] = useState({ avatar: "/path/to/avatar" }); // Replace with actual user avatar
    const [isScrolled, setIsScrolled] = useState(false); // For scroll detection
    const [isVerified, setIsVerified] = useState(true); // Assuming the user is verified for now

    // Check session on component mount
    useEffect(() => {
        async function validateSession() {
            const isValid = await checkSession();
            setIsLoggedin(isValid);
        }
        validateSession();
    }, []);

    // Handle scroll behavior for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Set to true when scrolled down 50px or more
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle logout functionality
    const handleLogout = () => {
        setLogoutSpinner(true); // Show the loading spinner
        localStorage.removeItem("token"); // Clear token
        setIsLoggedin(false); // Update login state
        setLogoutSpinner(false); // Hide the loading spinner
    };

    // Handle scroll to top behavior
    const scrollTopFunc = () => window.scrollTo(0, 0);

    return (
        <div className="md:container container-fluid fixed min-w-full z-50">
            {/* Verify Alert */}
            {isLoggedin === true && !userMetaData.emailVerification ? (
                <Dialog open={isVerified}>
                    <DialogContent>
                        <div className="w-full text-center">
                            <img
                                src="/images/verify.png"
                                alt="Verification"
                                className="w-[300px] mx-auto my-4"
                            />
                            <p>
                                Your profile is not complete yet. Please verify your account in the{" "}
                                <span className="text-black">settings</span> to access all features.
                            </p>
                        </div>
                        <div className="flex justify-between space-x-3">
                            <Button onClick={() => setIsVerified(false)}>Remember me later</Button>
                            <Link to="/verify">
                                <Button onClick={() => setIsVerified(false)} className="min-w-full">
                                    Verify Now
                                </Button>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
            ) : null}

            {/* Navbar */}
            <nav
                className={`${
                    isScrolled ? "bg-white shadow-lg backdrop-blur-sm" : "bg-transparent"
                } fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300`}
            >
                <div className="max-w-screen-xl flex flex-row justify-between mx-auto px-4 py-3">
                    {/* Logo + Main section */}
                    <div className="flex items-center">
                        <Link onClick={scrollTopFunc} to="/" className="mr-3">
                            <img
                                src="/images/logo-main.svg"
                                className="w-24 h-auto"
                                alt="Nirlipta Yoga"
                            />
                        </Link>

                        {/* Main sections */}
                        <div className='hidden lg:block'>
                            <NavigationMenu>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className='bg-transparent text-sm font-medium hover:text-blue-500'>
                                        Explore
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            <Link onClick={scrollTopFunc} to="/collections/poses">
                                                <li className="hover:bg-gray-100 p-3 rounded-md">
                                                    <span className="text-sm font-semibold">Yoga Poses</span>
                                                    <p className="text-sm text-muted-foreground min-w-full">Explore various poses for flexibility, strength, and balance.</p>
                                                </li>
                                            </Link>
                                            {/* Add more sections like this */}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Right section - Login/Logout */}
                    <div className="flex items-center space-x-4">
                        {isLoggedin ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        <div className="hidden sm:block">
                                            <span className={`${logoutSpinner ? "hidden" : ""} capitalize px-3`}>
                                                {userMetaData.name}
                                            </span>
                                            <div className={`${logoutSpinner ? "" : "hidden"} px-5`}>
                                                <Loading w={24} />
                                            </div>
                                        </div>
                                        <div className="block sm:hidden">
                                            <img src={userExtraMetaDetails.avatar} className="h-[35px] w-[35px] rounded-md" />
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-50">
                                    <div className="userLoggedin">
                                        <DropdownMenuLabel>Activities</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleLogout}>
                                            Sign Out
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="font-semibold bg-[#9B6763] hover:bg-[#A38F85] text-white px-4 py-2 rounded-md transition duration-200 ease-in-out"
                                    >
                                        Login
                                    </Button>

                                </DialogTrigger>
                                <DialogContent>
                                    <Auth />
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
