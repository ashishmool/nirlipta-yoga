const mongoose = require("mongoose");

const physicalCourseSchema = new mongoose.Schema(
    {
        course_id: {
            type: mongoose.Schema.Types.ObjectId, // Primary Key
            auto: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty_level: {
            type: String,
            enum: ["beginner", "intermediate", "advanced"], // Fixed values
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        classroom_info: {
            type: String, // Details of classroom
        },
        address: {
            type: String,
        },
        map_location: {
            type: String, // URL or coordinates
        },
        photo: {
            type: String, // URL or file path
        },
        instructor_id: {
            type: mongoose.Schema.Types.ObjectId, // Foreign Key
            ref: "Instructor",
            required: true,
        },
    },
    { timestamps: true }
);

const PhysicalCourse = mongoose.model("PhysicalCourse", physicalCourseSchema);
module.exports = PhysicalCourse;
