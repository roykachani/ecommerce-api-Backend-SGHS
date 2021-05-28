const { Router } = require('express');
const router = Router();

const { all, create } = require('./../controllers/purchase');

router.post('/', create);
router.get('/', all);

module.exports = router;
