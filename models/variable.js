"use strict";
const { Model } = require("sequelize");
// Variable.js

module.exports = (sequelize, DataTypes) => {
  class Variable extends Model {
    static associate(models) {
      this.belongsToMany(models.Template, {
        through: models.TemplateVariable,
        foreignKey: "variableId",
      });
    }
  }

  Variable.init(
    {
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
