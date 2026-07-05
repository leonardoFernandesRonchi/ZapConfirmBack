const { Variable, User } = require("../models");

const {
  FieldRequiredError,
  AlreadyTakenError,
} = require("../helpers/customErrors");

async function createVariable({ key, loggedUser }) {
  const userVariable = await Variable.findOne({
    where: { key, userId: loggedUser.id },
  });

  if (userVariable)
    throw new AlreadyTakenError("Variable", "try updating it instead");
  if (!key) throw new FieldRequiredError("Key");

  const variable = await Variable.create({
    key,
    userId: loggedUser.id,
  });

  return variable;
}

async function updateVariable({ key, variableId, loggedUser }) {
  const variable = await Variable.findOne({
    where: {
      id: variableId,
      userId: loggedUser.id,
    },
  });

  if (key === undefined) key = variable.key;

  const updatedVariable = await variable.update({
    key,
  });

  return updatedVariable;
}

async function deleteVariable({ variableId, loggedUser }) {
  const variable = await Variable.findOne({
    where: {
      id: variableId,
      userId: loggedUser.id,
    },
  });

  variable.destroy();
}

async function getVariables({ loggedUser }) {
  const variables = await Variable.findAll({
    where: {
      userId: loggedUser.id,
    },
  });

  return variables;
}

module.exports = {
  createVariable,
  updateVariable,
  deleteVariable,
  getVariables,
};
