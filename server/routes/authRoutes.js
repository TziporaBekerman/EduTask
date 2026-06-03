const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// התחברות
router.post("/login", authController.login);

module.exports = router;
