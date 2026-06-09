const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// משתמש מתחבר למערכת עם אימייל וסיסמה ומקבל טוקן
router.post("/login", authController.login);

module.exports = router;
