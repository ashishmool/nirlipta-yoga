const multer = require("multer");
const path = require("path");
const fs = require("fs");
const rootDir = path.resolve(__dirname, "../"); // This gets the root directory of your project

// Base upload directory
const uploadDirectory = path.join(rootDir, 'uploads');

// Helper function to create a directory if it doesn't exist
const createDirectoryIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Multer storage configuration for multiple file fields
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';

        // Determine which folder based on the field name
        switch (file.fieldname) {
            case 'single_photo':
                folder = 'single_photos';
                break;
            case 'multiple_photos':
                folder = 'multiple_photos';
                break;
            case 'retreat_photos':
                folder = 'retreat_photos';
                break;
            default:
                folder = 'uploads'; // Default folder
        }

        const uploadPath = path.join(uploadDirectory, folder);
        createDirectoryIfNotExists(uploadPath); // Ensure the folder exists
        cb(null, uploadPath); // Set destination
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
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

// Multer upload configuration for different fields
const upload = {
    singlePhoto: multer({
        storage,
        fileFilter,
        // limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
    }).single("single_photo"), // Field name for single photo

    multiplePhotos: multer({
        storage,
        fileFilter,
        // limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
    }).array("multiple_photos", 5), // Field name for multiple photos (max 5 files)

    retreatPhotos: multer({
        storage,
        fileFilter,
        // limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
    }).array("retreat_photos", 5), // Field name for retreat photos (max 5 files)
};

module.exports = upload;
