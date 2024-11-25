import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import AddAccommodation from "@/pages/dashboard/admin/retreat/AddAccommodation.tsx";
import AddInstructor from "@/pages/dashboard/admin/instructor/AddInstructor.tsx";

export default function App() {
    // Active loading screen while fetching data
    const [activeLoadingScreen, setActiveLoadingScreen] = useState<boolean>(true);

    // Get the userState that tracks whether the user is logged in or not
    const { isLoggedin, setIsLoggedin } = useUserState();

    // Check if there's an active session by calling the checkSession() and check its return
    async function sessionCheck() {
        try {
            const response = await checkSession();
            setIsLoggedin(response);
        } catch (error) {
            console.error("Error checking session:", error);
            setIsLoggedin(false);
        } finally {
            setActiveLoadingScreen(false);
        }
    }

    // Run checks every time the app is mounted
    useEffect(() => {
        sessionCheck();
    }, []);

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
                            <Navbar />
                            <div className="pb-10"></div>
                        </div>
                    )}

                    <Routes>
                        {/* Basic Routes */}
                        <Route index element={<Home />} />
                        <Route path="*" element={<Error />} />
                        <Route path="policies" element={<Policies />} />
                        <Route path="about" element={<AboutDetails />} />
                        <Route path="collections" element={<BrowseDetails />} />

                        {/* Admin Dashboard */}
                        {/*<Route*/}
                        {/*    path="admin"*/}
                        {/*    element={isLoggedin ? <AdminDashboard /> : <Navigate to="/" />}*/}
                        {/*/>*/}
                        <Route path="admin" element={<AdminDashboard />}>
                            {/*<Route path="retreats" element={<ListRetreats />} />*/}
                            <Route path="retreats/add" element={<AddRetreat />} />
                            <Route path="accommodations/add" element={<AddAccommodation />} />
                            <Route path="instructors/add" element={<AddInstructor />} />
                        </Route>
                    </Routes>

                    {/* Conditionally Render Footer */}
                    {!isAdminRoute() && <Footer />}
                </BrowserRouter>
            )}
        </div>
    );
}
