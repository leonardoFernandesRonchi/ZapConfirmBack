"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MessageJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.TemplateVersion, {
        foreignKey: "templateVersionId",
      });
      this.belongsTo(models.Customer, { foreignKey: "customerId" });
      this.belongsTo(models.Appointment, { foreignKey: "appointmentId" });
      this.hasMany(models.Message, { foreignKey: "messageJobId" });
    }
  }
  MessageJob.init(
    {
      userId: DataTypes.INTEGER,
      templateVersionId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      appointmentId: DataTypes.INTEGER,
      scheduledAt: DataTypes.DATE,
      status: DataTypes.ENUM("pending", "sent", "failed"),
      attempts: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "MessageJob",
    },
  );
  return MessageJob;
};
