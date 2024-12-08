const Workshop = require("../models/Workshop");
const Category = require("../models/WorkshopCategory"); // Assuming you have a category model
const Instructor = require("../models/Instructor");
const upload = require("../config/multerConfig"); // Import the multer configuration

// Get all workshops
const getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find().populate("instructor_id").populate("category");
        res.json(workshops);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workshops", error });
    }
};

// Get workshop by ID
const getWorkshopById = async (req, res) => {
    try {
        const { id } = req.params;
        const workshop = await Workshop.findById(id).populate("instructor_id").populate("category");
        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.json(workshop);
    } catch (error) {
        res.status(500).json({ message: "Error fetching workshop by ID", error });
    }
};

// Create a new workshop
const createWorkshop = async (req, res) => {
    // Check if the file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: "Photo is required" });
    }

    try {
        const {
            title,
            description,
            difficulty_level,
            price,
            classroom_info,
            address,
            map_location,
            instructor_id,
            category,
            newCategory,
        } = req.body;

        // Validate that the required fields are provided
        if (!title || !description || !price || !classroom_info || !instructor_id || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // If the "Create New Category" option is selected, create a new category
        let selectedCategory = category;
        if (category === "create-new" && newCategory) {
            const existingCategory = await Category.findOne({ name: newCategory });
            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }
            // Create the new category and use its ID
            const newCategoryDoc = new Category({ name: newCategory });
            await newCategoryDoc.save();
            selectedCategory = newCategoryDoc._id;
        }

        // Create a new workshop document
        const newWorkshop = new Workshop({
            title,
            description,
            difficulty_level,
            price,
            classroom_info,
            address,
            map_location,
            instructor_id,
            category: selectedCategory,
            photo: `/uploads/${req.file.filename}`, // Store the relative path to the image
        });

        // Save to the database
        const savedWorkshop = await newWorkshop.save();
        res.status(201).json(savedWorkshop);
    } catch (error) {
        console.error("Error creating workshop:", error);
        res.status(500).json({ message: "Error creating workshop", error });
    }
};

// Update workshop by ID (PUT)
const updateWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        let { category, newCategory } = req.body;

        // If a new photo is uploaded, update the photo field with the new file path
        if (req.file) {
            req.body.photo = `/uploads/${req.file.filename}`; // Assuming you're using Multer and storing relative paths
        }

        // If a new category is provided, handle the new category creation
        if (category === "create-new" && newCategory) {
            const existingCategory = await Category.findOne({ name: newCategory });
            if (existingCategory) {
                return res.status(400).json({ message: "Category already exists" });
            }
            const newCategoryDoc = new Category({ name: newCategory });
            await newCategoryDoc.save();
            req.body.category = newCategoryDoc._id; // Use the newly created category
        }

        // Update workshop document
        const updatedWorkshop = await Workshop.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedWorkshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.json(updatedWorkshop);
    } catch (error) {
        console.error("Error updating workshop:", error);
        res.status(500).json({ message: "Error updating workshop", error });
    }
};

// Delete workshop by ID
const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWorkshop = await Workshop.findByIdAndDelete(id);
        if (!deletedWorkshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }
        res.json({ message: "Workshop deleted successfully", deletedWorkshop });
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
