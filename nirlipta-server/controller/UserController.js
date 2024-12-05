const User = require("../models/User");
const transporter = require("../config/mailConfig");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user by ID", error });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: user.email, // Recipient email
            subject: "Welcome to Our Platform",
            text: `Hello ${user.username},\n\nWelcome to our platform! Your user ID is ${user._id}.\n\nBest regards,\nThe Team`,
            html: `
                <p>Hello <strong>${user.username}</strong>,</p>
                <p>Welcome to our platform! Your user ID is <strong>${user._id}</strong>.</p>
                <p>Best regards,<br>The Team</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond to the client
        res.status(201).json({
            message: "User created successfully and email sent",
            user,
        });
    } catch (error) {
        console.error("Error creating user or sending email:", error);
        res.status(500).json({
            message: "Error creating user or sending email",
            error,
        });
    }
};

// Update user by ID (PUT for full update)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// Update user by ID (PATCH for partial update)
const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const patchedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!patchedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User patched successfully", patchedUser });
    } catch (error) {
        res.status(500).json({ message: "Error patching user", error });
    }
};

// Delete user by ID
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
};
