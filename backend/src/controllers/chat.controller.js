import Chat from "../models/chat.model.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId required" });
  }

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] },
  }).populate("users", "-password");

  if (chat) return res.json(chat);

  const newChat = await Chat.create({
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  });

  const fullChat = await Chat.findById(newChat._id).populate(
    "users",
    "-password"
  );

  res.status(201).json(fullChat);
};


export const createGroupChat = async (req, res) => {
  const { users, chatName } = req.body;

  if (!users || !chatName) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "Group needs at least 3 users" });
  }

  users.push(req.user._id);

  const groupChat = await Chat.create({
    chatName,
    users,
    isGroupChat: true,
    groupAdmin: req.user._id,
  });

  const fullGroupChat = await Chat.findById(groupChat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(201).json(fullGroupChat);
};


export const fetchChats = async (req, res) => {
  const chats = await Chat.find({
    users: { $in: [req.user._id] },
  })
    .populate("users", "-password")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  res.json(chats);
};
