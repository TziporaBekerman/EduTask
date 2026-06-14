const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRole } = require("../middlewares/authMiddleware");
const groupsController = require("../controllers/groupsController");

router.get("/my", verifyToken, authorizeRole("lecturer"), groupsController.getMyGroups);
router.get("/", verifyToken, groupsController.getAllGroups);
router.post("/", verifyToken, authorizeRole("admin"), groupsController.createGroup);
router.put("/:id", verifyToken, authorizeRole("admin"), groupsController.updateGroup);
router.delete("/:id", verifyToken, authorizeRole("admin"), groupsController.deleteGroup);


module.exports = router;
