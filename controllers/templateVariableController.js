const {
  createTemplateVariable,
  deleteTemplateVariable,
  indexTemplateVariables,
  findTemplateVariableById,
} = require("../services/templateVariablesService");

const create = async (req, res, next) => {
  try {
    const { variableId } = req.body;
    const { templateId } = req.params;
    const { loggedUser } = req;

    const newTemplateVariable = await createTemplateVariable({
      variableId,
      templateId,
      loggedUser,
    });
    res.status(201).json({ templateVariable: newTemplateVariable });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { templateVariableId } = req.params;
    const { loggedUser } = req;

    await deleteTemplateVariable({ templateVariableId, loggedUser });
    res.status(204).json({ message: "TemplateVariable excluído com sucesso" });
  } catch (error) {
    next(error);
  }
};

const index = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const { loggedUser } = req;
    const templateVariables = await indexTemplateVariables({
      templateId,
      loggedUser,
    });
    res.status(200).json({ templateVariables });
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { templateVariableId } = req.params;
    const { loggedUser } = req;

    const templateVariable = await findTemplateVariableById({
      templateVariableId,
      loggedUser,
    });
    res.status(200).json({ templateVariable });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  destroy,
  index,
  findById,
};
