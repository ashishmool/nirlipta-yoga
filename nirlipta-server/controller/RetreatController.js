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

const createRetreat = async (req, res) => {
    try {
        const retreatData = req.body;

        // Parse specific fields that are sent as JSON strings
        if (retreatData.meals_info) {
            retreatData.meals_info = JSON.parse(retreatData.meals_info);
        }
        if (retreatData.featuring_events) {
            retreatData.featuring_events = JSON.parse(retreatData.featuring_events);
        }

        // Handle guests with photos
        if (req.files && req.files.length > 0) {
            // Map uploaded files to their respective guests
            const guestPhotos = {};
            req.files.forEach((file) => {
                const fieldName = file.fieldname; // e.g., "guests[0][photo]"
                const match = fieldName.match(/guests\[(\d+)\]\[photo\]/); // Extract guest index
                if (match) {
                    const guestIndex = match[1];
                    guestPhotos[guestIndex] = `/uploads/${file.filename}`;
                }
            });

            // Attach photos to respective guests
            retreatData.guests = [];
            for (const [key, value] of Object.entries(req.body)) {
                const matchName = key.match(/guests\[(\d+)\]\[name\]/);
                if (matchName) {
                    const guestIndex = matchName[1];
                    if (!retreatData.guests[guestIndex]) {
                        retreatData.guests[guestIndex] = {};
                    }
                    retreatData.guests[guestIndex].name = value;
                }
            }
            Object.entries(guestPhotos).forEach(([index, photo]) => {
                if (!retreatData.guests[index]) {
                    retreatData.guests[index] = {};
                }
                retreatData.guests[index].photo = photo;
            });
        }

        // Create a new retreat document
        const retreat = new Retreat(retreatData);
        await retreat.save();

        res.status(201).json({ message: "Retreat created successfully", retreat });
    } catch (error) {
        console.error("Error creating retreat:", error);
        res.status(500).json({ message: "Error creating retreat", error: error.message });
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
