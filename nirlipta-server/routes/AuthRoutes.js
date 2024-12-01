const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/AuthController");
const { authenticateToken, authorizeRole} = require("../security/Auth");

router.post("/login", login);
// router.post("/register", authenticateToken, authorizeRole("ADMIN"), register);
router.post("/register", register);

module.exports = router;
