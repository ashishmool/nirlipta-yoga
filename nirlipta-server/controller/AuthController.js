const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const SECRET_KEY = process.env.SECRET_KEY;
const Credential = require("../models/Credential");

const register = async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new Credential({ email, password: hashedPassword, role });

    await cred.save();
    res.status(201).send(cred);
};

const login = async (req, res) => {
    console.log("Login request received:"); // Login Request
    const { email, password } = req.body;

    const cred = await Credential.findOne({ email });
    if (!cred || !(await bcrypt.compare(password, cred.password))) {
        return res.status(403).send("Invalid email or password");
    }

    const token = jwt.sign(
        { email: cred.email, role: cred.role },
        SECRET_KEY,
        { expiresIn: "2h" }
    );

    console.log("Token generated.");
    res.json({ token });
};

module.exports = {
    login,
    register,
};
