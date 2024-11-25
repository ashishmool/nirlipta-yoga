const PhysicalCourse = require("../models/PhysicalCourse");

// Get all physical courses
const getAllPhysicalCourses = async (req, res) => {
    try {
        const courses = await PhysicalCourse.find().populate("instructor_id");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching physical courses", error });
    }
};

// Get physical course by ID
const getPhysicalCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await PhysicalCourse.findById(id).populate("instructor_id");
        if (!course) {
            return res.status(404).json({ message: "Physical course not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching physical course by ID", error });
    }
};

// Create a new physical course
const createPhysicalCourse = async (req, res) => {
    try {
        const course = new PhysicalCourse(req.body);
        await course.save();
        res.status(201).json({ message: "Physical course created successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Error creating physical course", error });
    }
};

// Update physical course by ID (PUT)
const updatePhysicalCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await PhysicalCourse.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Physical course not found" });
        }
        res.json({ message: "Physical course updated successfully", updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating physical course", error });
    }
};

// Delete physical course by ID
const deletePhysicalCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await PhysicalCourse.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Physical course not found" });
        }
        res.json({ message: "Physical course deleted successfully", deletedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error deleting physical course", error });
    }
};

module.exports = {
    getAllPhysicalCourses,
    getPhysicalCourseById,
    createPhysicalCourse,
    updatePhysicalCourse,
    deletePhysicalCourse,
};
