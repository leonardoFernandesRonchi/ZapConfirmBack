"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsToMany(models.Variable, {
        through: models.TemplateVariable,
        foreignKey: "templateId",
      });
      this.hasMany(models.TemplateVersion, { foreignKey: "templateId" });
    }
  }
  Template.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Template",
    },
  );
  return Template;
};
