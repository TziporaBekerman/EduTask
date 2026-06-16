const userModel = require("../models/userModel");

const updateMyProfile = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { name, email, password, currentPassword } = req.body;

    if (!currentPassword)
      return res.status(400).json({ success: false, message: "נדרשת סיסמה נוכחית" });

    const valid = await userModel.verifyPassword(id, currentPassword);
    if (!valid)
      return res.status(401).json({ success: false, message: "סיסמה נוכחית שגויה" });

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = password;

    await userModel.updateMyProfile(id, updates);

    return res.status(200).json({ success: true, message: "הפרטים עודכנו בהצלחה" });

  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = req.user.role === "admin"
      ? await userModel.getAllUsers()
      : await userModel.getStudentsByLecturer(req.user.id);
    return res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(id);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (req.user.role === "lecturer") {
      const isMyStudent = await userModel.isStudentOfLecturer(req.user.id, user.groupId);
      if (!isMyStudent)
        return res.status(403).json({ success: false, message: "Access denied" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { id, name, email, password, role, groupId } = req.body;

    if (!id || !name || !email || !password || !role)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    if (await userModel.getUserById(id))
      return res.status(409).json({ success: false, message: "ID already exists" });

    if (await userModel.getUserByEmail(email))
      return res.status(409).json({ success: false, message: "Email already exists" });

    if (role === "student" && groupId == null)
      return res.status(400).json({ success: false, message: "Student must belong to a group" });

    const newUser = await userModel.createUser({ id, name, email, password, role, groupId: groupId || null });

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!await userModel.getUserById(id))
      return res.status(404).json({ success: false, message: "User not found" });

    await userModel.updateUser(id, req.body);
    return res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!await userModel.getUserById(id))
      return res.status(404).json({ success: false, message: "User not found" });

    await userModel.deleteUser(id);
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, getMyProfile, updateMyProfile };
