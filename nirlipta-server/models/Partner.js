const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        logoUrl: {
            type: String,
            required: true,
        },
        website: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Sports Partner", "Spiritual Partner", "Education Partner", "Business Partner"], // Example categories
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const Partner = mongoose.model("Partner", partnerSchema);

module.exports = Partner;
