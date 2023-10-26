const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getCategories);

router.get('/:Category', controller.getSubCategories);

module.exports = router;