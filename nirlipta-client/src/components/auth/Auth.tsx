import { Button } from "@/components/ui/button";

// AUTH
import Signup from "./Signup";
import Login from "./Login";

// STATES
import useJoinFormType from "@/lib/states/joinFormType";
import useErrorAlert from "@/lib/states/errorAlert";
import useSignupData from "@/lib/states/signupData";

export default function Auth() {
    const { setEmail, setPassword, setUsername } = useSignupData();

    const { formType, setFormType } = useJoinFormType();
    const { showSignupAlert, setShowSignupAlert } = useErrorAlert();

    // Handlers
    const login = () => {
        setFormType("login");
        setShowSignupAlert(false);
    };

    const signup = () => {
        setFormType("signup");
        if (showSignupAlert || !showSignupAlert) {
            setShowSignupAlert(false);
        }
        setEmail("");
        setPassword("");
        setUsername("");
    };

    return (
        <div className="flex flex-col w-full">
            {/* Title */}
            <header className="mx-auto max-w-md space-y-3 border-b pb-2">
                <div className="space-y-2 text-center">
                    <h1 className="text-lg font-bold mb-3">Welcome to Nirlipta Yoga</h1>
                </div>
            </header>

            {/* Form */}
            {formType === "signup" ? <Signup /> : <Login />}

            {/* Switch between Login and Signup */}
            <div className="text-center space-y-2 mt-4">
                {formType === "signup" ? (
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Button variant="link" onClick={login}>
                            Login now!
                        </Button>
                    </p>
                ) : (
                    <p className="text-sm">
                        Don’t have an account?{" "}
                        <Button variant="link" onClick={signup}>
                            Sign Up Now!
                        </Button>
                    </p>
                )}
            </div>
        </div>
    );
}
