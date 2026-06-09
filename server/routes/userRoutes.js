const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me",verifyToken, userController.getMe);

router.put("/me", verifyToken,  userController.updateMe);

router.get("/",  verifyToken,authorizeRole("admin"), userController.getAllUsers);

router.get("/my-students", verifyToken, authorizeRole("lecturer"), userController.getMyStudents);

router.get("/:id",  verifyToken,authorizeRole("admin","lecturer"),  userController.getUserById);

router.post("/", verifyToken, authorizeRole("admin"), userController.createUser);

router.put("/:id", verifyToken, authorizeRole("admin"), userController.updateUser);

router.delete("/:id", verifyToken, authorizeRole("admin"), userController.deleteUser);



module.exports = router;
