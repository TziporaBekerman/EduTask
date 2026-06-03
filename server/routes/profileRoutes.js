const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const profileController = require("../controllers/profileController");

// קבלת פרופיל עצמי
router.get("/", /* verifyToken, */ profileController.getMe);

// עדכון פרופיל עצמי
router.put("/", /* verifyToken, */ profileController.updateMe);

module.exports = router;
