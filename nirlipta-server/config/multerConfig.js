const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Define the root and upload directories
const rootDir = path.resolve(__dirname, "../");
const uploadDirectory = path.join(rootDir, "uploads");

// Helper function to create directories if they don't exist
const createDirectoryIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure the base upload directory exists
createDirectoryIfNotExists(uploadDirectory);

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "uploads"; // Default folder

        // Determine folder based on the field name
        switch (file.fieldname) {
            case "retreat_photos":
                folder = "retreat_photos";
                break;
            case "guests[0][photo]":
                folder = "guest_photos";
                break;
            case "guests[1][photo]":
                folder = "guest_photos";
                break;
            case "workshop_photo":
                folder = "workshop_photos";
                break;
            case "accommodation_photo":
                folder = "accommodation_photos";
                break;
            default:
                folder = "misc";
        }

        const uploadPath = path.join(uploadDirectory, folder);
        createDirectoryIfNotExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filenames using a timestamp and the original file extension
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

// File filter to validate file types
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true); // File is valid
    } else {
        cb(new Error("Unsupported file type! Only JPEG, JPG, and PNG are allowed."));
    }
};

// Multer upload configuration
const upload = multer({
    storage,
    fileFilter,
    // Uncomment and adjust the following line if file size limits are needed
    // limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
}).fields([
    { name: "retreat_photos", maxCount: 5 }, // Up to 5 retreat photos
    { name: "guests[0][photo]", maxCount: 1 }, // First guest photo
    { name: "guests[1][photo]", maxCount: 1 }, // Second guest photo (if any)
    { name: "workshop_photo", maxCount: 1 }, // Workshop photo
    { name: "accommodation_photo", maxCount: 1 }, // Accommodation photo
]);

module.exports = upload;
