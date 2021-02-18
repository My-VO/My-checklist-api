const express = require("express");

const mainRouter = express.Router();

mainRouter.get("/", (request, reponse) => {
    reponse.send("Hello World !")
});

module.exports = mainRouter;