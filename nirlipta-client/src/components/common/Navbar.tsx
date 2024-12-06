import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Loading from "@/components/ui/loading";
import Auth from "@/components/auth/Auth";
import { checkSession } from "../../backend/services/auth/checkSession";

// ICONS
import { CgLogOut } from "react-icons/cg";
import { FaBars, FaTimes } from "react-icons/fa";
import Login from "@/components/auth/Login.tsx";

export default function Navbar() {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [logoutSpinner, setLogoutSpinner] = useState(false);
    const [userMetaData, setUserMetaData] = useState({ name: localStorage.getItem("email") });
    const [userExtraMetaDetails, setUserExtraMetaDetails] = useState({ avatar: "/path/to/avatar" });
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog visibility state

    useEffect(() => {
        async function validateSession() {
            const isValid = await checkSession();
            setIsLoggedin(isValid);
        }
        validateSession();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        setLogoutSpinner(true);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        setIsLoggedin(false);
        setLogoutSpinner(false);
    };

    const scrollTopFunc = () => window.scrollTo(0, 0);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
        document.body.classList.toggle("overflow-hidden", !isMobileMenuOpen);
    };

    return (
        <div className="fixed min-w-full z-50">
            {/* Verification Dialog */}
            {isLoggedin && !userMetaData.emailVerification && (
                <Dialog open={isVerified}>
                    <DialogContent>
                        <div className="w-full text-center">
                            <img src="/images/verify.png" alt="Verification" className="w-[300px] mx-auto my-4" />
                            <p>
                                Your profile is incomplete. Complete it in the{" "}
                                <span className="text-black">settings</span> to access all features.
                            </p>
                        </div>
                        <div className="flex justify-between space-x-3">
                            <Button onClick={() => setIsVerified(false)}>Remind Me Later</Button>
                            <Link to="/user-profile">
                                <Button className="min-w-full" onClick={() => setIsVerified(false)}>
                                    Complete Profile
                                </Button>
                            </Link>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {/* Navbar */}
            <nav
                className={`${
                    isScrolled ? "bg-white shadow-lg" : "bg-transparent"
                } fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300`}
            >
                <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link onClick={scrollTopFunc} to="/" className="mr-3">
                        <img src="/images/logo-main.svg" className="w-24 h-auto" alt="Nirlipta Yoga" />
                    </Link>

                    {/* Hamburger Icon */}
                    <button
                        className="lg:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Main Navigation */}
                    <div className={`lg:flex lg:items-center ${isMobileMenuOpen ? "block" : "hidden"}`}>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                                    <NavigationMenuContent
                                        className={`${
                                            isScrolled ? "bg-white shadow" : "bg-transparent"
                                        }`}
                                    >
                                        <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                            {[{ path: "/workshops", label: "Workshops" }, { path: "/retreats", label: "Retreats" }, { path: "/partners", label: "Partners" }, { path: "/supporters", label: "Supporters" }]
                                                .map((item, index) => (
                                                    <Link key={index} onClick={scrollTopFunc} to={item.path}>
                                                        <li className="hover:bg-gray-100 p-3 rounded-md">
                                                            <span className="text-sm font-semibold">{item.label}</span>
                                                            <p className="text-sm text-muted-foreground">
                                                                Discover more about {item.label.toLowerCase()}.
                                                            </p>
                                                        </li>
                                                    </Link>
                                                ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Login/Dropdown */}
                        <div className="mt-4 lg:mt-0 lg:ml-4">
                            {isLoggedin ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            <div className="hidden sm:block">
                                                <span className={`${logoutSpinner ? "hidden" : ""} capitalize px-3`}>
                                                    {userMetaData.name}
                                                </span>
                                                {logoutSpinner && (
                                                    <div className="px-5">
                                                        <Loading w={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="block sm:hidden">
                                                <img
                                                    src={userExtraMetaDetails.avatar}
                                                    className="h-[35px] w-[35px] rounded-md"
                                                    alt="User Avatar"
                                                />
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-50">
                                        <DropdownMenuLabel>Activities</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel>Dashboard</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-500 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <CgLogOut className="mr-2" />
                                            Sign Out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button>Login</Button>
                                    </DialogTrigger>
                                    <DialogContent aria-describedby="login-dialog-description"> {/* Added aria-describedby */}
                                        <DialogHeader>
                                            <DialogTitle>Login</DialogTitle>
                                        </DialogHeader>
                                        {/* Added description for accessibility */}
                                        <p id="login-dialog-description" className="sr-only">
                                            Please enter your credentials to log in.
                                        </p>
                                        {/* Pass the onClose prop to the Login component */}
                                        <Login onClose={() => setIsDialogOpen(false)} />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
