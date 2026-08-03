"use strict";
const { Model } = require("sequelize");
// Variable.js

module.exports = (sequelize, DataTypes) => {
  class Variable extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Template, {
        through: models.TemplateVariable,
        foreignKey: "variableId",
      });
    }
  }

  Variable.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      key: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Variable",
    },
  );

  return Variable;
};
