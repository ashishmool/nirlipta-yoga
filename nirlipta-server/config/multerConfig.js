const multer = require("multer");
const path = require("path");
const fs = require("fs");

const rootDir = path.resolve(__dirname, "../"); // Root directory
const uploadDirectory = path.join(rootDir, "uploads");

// Helper to create directory if it doesn't exist
const createDirectoryIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Multer storage configuration for different upload paths
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        switch (file.fieldname) {
            case "single_photo":
                folder = "single_photos";
                break;
            case "multiple_photos":
                folder = "multiple_photos";
                break;
            case "retreat_photos":
                folder = "retreat_photos";
                break;
            case "workshop_photo": // Handle workshop photo
                folder = "workshop_photos";
                break;
            case "accommodation_photo": // Handle accommodation photo
                folder = "accommodation_photos";
                break;
            default:
                folder = "uploads"; // Default folder
        }

        const uploadPath = path.join(uploadDirectory, folder);
        createDirectoryIfNotExists(uploadPath);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png/;
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
    }
};

// Unified Multer upload configuration
const upload = multer({
    storage,
    fileFilter,
    // limits: { fileSize: 10 * 1024 * 1024 }, // Uncomment if needed
}).fields([
    { name: "retreat_photos", maxCount: 5 }, // Retreat photos
    { name: "guests[0][photo]", maxCount: 1 }, // First guest photo
    { name: "guests[1][photo]", maxCount: 1 }, // Additional guest photos as needed
    { name: "workshop_photo", maxCount: 1 }, // New workshop photo field
    { name: "accommodation_photo", maxCount: 1 }, // New accommodation photo field
]);

module.exports = upload;
