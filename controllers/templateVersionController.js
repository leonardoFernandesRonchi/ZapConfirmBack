const { createTemplateVersion } = require("../services/templateVersionService");

const create = async (req, res, next) => {
  try {
    const { templateId } = req.params;
    const { content } = req.body;
    const { loggedUser } = req;

    const newTemplateVersion = await createTemplateVersion({
      templateId,
      content,
      loggedUser,
    });
    res.status(201).json({ templateVersion: newTemplateVersion });
  } catch (error) {
    next(error);
  }
};
module.exports = { create };
