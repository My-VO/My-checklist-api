const express = require("express");
const validateEmail = require("email-validator");

const authMid = require("../utils/jwt.utils");

const { OK, CREATED } = require("../helpers/status_code");
const BadRequestError = require("../helpers/errors/bad_request_error");

const usersController = require("../controllers/users.controller");
const { request, response } = require("express");

const usersRouter = express.Router();

usersRouter.post("/signup", async (request, response) => {
    const { firstName, lastName, email } = request.body;

    if (firstName === null || firstName === undefined || firstName === "") {
        throw new BadRequestError(
            "Requête incorrecte",
            "Le champ first_name n'est pas renseigné"
        );
    }

    if (lastName === null || lastName === undefined || lastName === "") {
        throw new BadRequestError(
            "Requête incorrecte",
            "Le champ last_name n'est pas renseigné"
        );
    }

    if (typeof firstName !== "string") {
        throw new BadRequestError(
            "Requête incorrecte",
            "Le champ first_name doit être une chaîne de caractères"
        );
    }

    if (typeof lastName !== "string") {
        throw new BadRequestError(
            "Requête incorrecte",
            "Le champ last_name doit être une chaîne de caractères"
        );
    }


    if (!validateEmail.validate(email)) {
        throw new BadRequestError(
            "Requête incorrecte",
            "Le champ email doit être une adresse email"
        );
    }

    const data = request.body;

    const newUser = await usersController.addUser(data);

    response.status(CREATED);
    response.json(newUser);
})

usersRouter.post("/login", async (request, response) => {
    const data = request.body;

    const user = await usersController.authenticate(data);

    response.status(OK);
    response.json({ token: authMid.generateToken(user), user });
})

module.exports = usersRouter;