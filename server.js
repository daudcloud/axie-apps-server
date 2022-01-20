require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./database/database-connect");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cardRouter = require("./routes/card");

const port = process.env.PORT || 8080;

const app = express();

dbConnect();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/card", cardRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
