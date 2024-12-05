import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importing useNavigate for redirection

// UI Components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Loading from "../ui/loading";

// States
import useJoinFormType from "@/lib/states/joinFormType";
import useErrorAlert from "@/lib/states/errorAlert";

type FormDataTypes = {
    email: string;
    medical_conditions: string;
};

export default function Signup() {
    // Validation schema
    const schema = yup.object().shape({
        email: yup.string().email("Invalid email address").required("Email is required"),
        medical_conditions: yup.string(),
    });

    const { handleSubmit, register, formState: { errors }, setValue, reset } = useForm<FormDataTypes>({
        resolver: yupResolver(schema),
    });

    // State variables
    const [loading, setLoading] = useState(false);
    const [noneApplicable, setNoneApplicable] = useState(false);
    const { setFormType } = useJoinFormType();
    const { showSignupAlert, setShowSignupAlert } = useErrorAlert();
    const [formClosed, setFormClosed] = useState(false); // State to control form visibility
    const navigate = useNavigate(); // useNavigate hook for redirection

    // Toggle "Not Applicable" for medical conditions
    const toggleNoneApplicable = () => {
        const newValue = !noneApplicable;
        setNoneApplicable(newValue);
        setValue("medical_conditions", newValue ? "None" : "");
    };

    // Submit handler
    const handleDataSubmit = async (data: FormDataTypes) => {
        setLoading(true);
        setShowSignupAlert(false);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                email: data.email.toLowerCase(),
                medical_conditions: data.medical_conditions || "None",
                role: "student",
            });

            if (response.status === 201) {
                toast.success("Account created successfully! Please verify email.");
                setShowSignupAlert(true);
                setFormClosed(true); // Close the form after success

                // Reset all states after 3 seconds
                setTimeout(() => {
                    // Reset the form and state values
                    reset();
                    setNoneApplicable(false); // Reset the "Not Applicable" checkbox
                    setFormClosed(true); // Reopen the form if needed

                    // Redirect to homepage
                    navigate("/"); // Redirect to the homepage
                }, 2000); // Delay to show the success message
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Render the form only if it's not closed
    if (formClosed) {
        return null; // The form is hidden after successful signup
    }

    return (
        <form onSubmit={handleSubmit(handleDataSubmit)} className="mt-6">
            {/* Success Alert */}
            {showSignupAlert && (
                <div className="bg-green-200 text-green-800 border-green-500 shadow-sm rounded-md p-4 mb-6">
                    <h1 className="text-lg font-bold mb-2 capitalize">Signup Successful!</h1>
                    <p className="text-sm">
                        Your account has been created. Please verify your email to log in.
                    </p>
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-black text-[15px]">
                    Email Address
                </Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="hello@example.com"
                    {...register("email")}
                    aria-describedby={errors.email ? "emailError" : undefined}
                    disabled={loading}
                />
                {errors.email && <p id="emailError" className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>


            {/* Medical Conditions Field */}
            <div className="space-y-2 mt-4">
                <Label htmlFor="medical_conditions" className="font-bold text-black text-[15px]">
                    Medical Conditions
                </Label>
                <Input
                    id="medical_conditions"
                    type="text"
                    {...register("medical_conditions")}
                    placeholder="Diabetes, Uric Acid, etc."
                    disabled={noneApplicable || loading}
                    aria-describedby={noneApplicable ? "noneApplicableDesc" : "medicalConditionsDesc"}
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
            <Button
                type="submit"
                className="w-full bg-[#9B6763] hover:bg-[#B8978C] mt-6"
                disabled={loading}
                aria-label="Signup Button"
            >
                {loading ? <Loading w={24} /> : "Signup Now"}
            </Button>
        </form>
    );
}
