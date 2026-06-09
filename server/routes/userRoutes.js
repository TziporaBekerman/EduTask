const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// המשתמש המחובר מקבל את פרטי הפרופיל שלו
router.get("/me", verifyToken, userController.getMe);

// המשתמש המחובר מעדכן את פרטי הפרופיל שלו
router.put("/me", verifyToken, userController.updateMe);

// אדמין מקבל את כל המשתמשים, מרצה מקבל רק את התלמידים שלו
router.get("/", verifyToken, authorizeRole("admin", "lecturer"), userController.getAllUsers);

// אדמין או מרצה מקבל פרטי משתמש ספציפי לפי ID
router.get("/:id", verifyToken, authorizeRole("admin", "lecturer"), userController.getUserById);

// אדמין יוצר משתמש חדש במערכת
router.post("/", verifyToken, authorizeRole("admin"), userController.createUser);

// אדמין מעדכן פרטי משתמש כולל תפקיד וקבוצה
router.put("/:id", verifyToken, authorizeRole("admin"), userController.updateUser);

// אדמין מוחק משתמש מהמערכת
router.delete("/:id", verifyToken, authorizeRole("admin"), userController.deleteUser);

module.exports = router;
