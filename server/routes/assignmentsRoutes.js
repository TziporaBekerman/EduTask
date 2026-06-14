const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const assignmentController = require("../controllers/assignmentController");

// אדמין רואה הכל, מרצה רואה את המטלות שלו, סטודנט רואה מטלות של הקבוצה שלו
router.get("/", verifyToken, assignmentController.getAllAssignments);

// קבלת פרטי מטלה ספציפית לפי ID
router.get("/:id", verifyToken, assignmentController.getAssignmentById);

// אדמין או מרצה מקבל את כל ההגשות של מטלה מסוימת
router.get("/:id/submissions", verifyToken, authorizeRole("admin", "lecturer"), assignmentController.getAssignmentSubmissions);

// אדמין או מרצה יוצר מטלה חדשה ומשייך אותה לקבוצה
router.post("/", verifyToken, authorizeRole("admin", "lecturer"), assignmentController.createAssignment);

// אדמין או מרצה מעדכן פרטי מטלה קיימת
router.put("/:id", verifyToken, authorizeRole("admin"), assignmentController.updateAssignment);

// אדמין מוחק מטלה מהמערכת
router.delete("/:id", verifyToken, authorizeRole("admin"), assignmentController.deleteAssignment);


module.exports = router;
