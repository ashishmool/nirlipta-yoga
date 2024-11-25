import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// UI Components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Loading from "../ui/loading";

// Types
type FormDataTypes = {
    email: string;
    password: string;
    confirmPassword: string;
    medical_conditions?: string;
};

export default function Signup() {
    // Form validation schema
    const schema = yup.object({
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Please confirm your password"),
        medical_conditions: yup.string().optional(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormDataTypes>({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);
    const [noneApplicable, setNoneApplicable] = useState(false);

    // Toggle "None Applicable" checkbox behavior
    const toggleNoneApplicable = () => {
        setNoneApplicable(!noneApplicable);
        setValue("medical_conditions", noneApplicable ? "" : "None");
    };

    // Form submission handler
    const handleSignup = async (data: FormDataTypes) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/users/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email.toLowerCase(),
                    password: data.password,
                    medical_conditions: noneApplicable ? "None" : data.medical_conditions,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Signup failed");
            }

            toast.success("Signup successful! Please log in.");
            reset(); // Reset the form upon success
            setNoneApplicable(false); // Reset the "None Applicable" checkbox
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSignup)}>
            <div className="mt-6">
                {/* Email */}
                <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                        type="email"
                        {...register("email")}
                        placeholder="hello@example.com"
                        disabled={loading}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password and Confirm Password */}
                <div className="mt-4 flex flex-col md:flex-row md:space-x-4">
                    <div className="w-full">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="w-full mt-4 md:mt-0">
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            {...register("confirmPassword")}
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                </div>

                {/* Medical Conditions */}
                <div className="space-y-2 mt-4">
                    <Label>Medical Conditions</Label>
                    <Input
                        type="text"
                        {...register("medical_conditions")}
                        placeholder="Diabetes, Uric Acid, etc."
                        disabled={noneApplicable || loading}
                    />
                    <div className="flex items-center mt-2">
                        <input
                            type="checkbox"
                            checked={noneApplicable}
                            onChange={toggleNoneApplicable}
                            id="noneApplicable"
                            disabled={loading}
                        />
                        <Label htmlFor="noneApplicable" className="ml-2 text-sm">
                            Not Applicable
                        </Label>
                    </div>
                </div>

                {/* Signup Button */}
                <div className="mt-6">
                    <Button
                        type="submit"
                        className="w-full bg-[#9B6763] hover:bg-[#B8978C]"
                        disabled={loading}
                    >
                        {loading ? <Loading w={24} /> : "Signup"}
                    </Button>
                </div>
            </div>
        </form>
    );
}
