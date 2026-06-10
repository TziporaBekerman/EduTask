const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const reportsController = require("../controllers/reportsController");

// סטודנט רואה את הדוח שלו
router.get("/my", verifyToken, authorizeRole("student"), reportsController.getMyReport);

// אדמין או מרצה רואים דוח לפי תלמיד
router.get("/student/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByStudent);

// אדמין או מרצה רואים דוח לפי מטלה
router.get("/assignment/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByAssignment);

// אדמין או מרצה רואים דוח לפי קבוצה
router.get("/group/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByGroup);

// נתוני סיכום של המערכת כולה למסך הבית של אדמין
router.get("/dashboard", verifyToken, authorizeRole("admin"), reportsController.getDashboard);


module.exports = router;
