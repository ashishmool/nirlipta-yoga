const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig")// Import multer setup

const { getAllRetreats, getRetreatById, createRetreat, updateRetreat, deleteRetreat } = require("../controller/RetreatController");

// Create a new retreat (with image upload)
router.post("/save", upload, createRetreat);

// Update retreat by ID (with image upload)
router.put("/update/:id", upload, updateRetreat);

// Get all retreats
router.get("/", getAllRetreats);

// Get retreat by ID
router.get("/:id", getRetreatById);

// Delete retreat by ID
router.delete("/delete/:id", deleteRetreat);

module.exports = router;
