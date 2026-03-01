const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/userController");



router.post("/", signUp);
router.post("/signin", signIn);

module.exports = router;