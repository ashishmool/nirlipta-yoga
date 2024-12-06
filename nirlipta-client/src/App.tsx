import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// SVG Background
import BackgroundSvg from "@/assets/bg.svg";

// SERVICES
import { checkSession } from "@/backend/services/auth/checkSession";

// STATES
import useUserState from "@/lib/states/userStates";

// UI
import { Navbar, Footer } from "@/components";
import { LoadingScreen } from "@/components/ui/loading";
import { Toaster } from "sonner";

// PAGES
import {
    Home,
    Error,
    Policies,
    AboutDetails,
    BrowseDetails,
} from "./pages";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard.tsx";
import AddRetreat from "@/pages/dashboard/admin/retreat/AddRetreat.tsx";
import AddAccommodation from "@/pages/dashboard/admin/accommodation/AddAccommodation.tsx";
import AddInstructor from "@/pages/dashboard/admin/instructor/AddInstructor.tsx";
import ListRetreats from "@/pages/dashboard/admin/retreat/ListRetreats.tsx";
import UpdateRetreat from "@/pages/dashboard/admin/retreat/UpdateRetreat.tsx";
import ListInstructors from "@/pages/dashboard/admin/instructor/ListInstructors.tsx";
import UpdateInstructor from "@/pages/dashboard/admin/instructor/UpdateInstructor.tsx";
import ListAccommodation from "@/pages/dashboard/admin/accommodation/ListAccommodation.tsx";
import UpdateAccommodation from "@/pages/dashboard/admin/accommodation/UpdateAccommodation.tsx";
import ListPartners from "@/pages/dashboard/admin/partner/ListPartners.tsx";
import AddPartner from "@/pages/dashboard/admin/partner/AddPartner.tsx";
import UpdatePartner from "@/pages/dashboard/admin/partner/UpdatePartner.tsx";
import ListUsers from "@/pages/dashboard/admin/user/ListUsers.tsx";
import AddUser from "@/pages/dashboard/admin/user/AddUser.tsx";
import UpdateUser from "@/pages/dashboard/admin/user/UpdateUser.tsx";
import ListWorkshops from "@/pages/dashboard/admin/workshop/ListWorkshops.tsx";
import AddWorkshop from "@/pages/dashboard/admin/workshop/AddWorkshop.tsx";
import UpdateWorkshop from "@/pages/dashboard/admin/workshop/UpdateWorkshop.tsx";
import Reset from "@/components/reset/Reset.tsx";
import ResetPassword from "@/components/reset/ResetPassword.tsx";
import MainNav from "@/components/common/MainNav.tsx";

export default function App() {
    // Active loading screen while fetching data
    const [activeLoadingScreen, setActiveLoadingScreen] = useState<boolean>(true);

    // Get the userState that tracks whether the user is logged in or not
    const { isLoggedIn, setIsLoggedIn } = useUserState();

    // Update the session validation logic
    useEffect(() => {
        const validateSession = async () => {
            try {
                const isValidSession = await checkSession(); // Backend session check
                setIsLoggedIn(isValidSession); // Update login state
            } catch (error) {
                console.error("Error validating session:", error);
                setIsLoggedIn(false); // Default to logged out state on error
            } finally {
                setActiveLoadingScreen(false); // Stop showing loading screen
            }
        };

        validateSession();
    }, [setIsLoggedIn]);

    // Helper function to check if the current route is admin
    const isAdminRoute = () => window.location.pathname.startsWith("/admin");

    return (
        <div
            style={{
                backgroundImage: `url(${BackgroundSvg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {activeLoadingScreen ? (
                <LoadingScreen />
            ) : (
                <BrowserRouter>
                    <Toaster richColors />

                    {/* Conditionally Render Navbar */}
                    {!isAdminRoute() && (
                        <div>
                            {/*<Navbar />*/}
                            <MainNav/>
                        </div>
                    )}

                    <Routes>
                        {/* Basic Routes */}
                        <Route index element={<Home />} />
                        <Route path="*" element={<Error />} />
                        <Route path="policies" element={<Policies />} />
                        <Route path="about" element={<AboutDetails />} />
                        <Route path="collections" element={<BrowseDetails />} />
                        <Route path="reset" element={<Reset />} />
                        <Route path="reset-password" element={<ResetPassword />} />

                        {/* User Dashboard */}
                        <Route path="user-profile" element={<UpdateUser />}>
                            {/* Retreat Routes */}
                            {/*<Route path="retreats" element={<ListRetreats />} />*/}

                        </Route>

                        {/* Admin Dashboard */}
                        <Route path="admin" element={<AdminDashboard />}>
                            {/* Retreat Routes */}
                            <Route path="retreats" element={<ListRetreats />} />
                            <Route path="retreats/add" element={<AddRetreat />} />
                            <Route path="retreats/update/:id" element={<UpdateRetreat />} />

                            {/* Accommodation Routes */}
                            <Route path="accommodations" element={<ListAccommodation />} />
                            <Route path="accommodations/add" element={<AddAccommodation />} />
                            <Route path="accommodations/update/:id" element={<UpdateAccommodation />} />

                            {/* Instructor Routes */}
                            <Route path="instructors" element={<ListInstructors />} />
                            <Route path="instructors/add" element={<AddInstructor />} />
                            <Route path="instructors/update/:id" element={<UpdateInstructor />} />

                            {/* Partner Routes */}
                            <Route path="partners" element={<ListPartners />} />
                            <Route path="partners/add" element={<AddPartner />} />
                            <Route path="partners/update/:id" element={<UpdatePartner />} />

                            {/* Workshop Routes */}
                            <Route path="workshops" element={<ListWorkshops />} />
                            <Route path="workshops/add" element={<AddWorkshop />} />
                            <Route path="workshops/update/:id" element={<UpdateWorkshop />} />

                            {/* User Routes */}
                            <Route path="users" element={<ListUsers />} />
                            <Route path="users/add" element={<AddUser />} />
                            <Route path="users/update/:id" element={<UpdateUser />} />
                        </Route>
                    </Routes>

                    {/* Conditionally Render Footer */}
                    {!isAdminRoute() && <Footer />}
                </BrowserRouter>
            )}
        </div>
    );
}
