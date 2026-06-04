const submissionModel = require("../models/submissionModel");

const createSubmission = async (req, res) => {
  try {
    const {
      assignmentId,
      studentId,
      filePath,
      studentComment
    } = req.body;

    if (
      !assignmentId ||
      !studentId ||
      !filePath
    ) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const submission =
      await submissionModel.createSubmission({
        assignmentId,
        studentId,
        filePath,
        submitDate: new Date(),
        studentComment
      });

    return res.status(201).json(submission);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    await submissionModel.deleteSubmission(id);

    return res.status(200).json({
      message: "Submission deleted successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

const updateSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { filePath, studentComment } = req.body;

    const submission = await submissionModel.getSubmissionById(id);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    // אם כבר נבדק - לא מאפשרים שינוי
    if (submission.status === "checked") {
      return res.status(400).json({
        message: "Cannot update a checked submission"
      });
    }

    await submissionModel.updateSubmission(id, {
      filePath,
      studentComment,
      status: "submitted",
      submitDate: new Date()
    });

    return res.status(200).json({
      message: "Submission updated successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};