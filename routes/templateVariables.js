const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/authentication");

const {
  create,
  index,
  destroy,
  findById,
} = require("@controllers/templateVariableController");

router.post("/templates/:templateId/templateVariables", verifyToken, create);
router.get("/templates/:templateId/templateVariables", verifyToken, index);
router.get("/templateVariables/:templateVariableId", verifyToken, findById);
router.delete("/templateVariables/:templateVariableId", verifyToken, destroy);

module.exports = router;
