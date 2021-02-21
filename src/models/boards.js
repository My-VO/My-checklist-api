module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define(
    "Boards",
    {
      boardId: {
        field: "board_id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        field: "user_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      boardName: {
        field: "board_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true,
        },
      },
    },
    {
      tableName: "Boards",
    }
  );

  Boards.associate = (models) => {
    Boards.belongsTo(models.Users, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
    Boards.hasMany(models.Lists, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "boardId",
        allowNull: false,
      },
    });
  };

  return Boards;
};
