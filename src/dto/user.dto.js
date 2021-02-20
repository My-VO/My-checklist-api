const userDTO = {
    convert2DTO: async (user) => {
        return {
            id: user.userId,
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
        };
    },
};

module.exports = userDTO;