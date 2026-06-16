const db = require("../database/db");

const getSubmissionsByStudent = async (studentId) => {
  const [rows] = await db.query(
    `SELECT s.*, a.title AS assignmentTitle
     FROM Submissions s
     JOIN Assignments a ON a.id = s.assignmentId
     WHERE s.studentId = ?`,
    [studentId]
  );
  return rows;
};

const getSubmissionsByAssignment = async (assignmentId) => {
  const [rows] = await db.query(
    `SELECT s.*, u.name AS studentName
     FROM Submissions s
     JOIN Users u ON u.id = s.studentId
     WHERE s.assignmentId = ?`,
    [assignmentId]
  );
  return rows;
};

const getSubmissionsByGroup = async (groupId) => {
  const [rows] = await db.query(
    `SELECT s.*, u.name AS studentName, a.title AS assignmentTitle
     FROM Submissions s
     JOIN Users u ON u.id = s.studentId
     JOIN Assignments a ON a.id = s.assignmentId
     WHERE u.groupId = ?`,
    [groupId]
  );
  return rows;
};

const isStudentOfLecturer = async (lecturerId, groupId) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count FROM Assignments
     WHERE lecturerId = ? AND groupId = ?`,
    [lecturerId, groupId]
  );
  return rows[0].count > 0;
};

const getAssignmentByIdForLecturer = async (assignmentId) => {
  const [rows] = await db.query(
    "SELECT id, lecturerId FROM Assignments WHERE id = ?",
    [assignmentId]
  );
  return rows[0] || null;
};

const getDashboardStats = async () => {
  const [[userStats]] = await db.query(
    `SELECT
       SUM(role = 'student')  AS totalStudents,
       SUM(role = 'lecturer') AS totalLecturers
     FROM Users`
  );

  const [[assignmentStats]] = await db.query(
    "SELECT COUNT(*) AS totalAssignments FROM Assignments"
  );

  const [submissionStats] = await db.query(
    `SELECT
       COUNT(*)                              AS totalSubmissions,
       SUM(status = 'checked')               AS checked,
       SUM(status = 'submitted')             AS pending,
       SUM(status = 'unsubmitted')           AS unsubmitted,
       SUM(status = 'late')                  AS late,
       ROUND(AVG(CASE WHEN status = 'checked' THEN grade END)) AS avgGrade
     FROM Submissions`
  );

  return {
    ...userStats,
    ...assignmentStats,
    ...submissionStats[0]
  };
};

module.exports = {
  getSubmissionsByStudent,
  getSubmissionsByAssignment,
  getSubmissionsByGroup,
  isStudentOfLecturer,
  getAssignmentByIdForLecturer,
  getDashboardStats
};
