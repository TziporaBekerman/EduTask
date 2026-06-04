const assignmentModel = require("../models/assignmentModel");

const createAssignment = async (req, res) => {
  try {
    const {
      title,
      description,
      groupId,
      lecturerId,
      openDate,
      closeDate
    } = req.body;

    if (
      !title ||
      !groupId ||
      !openDate ||
      !closeDate
    ) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const assignment =
      await assignmentModel.createAssignment({
        title,
        description,
        groupId,
        lecturerId,
        openDate,
        closeDate
      });

    return res.status(201).json(assignment);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};