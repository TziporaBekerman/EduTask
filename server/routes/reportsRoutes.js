const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
// const reportsController = require("../controllers/reportsController");

// דו"ח ציונים - תומך בפילטרים: ?type=student&id=123 | ?type=group&id=456 | ?type=assignment&id=789
router.get("/", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReport);

// נתוני סיכום של המערכת כולה למסך הבית של אדמין
router.get("/dashboard", verifyToken, authorizeRole("admin"), reportsController.getDashboard);


module.exports = router;
