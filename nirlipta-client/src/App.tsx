import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// SVG Background
import BackgroundSvg from "@/assets/bg.svg";

// SERVICES
import { checkSession } from "@/backend/services/auth/checkSession";

// STATES
import useUserState from "@/lib/states/userStates";
import useCheckStoreState from "@/lib/states/userStoreState";

// UI
import { Navbar, Footer } from "@/components";
import { LoadingScreen } from "@/components/ui/loading";
import { Toaster } from 'sonner'

// PAGES
import {
  Home,
  Error,
  Policies,
  AboutDetails,
  Contact,
  CartDetails,
  BrowseDetails,
} from "./pages";
import ResetDetails from "./pages/ResetDetails";


export default function App() {

  // Active loading screen while fetching data
  const [activeLoadingScreen, setActiveLoadingScreen] = useState<boolean>(true);

  // Get the userState that tracks wether of User is Logged in or Not
  const { isLoggedin, setIsLoggedin } = useUserState();


  // Check if there's an active session by calling the checkSession() and check it's returns
  async function sessionCheck() {
    try {
      const response = await checkSession();
      setIsLoggedin(response);
    } catch (error) {
      console.error('Error checking session:', error);
      setIsLoggedin(false);
    } finally {
      setActiveLoadingScreen(false);
    }
  }


  // Run Checks everytime App got mounted
  useEffect(() => {
    sessionCheck()
  }, []);

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

          <div>
            <Navbar />
            <div className="pb-10"></div>
          </div>
          <Routes>

            {/* Basic Routes */}
            <Route index element={<Home />} />
            <Route path='*' element={<Error />} />
            <Route path='policies' element={<Policies />} />
            <Route path='about' element={<AboutDetails />} />
            <Route path='cart' element={<CartDetails />} />
            <Route path='collections' element={<BrowseDetails />} />
            <Route path='reset' element={<ResetDetails />} />
            <Route path='contact' element={<Contact />} />

            {/*/!* If NOT Logged-in *!/*/}
            {/*<Route path='verify' element={isLoggedin ? <VerifyDetails /> : <Navigate to="/" />} />*/}
            {/*<Route path='update' element={isLoggedin ? <UpdateDetails /> : <Navigate to="/" />} />*/}
            {/*<Route path='settings' element={isLoggedin ? <SettingsDetails /> : <Navigate to="/" />} />*/}
            {/*<Route path='sell' element={isLoggedin ? <SellDetails /> : <Navigate to="/" />} />*/}
            {/*<Route path="store/create" element={storeRoute()} />*/}

            {/*<Route path='edit' element={isLoggedin ? <EditDetails /> : <Navigate to="/" />} />*/}

            {/*/!* Custom Routes *!/*/}
            {/*<Route path='collections/:id' element={<Collections />} />*/}
            {/*<Route path='jewelleries/:id' element={<JewelleryDetails />} />*/}
            {/*<Route path="store/:id" element={<StoreDetails />} />*/}

            {/*/!* Redirect Routes *!/*/}
            {/*<Route path="jewelleries" element={<Navigate to="/" />} />*/}
            {/*<Route path="store" element={<Navigate to="/" />} />*/}
            {/*<Route path="edit" element={<Navigate to="/" />} />*/}


          </Routes>
          <div>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </div>
  )
}
