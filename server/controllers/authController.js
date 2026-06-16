const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await userModel.getUserByEmail(email);

    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token, id: user.id, name: user.name, email: user.email, role: user.role, groupId: user.groupId
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { login };
