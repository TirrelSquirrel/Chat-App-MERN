const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

const app = express();
dotenv.config();
//app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI);
    console.log("Server is connected to DB");
  } catch (error) {
    console.log("Error connecting to DB:", error.message);
  }
};

connectDb();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const server = app.listen(PORT, console.log("Server is Running!"));

const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  },
  pingTimeout: 60000
});

io.on('connection', (socket) => {
  socket.join('setup', (user) => {
    socket.join(user.data._id);
    console.log('server :// joined user: ', user.data._id);
    socket.emit('connected')
  })

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User joined room: ', room);
  })

  socket.on('new message', (newMessageStatus) => {
    let chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log('chat.users not defined');
    }
    chat.users.forEach((user) => {
      
    })
  })
})
