const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, // Primary Key
            auto: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
            default: null,
            minlength: 8,
        },
        profile_picture: {
            type: String, // URL or file path
            default: null,
        },
        role: {
            type: String,
            enum: ["student", "instructor", "admin"], // Role options
            default: "student",
        },
        age: {
            type: Number,
            min: 0,
            default: null, // Optional
        },
        height: {
            type: Number, // Store height in cm
            default: null,
        },
        weight: {
            type: Number, // Store weight in kg
            default: null,
        },
        gender: {
            type: String,
            enum: ["male", "female", "non-binary", "prefer not to say"],
            default: null,
        },
        medical_conditions: {
            type: [String], // Array of medical conditions
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        updated_at: {
            type: Date,
            default: Date.now,
        },
        enrolled_courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Workshop", // Reference to the Workshop model
                default: null, // Optional
            },
        ],
        subscribed_courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OnlineCourse", // Reference to the OnlineCourse model
                default: null, // Optional
            },
        ],
        payments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Payment", // Reference to the Payment model
                default: null, // Optional
            },
        ],
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
