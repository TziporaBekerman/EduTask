const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const groupsController = require("../controllers/groupsController");

router.get("/", verifyToken, authorizeRole("admin", "lecturer"), groupsController.getGroups);
router.post("/", verifyToken, authorizeRole("admin"), groupsController.createGroup);
router.put("/:id", verifyToken, authorizeRole("admin"), groupsController.updateGroup);
router.delete("/:id", verifyToken, authorizeRole("admin"), groupsController.deleteGroup);


module.exports = router;
