const {
  createVariable,
  updateVariable,
  deleteVariable,
  getAllVariables,
} = require("../services/variableService");

async function create(req, res, next) {
  try {
    const { key } = req.body;
    const { loggedUser } = req;

    const newVariable = await createVariable({ key, loggedUser });
    res.status(201).json(newVariable);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { key } = req.body;
    const { loggedUser } = req;
    const { variableId } = req.params;

    const updatedVariable = await updateVariable({
      key,
      variableId,
      loggedUser,
    });
    res.status(200).json(updatedVariable);
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { variableId } = req.params;
    const { loggedUser } = req;

    await deleteVariable({ variableId, loggedUser });
    res.status(204).json({ message: "Deletado com sucesso" });
  } catch (error) {
    next(error);
  }
}

async function index(req, res, next) {
  try {
    const { loggedUser } = req;

    const variables = await getAllVariables({ loggedUser });
    res.status(200).json(variables);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  update,
  destroy,
  index,
};
