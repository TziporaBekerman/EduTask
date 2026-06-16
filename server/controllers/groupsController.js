const groupsModel = require("../models/groupsModel");

const getGroups = async (req, res, next) => {
  try {
    const groups = req.user.role === "admin"
      ? await groupsModel.getAllGroups()
      : await groupsModel.getGroupsByLecturer(req.user.id);
    return res.status(200).json({ success: true, groups });
  } catch (error) {
    next(error);
  }
};

const createGroup = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Missing group name" });
    const group = await groupsModel.createGroup(name);
    return res.status(201).json({ success: true, group });
  } catch (error) {
    next(error);
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    await groupsModel.deleteGroup(req.params.id);
    return res.status(200).json({ success: true, message: "Group deleted" });
  } catch (error) {
    next(error);
  }
};

const updateGroup = async (req, res, next) => {
  try {
    await groupsModel.updateGroup(req.params.id, req.body.name);
    return res.status(200).json({ success: true, message: "Group updated" });
  } catch (error) {
    next(error);
  }
};


module.exports = { getGroups, createGroup, updateGroup, deleteGroup };
