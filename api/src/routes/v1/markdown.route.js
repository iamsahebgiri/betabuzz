const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const markdownController = require('../../controllers/markdown.controller');
const markdownValidation = require('../../validations/markdown.validation');

const router = express.Router();

router.route('/preview').post(auth(), validate(markdownValidation.renderMarkdown), markdownController.renderMarkdown);

module.exports = router;
