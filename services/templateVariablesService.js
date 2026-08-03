const { TemplateVariable, User } = require("@models");

const {
  FieldRequiredError,
  AlreadyTakenError,
} = require("@helpers/customErrors");

async function createTemplateVariable({ variableId, templateId, loggedUser }) {
  const templateVariableExists = await TemplateVariable.scope({
    method: ["withOwner", loggedUser.id],
  }).findOne({
    where: {
      templateId: templateId,
      variableId: variableId,
    },
  });

  if (templateVariableExists) {
    throw new AlreadyTakenError("TemplateVariable", "try updating it instead");
  }
  if (!variableId) throw new FieldRequiredError("VariableId");
  if (!templateId) throw new FieldRequiredError("TemplateId");

  const newTemplateVariable = await TemplateVariable.create({
    variableId: variableId,
    templateId: templateId,
  });
  return newTemplateVariable;
}

async function deleteTemplateVariable({ templateVariableId, loggedUser }) {
  const record = await TemplateVariable.scope({
    method: ["withOwner", loggedUser.id],
  }).findOne({
    where: { id: templateVariableId },
  });
  if (!record) {
    throw new FieldRequiredError(
      "TemplateVariable não existe ou não pertence ao usuário",
    );
  }
  await record.destroy();
}

async function indexTemplateVariables({ templateId, loggedUser }) {
  return await TemplateVariable.scope({
    method: ["withOwner", loggedUser.id],
  }).findAll({
    where: { templateId },
  });
}

async function findTemplateVariableById({ templateVariableId, loggedUser }) {
  return await TemplateVariable.scope({
    method: ["withOwner", loggedUser.id],
  }).findOne({
    where: { id: templateVariableId },
  });
}

module.exports = {
  createTemplateVariable,
  deleteTemplateVariable,
  indexTemplateVariables,
  findTemplateVariableById,
};
