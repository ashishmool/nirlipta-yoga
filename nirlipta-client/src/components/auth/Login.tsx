import { useState } from "react";
import axios from "axios";

// UI
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loading from "../ui/loading";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

// STATES
import useSignupData from "@/lib/states/signupData";
import useUserState from "@/lib/states/userStates";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const { email: EmailFromSignup } = useSignupData();
    const { password: PasswordFromSignup } = useSignupData();
    const [email, setEmail] = useState<string>(EmailFromSignup || "");
    const [password, setPassword] = useState<string>(PasswordFromSignup || "");
    const { setIsLoggedIn } = useUserState();
    const [loading, setLoading] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Email and Password are required");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email: email.toLowerCase(),
                password,
            });

            // Handle response
            const { token, email: userEmail, role } = response.data;

            // Save token securely
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("email", userEmail);
                localStorage.setItem("role", role);

                // Success feedback
                toast.success("Login successful!");
                setIsLoggedIn(true); // Update state after successful login
                setDialogOpen(true);

                // Redirect after 2 seconds or on click
                setTimeout(() => {
                    navigate("/", { replace: true }); // Navigate to home
                    window.location.reload(); // Reload the page
                }, 2000);
            } else {
                throw new Error("Token not found in response");
            }
        } catch (error) {
            console.error("Login error:", error);

            // Extract error message from response or fallback
            const errorMessage =
                error.response?.data?.message || "Unable to login. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <>
            <div className="mt-6" onKeyDown={handleKeyDown}>
                {/* Email */}
                <div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="font-bold text-black text-[15px]">
                            Email Address
                        </Label>
                        <p className="text-gray-500 text-sm">Please provide your registered email address.</p>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email Address"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="font-bold text-black text-[15px]">
                            Password
                        </Label>
                        <p className="text-gray-500 text-sm">Please enter your password.</p>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-label="Password"
                        />
                        <div className="text-sm text-gray-500 mt-2">
                            Having trouble logging in?{" "}
                            <a href="/reset" className="text-blue-900 hover:underline">
                                Reset Password
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                className="w-full mt-4"
                disabled={loading || email.length < 3 || password.length < 8}
                onClick={handleSubmit}
                aria-label="Submit login form"
            >
                {loading ? <Loading w={24} /> : "Get in"}
            </Button>

            {/* Dialog Component */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent aria-labelledby="dialog-title" aria-describedby="dialog-description">
                    <DialogHeader>
                        <DialogTitle id="dialog-title">Login Successful</DialogTitle>
                        <DialogDescription id="dialog-description">
                            Login was successful. Welcome back!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center p-4">
                        <p className="text-lg font-bold">Login Successful</p>
                        <p>Welcome back! You have logged in with the email: <strong>{email}</strong>.</p>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                setDialogOpen(false);
                                navigate("/", { replace: true });
                                window.location.reload(); // Reload the page after redirect
                            }}
                            className="w-full"
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
