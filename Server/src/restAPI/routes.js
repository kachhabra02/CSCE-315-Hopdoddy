const { Router } = require('express');
const controller = require('./controller');

const router = Router();


//Common File from Project2
router.get('/', controller.getCategories);

router.get('/:Category', controller.getSubCategories);

router.get('/:Category/:SubCategory', controller.getMenuItems);

//Manager File from Project2
router.post("/", controller.addInventoryItem);

router.put("/", controller.removeInventoryItem);

router.put("/manager/", controller.removeMenuItem);
module.exports = router;