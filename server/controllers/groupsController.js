const groupsModel = require("../models/groupsModel");

const getAllGroups = async (req, res) => {
  try {
    const groups = await groupsModel.getAllGroups();
    return res.status(200).json({ success: true, groups });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Missing group name" });
    const group = await groupsModel.createGroup(name);
    return res.status(201).json({ success: true, group });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await groupsModel.updateGroup(id, name);
    return res.status(200).json({ success: true, message: "Group updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    await groupsModel.deleteGroup(id);
    return res.status(200).json({ success: true, message: "Group deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllGroups, createGroup, updateGroup, deleteGroup };
