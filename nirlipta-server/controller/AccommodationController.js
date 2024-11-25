const Accommodation = require("../models/Accommodation");

// Get all accommodations
const getAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.json(accommodations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accommodations", error });
    }
};

// Get accommodation by ID
const getAccommodationById = async (req, res) => {
    try {
        const { id } = req.params;
        const accommodation = await Accommodation.findById(id);
        if (!accommodation) {
            return res.status(404).json({ message: "Accommodation not found" });
        }
        res.json(accommodation);
    } catch (error) {
        res.status(500).json({ message: "Error fetching accommodation", error });
    }
};

// Create a new accommodation
const createAccommodation = async (req, res) => {
    try {
        const newAccommodation = new Accommodation(req.body);
        await newAccommodation.save();
        res.status(201).json(newAccommodation);
    } catch (error) {
        res.status(500).json({ message: "Error creating accommodation", error });
    }
};

// Update accommodation by ID (PUT)
const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: "Accommodation not found" });
        }
        res.json(updatedAccommodation);
    } catch (error) {
        res.status(500).json({ message: "Error updating accommodation", error });
    }
};

// Partially update accommodation by ID (PATCH)
const patchAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, req.body, { new: true, upsert: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: "Accommodation not found" });
        }
        res.json(updatedAccommodation);
    } catch (error) {
        res.status(500).json({ message: "Error partially updating accommodation", error });
    }
};

// Delete accommodation by ID
const deleteAccommodation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: "Accommodation not found" });
        }
        res.json({ message: "Accommodation deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting accommodation", error });
    }
};

module.exports = {
    getAccommodations,
    getAccommodationById,
    createAccommodation,
    updateAccommodation,
    patchAccommodation,
    deleteAccommodation
};
