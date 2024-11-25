const Workshop = require("../models/Workshop");

// Get all workshops
const getAllWorkshops = async (req, res) => {
    try {
        const courses = await Workshop.find().populate("instructor_id");
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workshops", error });
    }
};

// Get workshop by ID
const getWorkshopById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Workshop.findById(id).populate("instructor_id");
        if (!course) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workshop by ID", error });
    }
};

// Create a new workshop
const createWorkshop = async (req, res) => {
    try {
        const course = new Workshop(req.body);
        await course.save();
        res.status(201).json({ message: "Workshop created successfully", course });
    } catch (error) {
        res.status(500).json({ message: "Error creating workshop", error });
    }
};

// Update workshop by ID (PUT)
const updateWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Workshop.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.json({ message: "Workshop updated successfully", updatedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error updating workshop", error });
    }
};

// Delete workshop by ID
const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Workshop.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.json({ message: "Workshop deleted successfully", deletedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error deleting workshop", error });
    }
};

module.exports = {
    getAllWorkshops,
    getWorkshopById,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop,
};
