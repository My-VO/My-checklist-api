const bcrypt = require("bcrypt");

const { Users, Boards, sequelize } = require("../models");
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

        let transaction;

        try {
            transaction = await sequelize.transaction();

            const newUser = await Users.create(
                {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                },
                { transaction }
            );
    
            const newBoard = await Boards.create(
                {
                    userId: newUser.dataValues.userId,
                    boardName: "To do list"
                },
                { transaction }
            );
    
            await transaction.commit();
    
            const confirmedUserDTO = await userDTO.convert2DTO(newUser, newBoard);
    
            return confirmedUserDTO;
        } catch (err) {
            if(transaction) {
                await transaction.rollback()
            }
            console.log("Err : ", err)
        }
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

        const { userId } = findUserByEmail.dataValues;

        const findBoardByUser = await Boards.findOne({
            attributes: ["boardId", "boardName"],
            where: {
                userId,
            }
        })

        const findUserByEmailDTO = await userDTO.convert2DTO(findUserByEmail, findBoardByUser);

        return findUserByEmailDTO;
    },

    getUserById: async (userId) => {
        const findUser = await Users.findByPk(userId);

        const findUserDTO = await userDTO.convert2DTO(findUser);

        return findUserDTO;
    }
}

module.exports = usersController;