const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const submissionController = require("../controllers/submissionController");

// קבלת כל ההגשות (אדמין/מרצה)
router.get("/", /* verifyToken, */ submissionController.getAllSubmissions);

// קבלת הגשה לפי ID
router.get("/:id", /* verifyToken, */ submissionController.getSubmissionById);

// יצירת/עדכון הגשה (סטודנט)
router.post("/", /* verifyToken, */ submissionController.createOrUpdateSubmission);

// מחיקת הגשה
router.delete("/:id", /* verifyToken, */ submissionController.deleteSubmission);

// בדיקת הגשה - מתן ציון והערות (מרצה/אדמין)
router.put("/:id/grade", /* verifyToken, */ submissionController.gradeSubmission);

// קבלת כל ההגשות של סטודנט מסוים
router.get("/student/:studentId", /* verifyToken, */ submissionController.getSubmissionsByStudent);

// קבלת כל ההגשות של מטלה מסוימת
router.get("/assignment/:assignmentId", /* verifyToken, */ submissionController.getSubmissionsByAssignment);

module.exports = router;
