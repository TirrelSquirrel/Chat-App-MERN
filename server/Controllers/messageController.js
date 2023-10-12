const expressAsyncHandler = require("express-async-handler");
const message = require("../Models/messageModel");
const user = require("../Models/userModel");
const chat = require("../Models/chatModel");

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await message
      .find({ chat: req.params.chatId })
      .populate("sender", "name email")
      .populate("receiver")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.sendStatus(400);
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let messageSent = await message.create(newMessage);
    console.log('Mensaje creado');
    messageSent = await message.populate("sender", "name");
    console.log('Pupulado mensaje');
    messageSent = await message.populate("chat");
    console.log('populado chat');
    messageSent = await message.populate("receiver");
    console.log('populado receiver');
    messageSent = await user.populate(messageSent, {
      path: "chat.users",
      select: "name email",
    });
    console.log('populado user.populate');

    await chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: messageSent,
    });
    res.json(messageSent);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
