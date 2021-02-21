module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define(
    "Cards",
    {
      cardId: {
        field: "card_id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      listId: {
        field: "list_id",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      cardName: {
        field: "card_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      cardOrder: {
        field: "card_order",
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      description: {
        field: "description",
        allowNull: false,
        type: DataTypes.TEXT,
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
      tableName: "Cards",
    }
  );

  Cards.associate = (models) => {
    Cards.belongsTo(models.Lists, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "listId",
        allowNull: false,
      },
    });
  };

  return Cards;
};
