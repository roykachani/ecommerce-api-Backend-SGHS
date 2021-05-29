const { Router } = require('express');

const router = Router();
const { all, find } = require('./../controllers/products');
//const { validateCreate } = require('./../middlewares/actions/product');
const { validateId } = require('./../middlewares/actions/generic');

router.get('/:id', validateId, find);
router.get('/', all);
//router.post('/', validateCreate, create);

module.exports = router;
