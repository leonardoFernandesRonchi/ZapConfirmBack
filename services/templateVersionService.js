const { TemplateVersion, User } = require("../models");
const {
  FieldRequiredError,
  AlreadyTakenError,
} = require("../helpers/customErrors");

async function createTemplateVersion({ templateId, content, loggedUser }) {
  if (!templateId) throw new FieldRequiredError("Template ID");
  if (!content) throw new FieldRequiredError("Content");

  const userTemplateVersion = await TemplateVersion.scope({
    method: ["withOwner", loggedUser.id],
  }).findOne({
    where: {
      templateId: templateId,
    },
    order: [["version", "DESC"]],
  });

  const templateVersionCreated = await TemplateVersion.create({
    templateId: templateId,
    content: content,
    version: userTemplateVersion ? userTemplateVersion.version + 1 : 1,
  });

  return templateVersionCreated;
}

module.exports = {
  createTemplateVersion,
};
