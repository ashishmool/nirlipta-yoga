const express = require("express");
const router = express.Router();
const {
    getPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    patchPartner,
    deletePartner,
} = require("../controller/PartnerController");

// Get all partners
router.get("/", getPartners);

// Get partner by ID
router.get("/:id", getPartnerById);

// Create a new partner
router.post("/create", createPartner);

// Update partner by ID (PUT for full update)
router.put("/update/:id", updatePartner);

// Partially update partner by ID (PATCH)
router.patch("/patch/:id", patchPartner);

// Delete partner by ID
router.delete("/delete/:id", deletePartner);

module.exports = router;
