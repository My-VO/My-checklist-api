require("dotenv").config();

const jwt = require('jsonwebtoken');

const UnauthorrizedError = require("../helpers/errors/unauthorizzed_error");
const ForbiddenError = require("../helpers/errors/forbidden_error");

const accessTokenSecret = process.env.JWT_SIGN_SECRET;

module.exports = {
    generateToken: (userData) => {
        return jwt.sign(
            {
                userId: userData.id,
            },
            accessTokenSecret,
            {
                expiresIn: '7d',
            }
        );
    },

    authenticateJWT: (request, response, next) => {
        const authHeader = request.headers.authorization;

        if(authHeader) {
            const token = authHeader.split(" ")[1];

            if (token === "null") {
                throw new UnauthorrizedError(
                    "Accès refusé",
                    "Vous devez être connecté pour accéder à cette ressource"
                );
            }

            jwt.verify(token, accessTokenSecret, (error, user) => {
                if(error) {
                    throw new ForbiddenError();
                }

                request.user = user;

                next();
            });
        } else {
            throw new UnauthorrizedError(
                "Accès refusé",
                "Vous devez être connecté pour accéder à cette resource"
            );
        }
    },
};