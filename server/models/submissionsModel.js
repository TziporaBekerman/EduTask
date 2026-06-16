const db = require("../database/db");

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

const getAllSubmissions = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions"
  );

  return rows;
};

const getSubmissionById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions WHERE id = ?",
    [id]
  );

  return rows[0] || null;
};

const getSubmissionsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT Submissions.*, Assignments.title AS assignmentTitle
     FROM Submissions
     JOIN Assignments ON Submissions.assignmentId = Assignments.id
     WHERE Submissions.studentId = ?`,
    [studentId]
  );

  return rows;
};

const getSubmissionsByAssignment = async (assignmentId) => {
  const [rows] = await db.query(
    "SELECT * FROM Submissions WHERE assignmentId = ?",
    [assignmentId]
  );

  return rows;
};

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

  return await getSubmissionById(id);
};

const deleteSubmission = async (id) => {
  await db.query(
    "DELETE FROM Submissions WHERE id = ?",
    [id]
  );

  return await getSubmissionById(id);
};

const updateSubmission = async (id, data) => {
  const { filePath, studentComment, status, submitDate } = data;

  const fields = [];
  const values = [];

  if (filePath !== undefined) { fields.push("filePath = ?"); values.push(filePath); }
  if (studentComment !== undefined) { fields.push("studentComment = ?"); values.push(studentComment); }
  if (status !== undefined) { fields.push("status = ?"); values.push(status); }
  if (submitDate !== undefined) { fields.push("submitDate = ?"); values.push(submitDate); }

  if (fields.length === 0) return await getSubmissionById(id);

  await db.query(`UPDATE Submissions SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);

  return await getSubmissionById(id);
};

const getPendingAssignmentsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT a.* FROM Assignments a
     JOIN Users u ON u.groupId = a.groupId
     WHERE u.id = ?
     AND a.id NOT IN (SELECT assignmentId FROM Submissions WHERE studentId = ?)`,
    [studentId, studentId]
  );
  return rows;
};

const getSubmissionsByLecturer = async (lecturerId) => {
  const [rows] = await db.query(
    `SELECT s.* FROM Submissions s
     JOIN Assignments a ON a.id = s.assignmentId
     WHERE a.lecturerId = ?`,
    [lecturerId]
  );
  return rows;
};

module.exports = {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  getSubmissionsByStudent,
  getSubmissionsByAssignment,
  getSubmissionsByLecturer,
  getPendingAssignmentsByStudent,
  gradeSubmission,
  deleteSubmission,
  updateSubmission
};