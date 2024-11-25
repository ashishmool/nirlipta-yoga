const express = require("express");
const router = express.Router();
const { getAccommodations, getAccommodationById, createAccommodation, updateAccommodation, patchAccommodation, deleteAccommodation } = require("../controller/AccommodationController");

// Get all accommodations
router.get("/", getAccommodations);

// Create a new accommodation
router.post("/save", createAccommodation);

// Get accommodation by ID
router.get("/getById/:id", getAccommodationById);

// Update accommodation by ID (PUT for full update)
router.put("/update/:id", updateAccommodation);

// Partially update accommodation by ID (PATCH)
router.patch("/patch/:id", patchAccommodation);

// Delete accommodation by ID
router.delete("/delete/:id", deleteAccommodation);

module.exports = router;
