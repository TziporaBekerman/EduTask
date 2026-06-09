const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const submissionController = require("../controllers/submissionsController");

// אדמין מקבל את כל ההגשות, מרצה מקבל רק את ההגשות של התלמידים שלו
router.get("/", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getAllSubmissions);

// סטודנט מקבל את כל ההגשות שלו עצמו
router.get("/my", verifyToken, authorizeRole("student"), submissionController.getMySubmissions);

// אדמין או מרצה מקבל פרטי הגשה ספציפית לפי ID
router.get("/:id", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getSubmissionById);

// סטודנט מגיש מטלה חדשה
router.post("/", verifyToken, authorizeRole("student"), submissionController.createSubmission);

// סטודנט מעדכן הגשה קיימת (לא ניתן אם כבר נבדקה)
router.put("/:id", verifyToken, authorizeRole("student"), submissionController.updateSubmission);

// אדמין מוחק הגשה מהמערכת
router.delete("/:id", verifyToken, authorizeRole("admin"), submissionController.deleteSubmission);

// מרצה או אדמין נותן ציון והערה להגשה
router.put("/:id/grade", verifyToken, authorizeRole("admin", "lecturer"), submissionController.gradeSubmission);

// אדמין או מרצה מקבל את כל ההגשות של סטודנט מסוים לפי ID
router.get("/student/:studentId", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getSubmissionsByStudent);

// אדמין או מרצה מקבל את כל ההגשות שעדיין לא נבדקו
router.get("/pending", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getPendingSubmissions);

// אדמין או מרצה מקבל את כל ההגשות שנבדקו וקיבלו ציון
router.get("/graded", verifyToken, authorizeRole("admin", "lecturer"), submissionController.getGradedSubmissions);


module.exports = router;
