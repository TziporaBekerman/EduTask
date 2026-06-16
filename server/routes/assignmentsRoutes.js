const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const assignmentController = require("../controllers/assignmentController");

router.get("/", verifyToken, assignmentController.getAllAssignments);

router.get("/:id", verifyToken, assignmentController.getAssignmentById);
router.get("/:id/submissions", verifyToken, authorizeRole("admin", "lecturer"), assignmentController.getAssignmentSubmissions);
router.post("/", verifyToken, authorizeRole("admin", "lecturer"), assignmentController.createAssignment);
router.put("/:id", verifyToken, authorizeRole("admin"), assignmentController.updateAssignment);
router.delete("/:id", verifyToken, authorizeRole("admin"), assignmentController.deleteAssignment);


module.exports = router;
