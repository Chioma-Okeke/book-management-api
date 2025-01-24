const express = require("express");
const bookRouter = require("./router/bookrouter");
const userRouter = require("./router/userRouter");
const connectedDb = require("./db/dbController");
const err = require("./Middleware/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();
require("dotenv").config();

const port = process.env.PORT;

// db connection
connectedDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", bookRouter);
app.use("/api", userRouter);

// error middleware handler
app.use(err);

app.listen(port, console.log("holla"));
