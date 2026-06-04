const db = require("../db/connection");

// יצירת הגשה
const createSubmission = async (submission) => {
  const {
    assignmentId,
    studentId,
    filePath,
    submitDate,
    studentComment,
    status = "submitted"
  } = submission;

  const [result] = await db.query(
    `INSERT INTO Submissions
    (assignmentId, studentId, filePath, submitDate, studentComment, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      assignmentId,
      studentId,
      filePath,
      submitDate,
      studentComment,
      status
    ]
  );

  return {
    id: result.insertId,
    assignmentId,
    studentId,
    filePath,
    submitDate,
    studentComment,
    status
  };
};

// כל ההגשות
const getAllSubmissions = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions"
  );

  return rows;
};

// הגשה לפי ID
const getSubmissionById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions WHERE id = ?",
    [id]
  );

  return rows[0] || null;
};

// הגשות של סטודנט
const getSubmissionsByStudent = async (studentId) => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions WHERE studentId = ?",
    [studentId]
  );

  return rows;
};

// הגשות של מטלה
const getSubmissionsByAssignment = async (assignmentId) => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions WHERE assignmentId = ?",
    [assignmentId]
  );

  return rows;
};

// בדיקת הגשה ומתן ציון
const gradeSubmission = async (
  id,
  grade,
  lecturerComment
) => {
  await db.query(
    `UPDATE Submissions
     SET grade = ?,
         lecturerComment = ?,
         status = 'checked'
     WHERE id = ?`,
    [grade, lecturerComment, id]
  );

  return true;
};

// מחיקת הגשה
const deleteSubmission = async (id) => {
  await db.query(
    "DELETE FROM Submissions WHERE id = ?",
    [id]
  );

  return true;
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsByAssignment,
  gradeSubmission,
  deleteSubmission
};