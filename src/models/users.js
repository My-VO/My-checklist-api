module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      userId: {
        field: "user_id",
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        field: "first_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        field: "last_name",
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
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
      tableName: "Users",
    }
  );

  Users.associate = (models) => {
    Users.hasMany(models.Boards, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  };

  return Users;
};