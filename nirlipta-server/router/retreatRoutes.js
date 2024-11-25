const { getAllRetreats, getRetreatById, createRetreat, updateRetreat, deleteRetreat } = require("../controller/RetreatController");
const express = require("express");
const router = express.Router();

// Get all retreats
router.get("/", getAllRetreats);

// Get retreat by ID
router.get("/:id", getRetreatById);

// Create a new retreat
router.post("/save", createRetreat);

// Update retreat by ID
router.put("/update/:id", updateRetreat);

// Delete retreat by ID
router.delete("/delete/:id", deleteRetreat);

module.exports = router;
