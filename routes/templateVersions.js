const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/authentication");

const { create } = require("@controllers/templateVersionController");

router.post("/templates/:templateId/templateVersions", verifyToken, create);

module.exports = router;
