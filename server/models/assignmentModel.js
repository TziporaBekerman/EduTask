const db = require("../database/db");

const createAssignment = async (assignment) => {
  const {
    title,
    description,
    groupId,
    lecturerId,
    openDate,
    closeDate
  } = assignment;

  const [result] = await db.query(
    `INSERT INTO Assignments
    (title, description, groupId, lecturerId, openDate, closeDate)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [title, description, groupId, lecturerId, openDate, closeDate]
  );

  return {
    id: result.insertId,
    title,
    description,
    groupId,
    lecturerId,
    openDate,
    closeDate
  };
};

const getAllAssignments = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Assignments"
  );

  return rows;
};

const getAssignmentById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Assignments WHERE id = ?",
    [id]
  );

  return rows[0] || null;
};

const getAssignmentsByStudentId = async (studentId) => {
  const [rows] = await db.query(
    `SELECT a.* FROM Assignments a
     JOIN Users u ON u.groupId = a.groupId
     WHERE u.id = ?`,
    [studentId]
  );
  return rows;
};

const getAssignmentsByGroup = async (groupId) => {
  const [rows] = await db.query(
    "SELECT * FROM Assignments WHERE groupId = ?",
    [groupId]
  );

  return rows;
};

const updateAssignment = async (id, assignment) => {
  const {
    title,
    description,
    groupId,
    openDate,
    closeDate
  } = assignment;

  await db.query(
    `UPDATE Assignments
     SET title = ?,
         description = ?,
         groupId = ?,
         openDate = ?,
         closeDate = ?
     WHERE id = ?`,
    [title, description, groupId, openDate, closeDate, id]
  );

  return true;
};

const deleteAssignment = async (id) => {
  await db.query(
    "DELETE FROM Assignments WHERE id = ?",
    [id]
  );

  return true;
};

const getAssignmentsByLecturer = async (lecturerId) => {
  const [rows] = await db.query(
    "SELECT * FROM Assignments WHERE lecturerId = ?",
    [lecturerId]
  );
  return rows;
};


module.exports = {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  getAssignmentsByGroup,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByLecturer,
  getAssignmentsByStudentId
};