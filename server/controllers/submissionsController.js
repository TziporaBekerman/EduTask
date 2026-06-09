const submissionModel = require("../models/submissionsModel");

// אדמין רואה הכל, מרצה רואה רק של התלמידים שלו
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = req.user.role === "admin"
      ? await submissionModel.getAllSubmissions()
      : await submissionModel.getSubmissionsByLecturer(req.user.id);

    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    return res.status(200).json({ success: true, submission });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// סטודנט רואה את ההגשות שלו עצמו (כולל ציונים, הערות, היסטוריה)
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await submissionModel.getSubmissionsByStudent(req.user.id);

    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const createSubmission = async (req, res) => {
  try {
    const { assignmentId, filePath, studentComment } = req.body;
    const studentId = req.user.id;

    if (!assignmentId || !filePath) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const submission = await submissionModel.createSubmission({
      assignmentId,
      studentId,
      filePath,
      submitDate: new Date(),
      studentComment
    });

    return res.status(201).json(submission);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { filePath, studentComment } = req.body;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // סטודנט יכול לעדכן רק את ההגשה שלו
    if (submission.studentId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (submission.status === "checked") {
      return res.status(400).json({ message: "Cannot update a checked submission" });
    }

    await submissionModel.updateSubmission(id, {
      filePath,
      studentComment,
      status: "submitted",
      submitDate: new Date()
    });

    return res.status(200).json({ message: "Submission updated successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    await submissionModel.deleteSubmission(id);

    return res.status(200).json({ message: "Submission deleted successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// מרצה/אדמין נותן ציון והערות
const gradeSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade, lecturerComment } = req.body;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const updated = await submissionModel.gradeSubmission(id, grade, lecturerComment);

    return res.status(200).json({ success: true, submission: updated });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSubmissionsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const submissions = await submissionModel.getSubmissionsByStudent(studentId);

    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await submissionModel.getSubmissionsByAssignment(assignmentId);

    return res.status(200).json({ success: true, submissions });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllSubmissions,
  getSubmissionById,
  getMySubmissions,
  createSubmission,
  updateSubmission,
  deleteSubmission,
  gradeSubmission,
  getSubmissionsByStudent,
  getSubmissionsByAssignment
};
