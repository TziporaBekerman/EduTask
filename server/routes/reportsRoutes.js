const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
// const reportsController = require("../controllers/reportsController");

// אדמין או מרצה מקבל דו"ח ציונים מלא של סטודנט מסוים
router.get("/student/:studentId", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getStudentReport);

// אדמין או מרצה מקבל דו"ח ציונים של כל הסטודנטים במטלה מסוימת
router.get("/assignment/:assignmentId", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getAssignmentReport);

// אדמין או מרצה מקבל דו"ח ציונים של כל הסטודנטים בקבוצה מסוימת
router.get("/group/:groupId", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getGroupReport);

// אדמין מקבל נתוני סיכום של המערכת כולה למסך הבית
router.get("/dashboard", verifyToken, authorizeRole("admin"), reportsController.getDashboard);

module.exports = router;
