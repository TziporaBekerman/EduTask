const db = require("../database/db");

const updateMyProfile = async (id, user) => {
  const { name, email } = user;

  await db.query(
    `UPDATE Users
     SET name = ?, email = ?
     WHERE id = ?`,
    [name, email, id]
  );

  return true;
  };
const getAllUsers = async () => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, groupId FROM Users"
  );
  return rows;
};

const getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, groupId FROM Users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM Users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};

const createUser = async (user) => {
  const { id, name, email, password, role, groupId = null } = user;

  await db.query(
    `INSERT INTO Users (id, name, email, password, role, groupId)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, email, password, role, groupId]
  );

  return {
    id,
    name,
    email,
    role,
    groupId
  };
};

const updateUser = async (id, user) => {
  const current = await getUserById(id);
  const name = user.name ?? current.name;
  const email = user.email ?? current.email;
  const role = user.role ?? current.role;
  const groupId = user.groupId !== undefined ? (user.groupId || null) : current.groupId;

  await db.query(
    `UPDATE Users
     SET name = ?, email = ?, role = ?, groupId = ?
     WHERE id = ?`,
    [name, email, role, groupId, id]
  );

  return true;
};

const deleteUser = async (id) => {
  await db.query(
    "DELETE FROM Users WHERE id = ?",
    [id]
  );

  return true;
};

const isStudentOfLecturer = async (lecturerId, groupId) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count FROM Assignments
     WHERE lecturerId = ? AND groupId = ?`,
    [lecturerId, groupId]
  );
  return rows[0].count > 0;
};

const getStudentsByLecturer = async (lecturerId) => {
  const [rows] = await db.query(
    `SELECT DISTINCT u.id, u.name, u.email, u.groupId
     FROM Users u
     JOIN Assignments a ON a.groupId = u.groupId
     WHERE a.lecturerId = ? AND u.role = 'student'`,
    [lecturerId]
  );
  return rows;
};



module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  isStudentOfLecturer,
  updateMyProfile,
  getStudentsByLecturer
};