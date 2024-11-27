const Accommodation = require("../models/Accommodation");
const upload = require("../config/multerConfig"); // Import the multer configuration

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
    // Check if the file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Photo is required" });
    }

    try {
        const { name, description, price_per_night, location, max_occupancy, available_rooms, amenities } = req.body;

        // Validate that the required fields are provided
        if (!available_rooms || !price_per_night) {
            return res.status(400).json({ message: "Price and available rooms are required" });
        }

        // Create a new accommodation document
        const newAccommodation = new Accommodation({
            name,
            description,
            price_per_night,
            location,
            available_rooms,
            max_occupancy,
            amenities,
            photo: `/uploads/${req.file.filename}`, // Store the relative path to the image
        });

        // Save to the database
        const savedAccommodation = await newAccommodation.save();
        res.status(201).json(savedAccommodation);
    } catch (error) {
        console.error("Error creating accommodation:", error);
        res.status(500).json({ message: "Error creating accommodation", error });
    }
};





// Update accommodation by ID (PUT)
const updateAccommodation = async (req, res) => {
    try {
        const { id } = req.params;

        // If a new photo is uploaded, update the photo field with the new file path
        if (req.file) {
            req.body.photo = `/uploads/${req.file.filename}`;  // Assuming you're using Multer and storing relative paths
        }

        // Update accommodation document
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
    deleteAccommodation,
};
