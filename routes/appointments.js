const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/authentication");
const {
  create,
  index,
  update,
  destroy,
} = require("@controllers/appointmentController");

router.post("/customers/:customerId/appointments", verifyToken, create);
router.get("/appointments", verifyToken, index);
router.put("/appointments/:appointmentId", verifyToken, update);
router.delete("/appointments/:appointmentId", verifyToken, destroy);

module.exports = router;
