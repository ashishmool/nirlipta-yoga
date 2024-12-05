import axios from "axios";

export const signup = async ({ email, password, username, role }) => {
    try {
        const response = await axios.post("http://localhost:5000/api/auth/register", {
            email,
            password,
            role,
        });
        return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};
