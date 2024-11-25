const Retreat = require("../models/Retreat");
const path = require("path");

// Function to handle image uploads using multer (already imported in index.js)
const multer = require('multer');

// You can configure multer in this file or directly import it if you've already done it in the `config/multerConfig.js`
const upload = require('../config/multerConfig');

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

// Create a new retreat (with image upload)
const createRetreat = async (req, res) => {
    try {
        // Multer middleware to handle file upload
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading image", error: err });
            }

            // Create the retreat, attaching image URL if a file is uploaded
            const retreatData = req.body;
            if (req.file) {
                retreatData.imageUrl = `/uploads/${req.file.filename}`; // Assuming the file is saved under "uploads/"
            }
            const retreat = new Retreat(retreatData);
            await retreat.save();
            res.status(201).json({ message: "Retreat created successfully", retreat });
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating retreat", error });
    }
};

// Update retreat by ID (with image upload)
const updateRetreat = async (req, res) => {
    try {
        const { id } = req.params;

        // Multer middleware to handle file upload
        upload.single('image')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error uploading image", error: err });
            }

            // Find the retreat and update it
            const updatedRetreatData = req.body;
            if (req.file) {
                updatedRetreatData.imageUrl = `/uploads/${req.file.filename}`; // Update the image URL if a new file is uploaded
            }

            const updatedRetreat = await Retreat.findByIdAndUpdate(id, updatedRetreatData, {
                new: true,
                runValidators: true,
            });
            if (!updatedRetreat) {
                return res.status(404).json({ message: "Retreat not found" });
            }
            res.json({ message: "Retreat updated successfully", updatedRetreat });
        });
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
