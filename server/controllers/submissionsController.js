const submissionModel = require("../models/submissionsModel");
const assignmentModel = require("../models/assignmentModel");
const fs = require("fs");
const path = require("path");

const saveFile = (file) => {
  const filename = `${Date.now()}-${file.originalname}`;
  fs.writeFileSync(path.join("uploads", filename), file.buffer);
  return `uploads/${filename}`;
};

const getAllSubmissions = async (req, res, next) => {
  try {
    const submissions = req.user.role === "admin"
      ? await submissionModel.getAllSubmissions()
      : await submissionModel.getSubmissionsByLecturer(req.user.id);

    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const getSubmissionById = async (req, res, next) => {
  try {
    const submission = await submissionModel.getSubmissionById(req.params.id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    return res.status(200).json({ success: true, submission });
  } catch (error) {
    next(error);
  }
};

const getMySubmissions = async (req, res, next) => {
  try {
    const submissions = await submissionModel.getSubmissionsByStudent(req.user.id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const createSubmission = async (req, res, next) => {
  try {
    const { assignmentId, studentComment } = req.body;
    const studentId = req.user.id;
    const filePath = req.file ? saveFile(req.file) : null;

    if (!assignmentId || !filePath)
      return res.status(400).json({ message: "Missing required fields" });

    const assignment = await assignmentModel.getAssignmentById(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    if (new Date() > new Date(assignment.closeDate))
      return res.status(403).json({ message: "תאריך ההגשה עבר" });

    const submission = await submissionModel.createSubmission({
      assignmentId, studentId, filePath, submitDate: new Date(), studentComment
    });

    return res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};

const updateSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { studentComment } = req.body;

    const submission = await submissionModel.getSubmissionById(id);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    if (Number(submission.studentId) !== Number(req.user.id))
      return res.status(403).json({ message: "Access denied" });

    if (submission.status === "checked")
      return res.status(400).json({ message: "Cannot update a checked submission" });

    const updateData = { studentComment };
    if (req.file) {
      updateData.filePath = saveFile(req.file);
      updateData.status = "submitted";
      updateData.submitDate = new Date();
    }

    await submissionModel.updateSubmission(id, updateData);
    return res.status(200).json({ success: true, message: "Submission updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!await submissionModel.getSubmissionById(id))
      return res.status(404).json({ message: "Submission not found" });

    await submissionModel.deleteSubmission(id);
    return res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const gradeSubmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { grade, lecturerComment } = req.body;

    if (!await submissionModel.getSubmissionById(id))
      return res.status(404).json({ message: "Submission not found" });

    const updated = await submissionModel.gradeSubmission(id, grade, lecturerComment);
    return res.status(200).json({ success: true, submission: updated });
  } catch (error) {
    next(error);
  }
};

const getSubmissionsByStudent = async (req, res, next) => {
  try {
    const submissions = await submissionModel.getSubmissionsByStudent(req.params.studentId);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const getSubmissionsByAssignment = async (req, res, next) => {
  try {
    const submissions = await submissionModel.getSubmissionsByAssignment(req.params.assignmentId);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubmissions, getSubmissionById, getMySubmissions, createSubmission,
  updateSubmission, deleteSubmission, gradeSubmission, getSubmissionsByStudent, getSubmissionsByAssignment
};
