const reportsModel = require("../models/reportsModel");

// GET /reports/my - סטודנט רואה את ההגשות שלו
const getMyReport = async (req, res) => {
  try {
    const submissions = await reportsModel.getSubmissionsByStudent(req.user.id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/student/:id - אדמין או מרצה רואה הגשות של תלמיד
const getReportByStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === "lecturer") {
      const student = await reportsModel.getUserById(id);
      if (!student) return res.status(404).json({ message: "Student not found" });

      const isMyStudent = await reportsModel.isStudentOfLecturer(req.user.id, student.groupId);
      if (!isMyStudent) return res.status(403).json({ message: "Access denied" });
    }

    const submissions = await reportsModel.getSubmissionsByStudent(id);
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/assignment/:id - אדמין או מרצה רואה הגשות של מטלה
const getReportByAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === "lecturer") {
      const assignment = await reportsModel.getAssignmentByIdForLecturer(id);
      if (!assignment) return res.status(404).json({ message: "Assignment not found" });

      if (assignment.lecturerId !== req.user.id)
        return res.status(403).json({ message: "Access denied" });
    }

    const submissions = await reportsModel.getSubmissionsByAssignment(id);
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/group/:id - אדמין או מרצה רואה הגשות של קבוצה
const getReportByGroup = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role === "lecturer") {
      const isMyGroup = await reportsModel.isStudentOfLecturer(req.user.id, id);
      if (!isMyGroup) return res.status(403).json({ message: "Access denied" });
    }

    const submissions = await reportsModel.getSubmissionsByGroup(id);
    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /reports/dashboard - אדמין בלבד
const getDashboard = async (req, res) => {
  try {
    const stats = await reportsModel.getDashboardStats();
    return res.status(200).json({ success: true, dashboard: stats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyReport, getReportByStudent, getReportByAssignment, getReportByGroup, getDashboard };
