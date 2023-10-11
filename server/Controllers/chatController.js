const expressAsyncHandler = require("express-async-handler");
const chat = require("../Models/chatModel");
const user = require("../Models/userModel");

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("No ha sido enviado el UserId param");
    return res.sendStatus(400);
  }

  let isChat = await chat
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await user.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await chat.create(chatData);
      const fullChat = await chat
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");
      res.json(fullChat);
    } catch (error) {
      res.sendStatus(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
  try {
    console.log("Fetch chats API: ", req);
    chat
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await user.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        console.log("Chats fetched correctly");
        res.json(results);
      });
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const fetchGroups = expressAsyncHandler(async (req, res) => {
  try {
    const allGroups = await chat.where("isGroupChat").equals(true);
    res.json(allGroups);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const createGroupChat = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    throw new Error("Datos insuficientes");
    return res.sendStatus(400);
  }

  let users = JSON.parse(req.body.users);
  console.log("chatontroller/createGroups: ", req);
  users.push(req.user);

  try {
    const groupChat = await chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await chat
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(fullGroupChat);
  } catch (error) {
    res.sendStatus(400);
    throw new Error(error.message);
  }
});

const groupExit = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  //comprobar si el requester es el admin

  const removed = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.sendStatus(400);
    throw new Error("Chat no encontrado");
  } else {
    res.json(removed);
  }
});

const addSelfToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await chat
    .findByIdAndUpdate(
      chatId,
      {
        $push: { $users: userId },
      },
      {
        new: true,
      }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.sendStatus(400);
    throw new Error("Chat no encontrado");
  } else {
    res.json("Añadido");
  }
});

module.exports = {
  accessChat,
  fetchChats,
  fetchGroups,
  createGroupChat,
  groupExit,
  addSelfToGroup,
};
