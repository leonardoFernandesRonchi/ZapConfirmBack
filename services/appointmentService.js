const { Customer, User, Appointment } = require("../models");
const {
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../helpers/customErrors");
const { updateCustomer } = require("./customerService");

async function createAppointment({ date, time, customerId, loggedUser }) {
  const appointmentExists = await Appointment.findOne({
    where: {
      date: date,
      time: time,
      userId: loggedUser.id,
    },
  });

  if (appointmentExists) throw new AlreadyTakenError("Appointment slot");
  const customer = await Customer.findOne({
    where: {
      id: customerId,
      userId: loggedUser.id,
    },
  });
  if (!customer) throw new FieldRequiredError("Customer");
  if (!date) throw new FieldRequiredError("Date");
  if (!time) throw new FieldRequiredError("Time");
  const appointment = await Appointment.create({
    date: date,
    time: time,
    customerId: customerId,
    userId: loggedUser.id,
  });
  return appointment;
}

async function updateAppointment({ appointmentId, date, time, loggedUser }) {
  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
      userId: loggedUser.id,
    },
  });

  if (!appointment) throw new NotFoundError("appointment");

  if (date === undefined) date = appointment.date;
  if (time === undefined) time = appointment.time;

  const appointmentUpdated = await appointment.update({
    date: date,
    time: time,
    userId: loggedUser.id,
  });

  return appointmentUpdated;
}

async function indexAppointments({ loggedUser }) {
  const user = await User.findOne({
    where: {
      id: loggedUser.id,
    },
    include: Appointment,
  });
  return user.Appointments;
}

async function deleteAppointment({ loggedUser, appointmentId }) {
  const appointment = await Appointment.findOne({
    where: {
      id: appointmentId,
      userId: loggedUser.id,
    },
  });

  appointment.destroy();
}

module.exports = {
  createAppointment,
  deleteAppointment,
  indexAppointments,
  updateAppointment,
};
