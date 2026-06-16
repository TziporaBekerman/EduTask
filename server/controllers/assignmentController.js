const assignmentModel = require("../models/assignmentModel");

const createAssignment = async (req, res, next) => {
  try {
    const { title, description, groupId, openDate, closeDate } = req.body;
    const lecturerId = req.user.id;

    if (!title || !groupId || !openDate || !closeDate)
      return res.status(400).json({ message: "Missing required fields" });

    const assignment = await assignmentModel.createAssignment({
      title, description, groupId, lecturerId, openDate, closeDate
    });

    return res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
};

const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = req.user.role === "admin"
      ? await assignmentModel.getAllAssignments()
      : req.user.role === "lecturer"
        ? await assignmentModel.getAssignmentsByLecturer(req.user.id)
        : await assignmentModel.getAssignmentsByStudentId(req.user.id);

    return res.status(200).json({ success: true, assignments });
  } catch (error) {
    next(error);
  }
};

const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentModel.getAssignmentById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    return res.status(200).json({ success: true, assignment });
  } catch (error) {
    next(error);
  }
};

const getAssignmentSubmissions = async (req, res, next) => {
  try {
    const submissions = await assignmentModel.getSubmissionsByAssignment(req.params.id);
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!await assignmentModel.getAssignmentById(id))
      return res.status(404).json({ message: "Assignment not found" });

    await assignmentModel.updateAssignment(id, req.body);
    return res.status(200).json({ success: true, message: "Assignment updated" });
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!await assignmentModel.getAssignmentById(id))
      return res.status(404).json({ message: "Assignment not found" });

    await assignmentModel.deleteAssignment(id);
    return res.status(200).json({ success: true, message: "Assignment deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAssignment, getAllAssignments, getAssignmentById, getAssignmentSubmissions, updateAssignment, deleteAssignment };
