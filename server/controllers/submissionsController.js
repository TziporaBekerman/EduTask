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