const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me", verifyToken, userController.getMyProfile);

router.put("/me", verifyToken, userController.updateMyProfile);
router.get("/", verifyToken, authorizeRole("admin", "lecturer"), userController.getAllUsers);
router.get("/:id", verifyToken, authorizeRole("admin", "lecturer"), userController.getUserById);
router.post("/", verifyToken, authorizeRole("admin"), userController.createUser);
router.put("/:id", verifyToken, authorizeRole("admin"), userController.updateUser);
router.delete("/:id", verifyToken, authorizeRole("admin"), userController.deleteUser);

module.exports = router;
