const { request } = require("express");
const { Users, Boards, Lists, Cards }  = require("../models");

module.exports = {
    addChecklist: async (data, userId) => {
        const newList = await Lists.create(
            {
            //TODO: Avant de créer, obternir l'index le plus grand. Puis créer avec (indexMax + 1)
             
            }
        )

        return newList;
    },

    getChecklist: async (request) => {
        const { userId } = request.user;

        const checklist = await Boards.findOne({
            attributes: ["boardId", "boardName"],
            where: {
                userId,
            }
        });

        return checklist;
    }
}