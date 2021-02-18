const express = require("express"),
helmet = require("helmet"),
logger = require("morgan"),
bodyParser = require("body-parser");

const routes = require("./routes");

const { notFoundHandler, errorHandler, errorLogger } = require("./middlewares")

const server = express();

server.use(helmet());
server.use(logger("dev"));
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use("/api", routes);

server.use( notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

module.exports = server;