const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mailConfig"); // Assuming you've set up a mail transporter for sending emails
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const RESET_TOKEN_EXPIRY = 3600; // 1 hour expiration for the reset token

const register = async (req, res) => {
    try {
        const { username, email, role = "student" } = req.body;

        // Check if email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "Email already in use" });
        }

        // Save the user with a pending status and no password
        const user = new User({ username, email, role, status: "pending" });
        await user.save();

        // Generate a reset token for setting the password
        const resetToken = jwt.sign({ user_id: user._id }, SECRET_KEY, { expiresIn: RESET_TOKEN_EXPIRY });

        // Construct reset link
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        // Send email with the reset link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Complete Your Registration - Set Your Password",
            html: `<p>Welcome, ${email}!</p>
                   <p>Click <a href="${resetLink}">here</a> to set your password and complete your registration.</p>
                   <p>If you did not register, please ignore this email.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send({ message: "Registration successful. Please check your email to set your password." });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Failed to register user", error });
    }
};


// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).send({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        res.json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).send({ message: "Login failed", error });
    }
};

// Request Password Reset - Generate a Reset Token and send via email
const resetPasswordRequest = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Create a reset token (expires in 1 hour)
        const resetToken = jwt.sign({ user_id: user._id }, SECRET_KEY, { expiresIn: RESET_TOKEN_EXPIRY });

        // Construct reset link
        const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        // Send email with the reset link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({ message: "Error in sending reset email", error: error.message });
    }
};


// Reset Password - Verify token and update password
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Verify the reset token
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (error) {
            return res.status(400).send({ message: "Invalid or expired reset token" });
        }

        // Find the user associated with the token
        const user = await User.findById(decoded.user_id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Hash the new password and update the user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        // Save the updated user
        await user.save();

        res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).send({ message: "Error resetting password", error });
    }
};

// Validate Session
const validateSession = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "No token provided" });
        }

        const verified = jwt.verify(token, SECRET_KEY);

        if (!verified) {
            return res.status(401).send({ message: "Invalid or expired token" });
        }

        res.status(200).send({ message: "Token is valid", user: verified });
    } catch (error) {
        res.status(401).send({ message: "Invalid or expired token", error });
    }
};



module.exports = {
    register,
    login,
    resetPasswordRequest, // Add this function to exports
    resetPassword, // Add this function to exports
    validateSession,
};
