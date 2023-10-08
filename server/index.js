const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");

const app = express();
dotenv.config();
app.use(cors());
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

app.listen(PORT, console.log("Server is Running!"));
