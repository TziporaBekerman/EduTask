const db = require("../database/db");

const getAllGroups = async () => {
  const [rows] = await db.query("SELECT * FROM StudentGroups");
  return rows;
};

const createGroup = async (name) => {
  const [result] = await db.query("INSERT INTO StudentGroups (name) VALUES (?)", [name]);
  return { id: result.insertId, name };
};

const updateGroup = async (id, name) => {
  await db.query("UPDATE StudentGroups SET name = ? WHERE id = ?", [name, id]);
  return true;
};

const deleteGroup = async (id) => {
  await db.query(
    `DELETE FROM Submissions WHERE assignmentId IN 
     (SELECT id FROM Assignments WHERE groupId = ?)`, [id]
  );
  await db.query("DELETE FROM Assignments WHERE groupId = ?", [id]);
  await db.query("UPDATE Users SET groupId = NULL WHERE groupId = ?", [id]);
  await db.query("DELETE FROM StudentGroups WHERE id = ?", [id]);
  return true;
};

module.exports = { getAllGroups, createGroup, updateGroup, deleteGroup };
