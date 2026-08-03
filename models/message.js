"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.MessageJob, { foreignKey: "messageJobId" });
      this.belongsTo(models.TemplateVersion, {
        foreignKey: "templateVersionId",
      });
      this.belongsTo(models.Appointment, { foreignKey: "appointmentId" });
      this.belongsTo(models.Customer, { foreignKey: "customerId" });
    }
  }
  Message.init(
    {
      messageJobId: DataTypes.INTEGER,
      externalId: DataTypes.STRING,
      templateVersionId: DataTypes.INTEGER,
      appointmentId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      direction: DataTypes.ENUM("INBOUND", "OUTBOUND"),
      status: DataTypes.ENUM("pending", "sent", "failed"),
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    },
  );
  return Message;
};
