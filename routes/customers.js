const express = require("express");
const router = express.Router();
const {verifyToken} = require('@middlewares/authentication')
const { create, update, destroy, index } = require("@controllers/customersController");


router.post("/", verifyToken, create);
router.put("/:customerId", verifyToken, update);
router.delete("/:customerId", verifyToken, destroy);
router.get("/", verifyToken, index);

module.exports = router;