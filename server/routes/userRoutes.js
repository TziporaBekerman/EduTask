const express = require("express");
const router = express.Router();
// const { verifyToken } = require("../middleware/auth");
const userController = require("../controllers/userController");

// קבלת פרופיל עצמי
router.get("/me", /* verifyToken, */ userController.getMe);

// עדכון פרופיל עצמי
router.put("/me", /* verifyToken, */ userController.updateMe);

// קבלת כל המשתמשים
router.get("/", /* verifyToken, */ userController.getAllUsers);

// קבלת משתמש לפי ID
router.get("/:id", /* verifyToken, */ userController.getUserById);

// יצירת משתמש (אדמין)
router.post("/", /* verifyToken, */ userController.createUser);

// עדכון משתמש (אדמין)
router.put("/:id", /* verifyToken, */ userController.updateUser);

// מחיקת משתמש (אדמין)
router.delete("/:id", /* verifyToken, */ userController.deleteUser);



module.exports = router;
