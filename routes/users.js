const express = require("express");
const router = express.Router();
const { signUp, signIn, me } = require("../controllers/userController");
const { verifyToken } = require("@middlewares/authentication");

router.post("/", signUp);
router.post("/signin", signIn);
router.get("/me", verifyToken, me);

module.exports = router;
