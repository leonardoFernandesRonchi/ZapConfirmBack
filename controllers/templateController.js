const {
  createTemplate,
  indexTemplate,
  deleteTemplate,
} = require("@services/templateService");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { loggedUser } = req;

    const newTemplate = await createTemplate({
      name,
      loggedUser,
    });
    res.status(201).json({ template: newTemplate });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const { loggedUser } = req;

    const templates = await indexTemplate({
      loggedUser,
    });
    res.status(200).json({ templates });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const { loggedUser } = req;

    await deleteTemplate({
      templateId,
      loggedUser,
    });
    res.status(204).json({ message: "Template excluído com sucesso" });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, index, destroy };
