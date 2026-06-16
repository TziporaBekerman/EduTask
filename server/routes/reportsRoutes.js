const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const reportsController = require("../controllers/reportsController");

router.get("/my", verifyToken, authorizeRole("student"), reportsController.getMyReport);

router.get("/student/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByStudent);
router.get("/assignment/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByAssignment);
router.get("/group/:id", verifyToken, authorizeRole("admin", "lecturer"), reportsController.getReportByGroup);
router.get("/dashboard", verifyToken, authorizeRole("admin"), reportsController.getDashboard);


module.exports = router;
