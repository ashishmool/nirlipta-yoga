import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

interface UserProfileData {
    email: string;
    password: string | null;
    profile_picture: string | null;
    role: string;
    age: string | null;
    gender: string | null;
    medical_conditions: string;
    enrolled_courses: string;
    subscribed_courses: string;
    payments: string;
}

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id"); // Fetch user_id from localStorage
    const [userProfile, setUserProfile] = useState<UserProfileData>({
        email: "",
        password: null,
        profile_picture: null,
        role: "student",
        age: null,
        gender: null,
        medical_conditions: "",
        enrolled_courses: "",
        subscribed_courses: "",
        payments: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            toast.error("User ID not found. Please log in again.");
            navigate("/login"); // Redirect to login if user_id is missing
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/getById/${userId}`
                );
                const user = response.data;

                setUserProfile({
                    email: user.email || "",
                    password: user.password || null,
                    profile_picture: user.profile_picture || null,
                    role: user.role || "student",
                    age: user.age || null,
                    gender: user.gender || null,
                    medical_conditions: user.medical_conditions?.join(", ") || "",
                    enrolled_courses: user.enrolled_courses?.join(", ") || "",
                    subscribed_courses: user.subscribed_courses?.join(", ") || "",
                    payments: user.payments?.join(", ") || "",
                });
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://localhost:5000/api/users/update/${userId}`, userProfile);
            toast.success("User profile updated successfully!");
            navigate(-1);
        } catch (error) {
            console.error("Error updating user profile:", error);
            toast.error("Failed to update user profile.");
        } finally {
            setLoading(false);
        }
    };

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border rounded"
                        required
                        aria-label="Email Address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Role</label>
                    <input
                        type="text"
                        name="role"
                        value={userProfile.role}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border rounded"
                        required
                        aria-label="User Role"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={userProfile.age || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border rounded"
                        aria-label="Age"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select
                        name="gender"
                        value={userProfile.gender || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border rounded"
                        aria-label="Gender"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Medical Conditions</label>
                    <textarea
                        name="medical_conditions"
                        value={userProfile.medical_conditions}
                        onChange={handleChange}
                        className="mt-1 block w-full p-3 border rounded"
                        aria-label="Medical Conditions"
                    />
                </div>

                {/* Other textareas */}
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                    {loading ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
