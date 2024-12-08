const multer = require("multer");
const path = require("path");
const fs = require("fs");
const rootDir = path.resolve(__dirname, "../"); // This gets the root directory of your project

// Define the upload directory outside the config folder (in the root directory)
const uploadDirectory = path.join(rootDir, 'uploads');

// Ensure the uploads directory exists in the root directory
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter to allow only images
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

// Single file upload middleware for "photo"
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // Size Limit: 10 MB
}).single("photo");

module.exports = upload;
