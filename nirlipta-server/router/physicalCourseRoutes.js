const express = require("express");
const router = express.Router();
const {
    getAllPhysicalCourses,
    getPhysicalCourseById,
    createPhysicalCourse,
    updatePhysicalCourse,
    deletePhysicalCourse
} = require("../controller/PhysicalCourseController");

// Get all physical courses
router.get("/", getAllPhysicalCourses);

// Get physical course by ID
router.get("/:id", getPhysicalCourseById);

// Create a new physical course
router.post("/save", createPhysicalCourse);

// Update physical course by ID
router.put("/update/:id", updatePhysicalCourse);

// Delete physical course by ID
router.delete("/delete/:id", deletePhysicalCourse);

module.exports = router;
