const userDTO = {
    convert2DTO: async (user, board) => {
        return {
            id: user.userId,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            board_id: board.boardId,
            board_name: board.boardName,
        };
    },
};

module.exports = userDTO;