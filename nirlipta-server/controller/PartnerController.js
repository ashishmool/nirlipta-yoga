const Partner = require("../models/Partner");

// Get all partners
const getPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching partners", error });
    }
};

// Get partner by ID
const getPartnerById = async (req, res) => {
    try {
        const { id } = req.params;
        const partner = await Partner.findById(id);
        if (!partner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json(partner);
    } catch (error) {
        res.status(500).json({ message: "Error fetching partner", error });
    }
};

// Create a new partner
const createPartner = async (req, res) => {
    try {
        const newPartner = new Partner(req.body);
        await newPartner.save();
        res.status(201).json(newPartner);
    } catch (error) {
        res.status(500).json({ message: "Error creating partner", error });
    }
};

// Update partner by ID (PUT for full update)
const updatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPartner = await Partner.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: "Error updating partner", error });
    }
};

// Partially update partner by ID (PATCH)
const patchPartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPartner = await Partner.findByIdAndUpdate(id, req.body, { new: true, upsert: true });
        if (!updatedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json(updatedPartner);
    } catch (error) {
        res.status(500).json({ message: "Error partially updating partner", error });
    }
};

// Delete partner by ID
const deletePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPartner = await Partner.findByIdAndDelete(id);
        if (!deletedPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }
        res.status(200).json({ message: "Partner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting partner", error });
    }
};

module.exports = {
    getPartners,
    getPartnerById,
    createPartner,
    updatePartner,
    patchPartner,
    deletePartner,
};
