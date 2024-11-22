// import { databases } from "@/backend/configs/config";
//
// // Get the Logged-in user store details
// export async function getProduct(perfumeId: string) {
//     const results = await databases.getDocument(
//         `${import.meta.env.VITE_DATABASES_MAIN}`,
//         `${import.meta.env.VITE_COL_PRODUCTS}`,
//         `${perfumeId}`
//     ).then((res) => {
//         return res
//     }).catch((err) => {
//         return err
//     })
//
//     return results
// }
//
import { dummyProducts } from "@/backend/data/dummyData"; // Import your dummy data instead of Appwrite

// Get the product details based on the productId
export async function getProduct(productId: string) {
    try {
        // Find the product with the matching $id in the dummy data
        const product = dummyProducts.find((item) => item.$id === productId);

        if (!product) {
            throw new Error("Product not found");
        }

        return product; // Return the found product
    } catch (err) {
        console.error("Error fetching product:", err);
        return null; // Return null or an appropriate error message if something goes wrong
    }
}
