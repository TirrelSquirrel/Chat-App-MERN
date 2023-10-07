const express = require("express");
const {
  loginController,
  registerController,
  fetchAllUsers,
} = require("../Controllers/userController");

const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.get("/fetchUsers", protect, fetchAllUsers);

module.exports = router;
