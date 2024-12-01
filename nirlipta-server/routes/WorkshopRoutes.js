const express = require("express");
const router = express.Router();
const {
    getAllWorkshops,
    getWorkshopById,
    createWorkshop,
    updateWorkshop,
    deleteWorkshop
} = require("../controller/WorkshopController");

// Get all workshops
router.get("/", getAllWorkshops);

// Get workshop by ID
router.get("/:id", getWorkshopById);

// Create a new workshop
router.post("/save", createWorkshop);

// Update workshop by ID
router.put("/update/:id", updateWorkshop);

// Delete workshop by ID
router.delete("/delete/:id", deleteWorkshop);

module.exports = router;
