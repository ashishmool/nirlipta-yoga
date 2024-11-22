import { useState } from "react";
import { signup } from "@/backend/services/auth/signup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Loading from "../ui/loading";

// Icons
import { FaArrowLeft } from "react-icons/fa";

// State Management
import useJoinFormType from "@/lib/states/joinFormType";
import useSignupData from "@/lib/states/signupData";
import useErrorAlert from "@/lib/states/errorAlert";
import checkOnAuthErrors from "@/lib/errors/checkOnAuthErrors";
import errorsStore from "@/lib/errors/errorsStore";

// Types
type FormDataTypes = {
    email: string;
    password: string;
    username: string;
    confirmPassword: string;
};

export default function DirectSignup() {
    // Form validation schema
    const schema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required(),
        username: yup.string().required("Username is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Please confirm your password"),
    });

    const {
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataTypes>({
        resolver: yupResolver(schema),
    });

    // States from context
    const { email, setEmail, password, setPassword, username, setUsername } = useSignupData();
    const { showSignupAlert, setShowSignupAlert } = useErrorAlert();
    const { setFormType } = useJoinFormType();

    // Local states
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Input change handlers
    const handleChange = (setter: (value: string) => void, field: keyof FormDataTypes) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setter(value);
            setValue(field, value);
        };
    };

    // Form submission handler
    const handleDataSubmit = async (data: FormDataTypes) => {
        setShowSignupAlert(false);
        setLoading(true);

        try {
            const results = await signup({
                email: data.email.toLowerCase(),
                password: data.password,
                username: data.username,
            });

            if (errorsStore.includes(results)) {
                const errorType = errorsStore.find((errorType) => errorType === results);
                toast.error(checkOnAuthErrors(errorType).errordescription);
            } else if (results) {
                setShowSignupAlert(true);
            }
        } catch (error) {
            console.error("Error during signup:", error);
        } finally {
            setLoading(false);
        }
    };

    // Handle back-to-login button
    const backToLogin = () => {
        setFormType("login");
        setShowSignupAlert(false);
    };

    // Prevent "Enter" key from submitting the form
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit(handleDataSubmit)} onKeyDown={handleKeyDown}>
            <div className="mt-6">
                {/* Alerts */}
                {showSignupAlert && (
                    <div className="bg-green-200 text-green-800 border-green-500 shadow-sm rounded-md p-4">
                        <h1 className="text-lg font-bold mb-4 capitalize">Dear {username}</h1>
                        <p className="text-sm text-green-800">
                            You have successfully registered! To complete your profile and start using the platform, please{" "}
                            <span className="font-bold">log in</span>.
                        </p>
                        <Button className="w-full mt-4 shadow-lg" onClick={backToLogin}>
                            Login
                        </Button>
                    </div>
                )}

                {!showSignupAlert && (
                    <div>
                        {/* Email */}
                        <div className="space-y-2">
                            <Label className="font-bold text-black text-[15px]">Email Address</Label>
                            <p className="text-gray-500 text-sm">
                                Please provide your email address to create an account.
                            </p>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleChange(setEmail, "email")}
                                placeholder="hello@example.com"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Username */}
                        <div className="space-y-2 mt-4">
                            <Label className="font-bold text-black text-[15px]">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={handleChange(setUsername, "username")}
                                placeholder="username123"
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        {/* Password and Confirm Password */}
                        <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
                            <div className="w-full">
                                <Label className="font-bold text-black text-[15px]">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={handleChange(setPassword, "password")}
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <div className="w-full mt-4 md:mt-0">
                                <Label className="font-bold text-black text-[15px]">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleChange(setConfirmPassword, "confirmPassword")}
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Signup Button */}
                        <div className="mt-6">
                            <Button
                                className="w-full bg-[#9B6763] hover:bg-[#B8978C]"
                                disabled={!email || !username || !password || !confirmPassword || loading}
                            >
                                {loading ? <Loading w={24} /> : "Signup Now"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}
