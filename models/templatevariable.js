"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TemplateVariable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Template, { foreignKey: "templateId" });
    }
  }
  TemplateVariable.init(
    {
      templateId: DataTypes.INTEGER,
      variableId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TemplateVariable",

      defaultScopes: {},
      scopes: {
        withOwner(userId) {
          return {
            include: [
              {
                model: sequelize.models.Template,
                where: { userId },
                required: true,
              },
            ],
          };
        },
      },
    },
  );
  return TemplateVariable;
};
