const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String },
  },
  {
    timeStamp: true,
  }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;