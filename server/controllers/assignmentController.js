const assignmentModel = require("../models/assignmentModel");

const createAssignment = async (req, res) => {
  try {
    const { title, description, groupId, openDate, closeDate } = req.body;
    const lecturerId = req.user.id;

    if (!title || !groupId || !openDate || !closeDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const assignment = await assignmentModel.createAssignment({
      title, description, groupId, lecturerId, openDate, closeDate
    });

    return res.status(201).json(assignment);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



const getAllAssignments = async (req, res) => {
  try {
    const assignments = req.user.role === "admin"
      ? await assignmentModel.getAllAssignments()
      : req.user.role === "lecturer"
        ? await assignmentModel.getAssignmentsByLecturer(req.user.id)
        : await assignmentModel.getAssignmentsByStudentId(req.user.id);
    return res.status(200).json({ success: true, assignments });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await assignmentModel.getAssignmentById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ success: true, assignment });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAssignmentSubmissions = async (req, res) => {
  try {
    const { id } = req.params;

    const submissions = await assignmentModel.getSubmissionsByAssignment(id);

    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await assignmentModel.getAssignmentById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignmentModel.updateAssignment(id, req.body);

    return res.status(200).json({ success: true, message: "Assignment updated" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const assignment = await assignmentModel.getAssignmentById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    await assignmentModel.deleteAssignment(id);

    return res.status(200).json({ success: true, message: "Assignment deleted" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  getAssignmentSubmissions,
  updateAssignment,
  deleteAssignment
};
