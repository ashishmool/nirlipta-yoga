import { useState } from "react";
import axios from "axios";
import { AxiosError } from 'axios';
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Loading from "../ui/loading";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import Signup from "@/components/auth/Signup";
import ResetRequest from "@/components/auth/ResetRequest";

type LoginRegisterModalProps = {
    onClose: () => void;
    onLoginSuccess?: () => void; // Added callback for login success
};

export default function Login({ onClose, onLoginSuccess }: LoginRegisterModalProps) {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
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

            const { token, user_id, email: userEmail, role } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("email", userEmail);
                localStorage.setItem("role", role);

                console.log(response.data);

                toast.success("Login successful!");
                if (onLoginSuccess) onLoginSuccess();
                onClose();
            } else {
                throw new Error("Token not found in response");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || "Unable to login. Please try again.";
                toast.error(errorMessage);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleLogin(); // Trigger login on Enter key press
        }
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isResetPassword ? "Reset Password" : "Login"}
                    </DialogTitle>
                    <DialogDescription>
                        {isResetPassword
                            ? "Enter your email to reset your password."
                            : "Enter your credentials to access your account."}
                    </DialogDescription>
                </DialogHeader>

                {isResetPassword ? (
                    <ResetRequest onClose={onClose} />
                ) : isLogin ? (
                    <div className="mt-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="font-bold text-black text-[15px]"
                            >
                                Email Address
                            </Label>
                            <Input
                                id="login-email"
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className="mt-4 space-y-2">
                            <Label
                                htmlFor="password"
                                className="font-bold text-black text-[15px]"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <p className="mt-2 text-center text-sm">
                            Having trouble logging in?{" "}
                            <span
                                className="text-blue-900 hover:underline cursor-pointer"
                                onClick={() => setIsResetPassword(true)}
                            >
                                Reset it
                            </span>
                        </p>

                        <Button
                            className="w-full mt-4"
                            disabled={loading || email.length < 3 || password.length < 8}
                            onClick={handleLogin}
                        >
                            {loading ? <Loading w={24} /> : "Log In"}
                        </Button>

                        <p className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <span
                                className="text-blue-900 hover:underline cursor-pointer"
                                onClick={() => setIsLogin(false)}
                            >
                                Register
                            </span>
                        </p>
                    </div>
                ) : (
                    <Signup
                        onClose={onClose}
                        onSwitchToLogin={() => setIsLogin(true)}
                    />
                )}

                <DialogClose className="absolute right-4 top-4">
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
