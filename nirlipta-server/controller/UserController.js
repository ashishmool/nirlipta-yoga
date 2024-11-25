const User = require("../models/User");

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
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

// Update user by ID (PUT for full update)
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
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
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
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

module.exports = { getUsers, getUserById, createUser, updateUser, patchUser, deleteUser };
