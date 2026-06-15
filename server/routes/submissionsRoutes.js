const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const submissionController = require("../controllers/submissionsController");

const upload = multer({ storage: multer.memoryStorage() });

// אדמין רואה הכל, מרצה רואה רק של התלמידים שלו
// תומך בפילטרים: ?status=pending | ?status=graded | ?status=late | ?studentId=123 | ?assignmentId=456
router.get("/", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getAllSubmissions);

// סטודנט מקבל את כל ההגשות שלו עצמו
router.get("/my", verifyToken, authorizeRole("student"), submissionController.getMySubmissions);

// אדמין או מרצה מקבל פרטי הגשה ספציפית לפי ID
router.get("/:id", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getSubmissionById);

// סטודנט מגיש מטלה חדשה
router.post("/", verifyToken, authorizeRole("student"), upload.single("file"), submissionController.createSubmission);

// מרצה או אדמין נותן ציון והערה להגשה
router.put("/:id/grade", verifyToken, authorizeRole("admin", "lecturer"), submissionController.gradeSubmission);

// סטודנט מעדכן הגשה קיימת (לא ניתן אם כבר נבדקה)
router.put("/:id", verifyToken, upload.single("file"), submissionController.updateSubmission);

// אדמין מוחק הגשה מהמערכת
router.delete("/:id", verifyToken, authorizeRole("admin"), submissionController.deleteSubmission);


module.exports = router;
