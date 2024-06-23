const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const userAPI = require("./routes/user");
const taskAPI = require("./routes/task");
const connectDB = require("./db/db");

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/v1", userAPI);
app.use("/api/v1", taskAPI);

app.use("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server has started");
});
