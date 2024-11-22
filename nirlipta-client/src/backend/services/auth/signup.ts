// import { ID, account, databases } from "@/backend/configs/config"
//
// type signup = {
//     email: string,
//     password: string,
//     username: string
// }
//
// export async function signup({ email, password, username }: signup) {
//
//
//     const res = await account.create(
//         ID.unique(),
//         email,
//         password,
//         username
//     ).then(async (res) => {
//         console.log(res)
//         // Pass the username to the user collection
//         await databases.createDocument(
//             `${import.meta.env.VITE_DATABASES_MAIN}`,
//             `${import.meta.env.VITE_COL_JEWELLERY}`,
//             res.$id,
//             {
//                 username: username
//             }
//         ).then(() => {
//             return true
//         }).catch((err) => {
//             console.log('error occur while passing username to the user collection', err)
//             return false
//         })
//
//     }).catch((err) => {
//         return err.type
//     })
//
//     return res
// }

export async function signup({ email, password, username }: signup) {
    try {
        // Step 1: Register the user via your backend API
        const response = await fetch("https://your-backend-api.com/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, username }),
        });

        if (!response.ok) {
            throw new Error("User registration failed");
        }

        const userData = await response.json();

        // Step 2: Save the username to your collection (if needed)
        const saveUsernameResponse = await fetch("https://your-backend-api.com/database/save-username", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userData.id,  // Assuming your backend returns an ID
                username: username,
            }),
        });

        if (!saveUsernameResponse.ok) {
            throw new Error("Failed to save username to database");
        }

        return true;  // Signup successful

    } catch (error) {
        console.error("Signup error:", error.message);
        return false;  // Something went wrong
    }
}
