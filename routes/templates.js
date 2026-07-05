const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/authentication");

const { create, index, destroy } = require("@controllers/templateController");

router.post("/", verifyToken, create);
router.get("/", verifyToken, index);
router.delete("/:templateId", verifyToken, destroy);

module.exports = router;
