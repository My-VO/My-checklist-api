const express = require("express");
const { OK } = require("../helpers/status_code");
require("express-async-errors");

const mainRouter = express.Router();
const usersRouter = require("./users.router");

mainRouter.get("/", (request, response) => {
    response.status(OK);
    response.json({ message: "Hello World !"})
});

mainRouter.use(usersRouter);

module.exports = mainRouter;