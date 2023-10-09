const express = require("express");
const {
  accessChat,
  fetchChats,
  fetchGroups,
  createGroupChat,
  groupExit,
  addSelfToGroup
} = require("../Controllers/chatController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/createGroup").post(protect, createGroupChat);
router.route("/groupExit").put(protect, groupExit);
router.route('/addSelfToGroup').put(protect, addSelfToGroup)

module.exports = router;
