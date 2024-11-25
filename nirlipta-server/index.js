const express = require("express");
const cors = require("cors"); // Import CORS middleware
const app = express();

// Import multer configuration from config/multerConfig.js
const upload = require('./config/multerConfig');



const connectDB = require("./config/db");

// Import routes
const accommodationRoutes = require("./router/accommodationRoutes");
const userRoutes = require("./router/userRoutes");
const enrollmentRoutes = require("./router/enrollmentRoutes");
const instructorRoutes = require("./router/instructorRoutes");
const lessonRoutes = require("./router/lessonRoutes");
const onlineCourseRoutes = require("./router/onlineCourseRoutes");
const paymentRoutes = require("./router/paymentRoutes");
const physicalCourseRoutes = require("./router/physicalCourseRoutes");
const retreatRoutes = require("./router/retreatRoutes");
const scheduleRoutes = require("./router/scheduleRoutes");
const subscriptionRoutes = require("./router/subscriptionRoutes");
const partnerRoutes = require("./router/partnerRoutes");

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));



// Use routes
app.use("/api/accommodations", accommodationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/instructors", instructorRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/onlineCourses", onlineCourseRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/physicalCourses", physicalCourseRoutes);
app.use("/api/retreats", retreatRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/partners", partnerRoutes);


// Default route (optional)
app.get("/", (req, res) => {
    res.send("Welcome to the API");
});

// Start the server
app.listen(5000, () => {
    console.log("Server started at Port 5000!");
});
