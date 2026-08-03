"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer, { foreignKey: "customerId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.MessageJob, { foreignKey: "appointmentId" });
      this.hasMany(models.Message, { foreignKey: "appointmentId" });
    }
  }
  Appointment.init(
    {
      date: DataTypes.DATE,
      time: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Appointment",
    },
  );
  return Appointment;
};
