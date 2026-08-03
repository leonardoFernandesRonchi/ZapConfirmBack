const express = require("express");
const router = express.Router();
const { verifyToken } = require("@middlewares/authentication");

const {
  create,
  update,
  destroy,
  index,
} = require("@controllers/variableController");

router.post("/templates/:templateId/variables", verifyToken, create);
router.put("/templates/:templateId/variables/:variableId", verifyToken, update);
router.get("/templates/:templateId/variables", verifyToken, index);
router.delete(
  "/templates/:templateId/variables/:variableId",
  verifyToken,
  destroy,
);

module.exports = router;
