const { Router } = require('express');
const router = Router();

const { checkoutmp, feedback } = require('./../controllers/checkoutmp');

router.post('/', checkoutmp);
router.post('/feedback', feedback);

module.exports = router;
