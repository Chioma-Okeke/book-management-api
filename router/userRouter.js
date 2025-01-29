const { Router } = require("express");
const { signup, login, logout } = require("../controller/userController");

const userRouter = Router()
    .post("/user/signup", signup)
    .post("/user/logout", logout)
    .post("/user/login", login);

module.exports = userRouter;
