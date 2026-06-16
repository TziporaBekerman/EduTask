const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const submissionController = require("../controllers/submissionsController");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getAllSubmissions);
router.get("/my", verifyToken, authorizeRole("student"), submissionController.getMySubmissions);
router.get("/:id", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getSubmissionById);
router.post("/", verifyToken, authorizeRole("student"), upload.single("file"), submissionController.createSubmission);
router.put("/:id/grade", verifyToken, authorizeRole("admin", "lecturer"), submissionController.gradeSubmission);
router.put("/:id", verifyToken, upload.single("file"), submissionController.updateSubmission);
router.delete("/:id", verifyToken, authorizeRole("admin"), submissionController.deleteSubmission);


module.exports = router;
