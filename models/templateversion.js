"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TemplateVersion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Template, { foreignKey: "templateId" });
      this.hasMany(models.Message, { foreignKey: "templateVersionId" });
      this.hasMany(models.MessageJob, { foreignKey: "templateVersionId" });
    }
  }
  TemplateVersion.init(
    {
      templateId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      version: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TemplateVersion",

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
  return TemplateVersion;
};
