const Retreat = require("../models/Retreat");

// Get all retreats
const getAllRetreats = async (req, res) => {
    try {
        const retreats = await Retreat.find().populate("instructor_id");
        res.json(retreats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching retreats", error });
    }
};

// Get retreat by ID
const getRetreatById = async (req, res) => {
    try {
        const { id } = req.params;
        const retreat = await Retreat.findById(id).populate("instructor_id");
        if (!retreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.json(retreat);
    } catch (error) {
        res.status(500).json({ message: "Error fetching retreat by ID", error });
    }
};

// Create a new retreat
const createRetreat = async (req, res) => {
    try {
        const retreat = new Retreat(req.body);
        await retreat.save();
        res.status(201).json({ message: "Retreat created successfully", retreat });
    } catch (error) {
        res.status(500).json({ message: "Error creating retreat", error });
    }
};

// Update retreat by ID (PUT)
const updateRetreat = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRetreat = await Retreat.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedRetreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.json({ message: "Retreat updated successfully", updatedRetreat });
    } catch (error) {
        res.status(500).json({ message: "Error updating retreat", error });
    }
};

// Delete retreat by ID
const deleteRetreat = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRetreat = await Retreat.findByIdAndDelete(id);
        if (!deletedRetreat) {
            return res.status(404).json({ message: "Retreat not found" });
        }
        res.json({ message: "Retreat deleted successfully", deletedRetreat });
    } catch (error) {
        res.status(500).json({ message: "Error deleting retreat", error });
    }
};

module.exports = {
    getAllRetreats,
    getRetreatById,
    createRetreat,
    updateRetreat,
    deleteRetreat,
};
