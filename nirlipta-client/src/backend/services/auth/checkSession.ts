// import { account } from "@/backend/configs/config"
//
//
// export async function checkSession() {
//     const results = await account.getSession('current')
//     return results ? true : false
// }

// checkSession.ts

// Replace this import with a mock session checker
import mockSession from '@/backend/data/mockSession';

// Mock API call to check session
export async function checkSession() {
    try {
        // Simulate fetching session from local or static data
        const results = await mockSession(); // Replace `account.getSession` with mock logic
        return results ? true : false;
    } catch (error) {
        console.error("Error checking session:", error);
        return false;
    }
}
