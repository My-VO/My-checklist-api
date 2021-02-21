module.exports = (sequelize, DataTypes) => {
  const Lists = sequelize.define(
    "Lists",
    {
      listId: {
        field: "list_id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      boardId: {
        field: "board_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      listName: {
        field: "list_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      listOrder: {
        field: "list_order",
        allowNull: false,
        type: DataTypes.INTEGER,
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
      tableName: "Lists",
    }
  );

  Lists.associate = (models) => {
    Lists.belongsTo(models.Boards, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "boardId",
        allowNull: false,
      },
    });
    Lists.hasMany(models.Cards, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "listId",
        allowNull: false,
      },
    });
  };

  return Lists;
};
