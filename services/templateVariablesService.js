const { TemplateVariable, User } = require("@models");

const {
  FieldRequiredError,
  AlreadyTakenError,
} = require("@helpers/customErrors");

async function createTemplateVariable({ variableId, templateId, loggedUser }) {
  const userTemplateVariable = await TemplateVariable.findOne({
    where: {
      userId: loggedUser.id,
      templateId: templateId,
    },
  });

  const template = await TemplateVariable.findOne({
    where: {
      id: templateId,
      userId: loggedUser.id,
    },
  });

  if (!template) {
    throw new FieldRequiredError(
      "Template não existe ou não pertence ao usuário",
    );
  }
  if (userTemplateVariable) {
    throw new AlreadyTakenError("TemplateVariable", "try updating it instead");
  }
  if (!variableId) throw new FieldRequiredError("VariableId");
  if (!templateId) throw new FieldRequiredError("TemplateId");

  const templateVariable = await TemplateVariable.create({
    variableId: variableId,
    templateId: templateId,
  });
  return templateVariable;
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
  await TemplateVariable.destroy();
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
