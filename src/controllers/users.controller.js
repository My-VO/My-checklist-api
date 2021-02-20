const bcrypt = require("bcrypt");

const { Users } = require("../models");
const { userDTO } = require("../dto");

const ConflictError = require("../helpers/errors/conflict_error");
const UnauthorrizedError = require("../helpers/errors/unauthorizzed_error");

const usersController = {
    addUser: async (data) => {
        const { firstName, lastName, email, password } = data;

        const findEmail = await Users.findOne({
            attributes: ["email"],
            where: { email },
        })

        if(findEmail) {
            throw new ConflictError(
                "Conflict",
                "Un utilisateur utilisant cette addresse email est déjà enregistré"
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        const newUserDTO = await userDTO.convert2DTO(newUser)

        return newUserDTO;
    },

    authenticate: async (data) => {
        const { email, password } = data;

        const findUserByEmail = await Users.findOne({
            where : { email },
        });

        if (!findUserByEmail) {
            throw new UnauthorrizedError(
                "Accès refusé", 
                "Votre compte n'existe pas"
            );
        }

        const checkPassword = await bcrypt.compare(
            password,
            findUserByEmail.dataValues.password
        )

        if (!checkPassword) {
            throw new UnauthorrizedError(
                "Accès refusé",
                "Votre mot de passe n'est pas correct"
            );
        }

        const findUserByEmailDTO = await userDTO.convert2DTO(findUserByEmail);

        return findUserByEmailDTO;
    }
}

module.exports = usersController;