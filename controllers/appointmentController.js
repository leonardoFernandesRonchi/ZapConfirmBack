const {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  indexAppointments,
} = require("@services/appointmentService");

const create = async (req, res, next) => {
  try {
    const { date, time } = req.body;
    const { loggedUser } = req;
    const { customerId } = req.params;
    const newAppointment = await createAppointment({
      date,
      time,
      customerId,
      loggedUser,
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { date, time } = req.body;
    const { loggedUser } = req;
    const { appointmentId } = req.params;

    const updatedAppointment = await updateAppointment({
      appointmentId,
      date,
      time,
      loggedUser,
    });
    res.status(200).json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { loggedUser } = req;

    const deletedAppointment = await deleteAppointment({
      loggedUser,
      appointmentId,
    });
    res.status(204).json({ message: "Deletado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const { loggedUser } = req;

    const appointments = await indexAppointments({
      loggedUser,
    });
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, destroy, index, update };
