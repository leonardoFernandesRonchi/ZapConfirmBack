const { User, Template } = require("@models");
const {
  FieldRequiredError,
  AlreadyTakenError,
} = require("@helpers/customErrors");

async function createTemplate({ name, loggedUser }) {
  if (!name) throw new FieldRequiredError("Nome");

  const template = await Template.create({
    name: name,
    userId: loggedUser.id,
  });

  return template;
}

async function indexTemplate({ loggedUser }) {
  const templates = await Template.findAll({
    where: {
      userId: loggedUser.id,
    },
  });

  return templates;
}

async function deleteTemplate({ templateId, loggedUser }) {
  if (!templateId) throw new FieldRequiredError("Template");

  const template = await Template.findOne({
    where: {
      userId: loggedUser.id,
      id: templateId,
    },
  });

  template.destroy();
}

module.exports = { createTemplate, indexTemplate, deleteTemplate };
