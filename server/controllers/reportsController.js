const reportsModel = require("../models/reportsModel");

const getMyReport = async (req, res, next) => {
  try {
    const submissions = await reportsModel.getSubmissionsByStudent(req.user.id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const getReportByStudent = async (req, res, next) => {
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
    next(error);
  }
};

const getReportByAssignment = async (req, res, next) => {
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
    next(error);
  }
};

const getReportByGroup = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role === "lecturer") {
      const isMyGroup = await reportsModel.isStudentOfLecturer(req.user.id, id);
      if (!isMyGroup) return res.status(403).json({ message: "Access denied" });
    }

    const submissions = await reportsModel.getSubmissionsByGroup(id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const stats = await reportsModel.getDashboardStats();
    return res.status(200).json({ success: true, dashboard: stats });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyReport, getReportByStudent, getReportByAssignment, getReportByGroup, getDashboard };
