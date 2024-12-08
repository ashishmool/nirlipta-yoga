import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// SVG Background
import BackgroundSvg from "@/assets/bg.svg";

// SERVICES
import { checkSession } from "@/backend/services/auth/checkSession";

// STATES
import useUserState from "@/lib/states/userStates";

// UI
import { Footer } from "@/components";
import { LoadingScreen } from "@/components/ui/loading";
import { Toaster } from "sonner";

// Components
import MainNav from "@/components/common/MainNav.tsx";

// Routing
import Routing from "./Routing";

export default function App() {
    const [activeLoadingScreen, setActiveLoadingScreen] = useState<boolean>(true);
    const {setIsLoggedIn} = useUserState();

    useEffect(() => {
        const validateSession = async () => {
            try {
                const isValidSession = await checkSession();
                setIsLoggedIn(isValidSession);
            } catch (error) {
                console.error("Error validating session:", error);
                setIsLoggedIn(false);
            } finally {
                setActiveLoadingScreen(false);
            }
        };

        validateSession();
    }, [setIsLoggedIn]);

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

                    {!isAdminRoute() && <MainNav />}

                    <Routing />

                    {!isAdminRoute() && <Footer />}
                </BrowserRouter>
            )}
        </div>
    );
}
