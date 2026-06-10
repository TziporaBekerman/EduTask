const userModel = require("../models/userModel");

const updateMyProfile = async (req, res) => {
  try {
    const { id } = req.user.id;
    const { name, email } = req.body;

    const user = await userModel.getUserById(id);

    await userModel.updateMyProfile(id, {
      name,
      email
    });

    return res.status(200).json({
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const { id } = req.user.id;

    const user = await userModel.getUserById(id);

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error"
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = req.user.role === "admin"
      ? await userModel.getAllUsers()
      : await userModel.getStudentsByLecturer(req.user.id);

    return res.status(200).json({
      success: true,
      users
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    if (req.user.role === "lecturer") {
      const isMyStudent = await userModel.isStudentOfLecturer(req.user.id, user.groupId);
      if (!isMyStudent) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { id, name, email, password, role, groupId } = req.body;

    if (!id || !name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const existingById = await userModel.getUserById(id);
    if (existingById) {
      return res.status(409).json({
        success: false,
        message: "ID already exists"
      });
    }

    const existingByEmail = await userModel.getUserByEmail(email);
    if (existingByEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    if (role === "student" && groupId == null) {
      return res.status(400).json({
        success: false,
        message: "Student must belong to a group"
      });
    }

    const newUser = await userModel.createUser({
      id,
      name,
      email,
      password,
      role,
      groupId
    });

    return res.status(201).json({
      success: true,
      user: newUser
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await userModel.updateUser(id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await userModel.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile
};
